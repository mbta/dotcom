defmodule V3Api.Cache do
  @moduledoc """
  Cache HTTP responses from the V3 API.

  Static data such as schedules and stops do not change frequently. However,
  we do want to check in with the API periodically to make sure we have the
  most recent data. This module stores the previous HTTP responses, and can
  return them if the server says that the data is unchanged.
  """
  use GenServer
  require Logger
  alias HTTPoison.Response

  @type url :: String.t()
  @type params :: Enumerable.t()

  def start_link(opts \\ []) do
    opts = Keyword.put_new(opts, :name, __MODULE__)
    GenServer.start_link(__MODULE__, opts, opts)
  end

  @doc """
  Given a URL, parameters, and an HTTP response:
  - If the HTTP response is a 304 Not Modified, return the previously cached response
  - If the HTTP response is a 200, 400, or 404, cache it and return the response
  - If the HTTP response is anything else, try to return a cached response, otherwise return the response as-is
  """
  @spec cache_response(url, params, Response.t()) ::
          {:ok, Response.t()} | {:error, :no_cached_response}
  def cache_response(name \\ __MODULE__, url, params, response)

  def cache_response(name, url, params, %{status_code: 304}) do
    lookup_cached_response(name, url, params)
  rescue
    ArgumentError ->
      {:error, :no_cached_response}
  end

  def cache_response(name, url, params, %{status_code: status_code} = response)
      when status_code in [200, 400, 404] do
    key = {url, params}
    last_modified = header(response, "last-modified")
    true = :ets.insert(name, {key, last_modified, response, now()})
    {:ok, response}
  end

  def cache_response(name, url, params, response) do
    lookup_cached_response(name, url, params)
  rescue
    ArgumentError ->
      {:ok, response}
  end

  defp lookup_cached_response(name, url, params) do
    key = {url, params}
    element = :ets.lookup_element(name, key, 3)
    :ets.update_element(name, key, {4, now()})
    {:ok, element}
  end

  @doc """
  Return a list of cache headers for the given URL/parameters.
  """
  @spec cache_headers(url, params) :: [{String.t(), String.t()}]
  def cache_headers(name \\ __MODULE__, url, params) do
    last_modfied = :ets.lookup_element(name, {url, params}, 2)
    [{"if-modified-since", last_modfied}]
  rescue
    ArgumentError ->
      []
  end

  defp header(%{headers: headers}, header) do
    case Enum.find(headers, &(String.downcase(elem(&1, 0)) == header)) do
      {_, value} -> value
      nil -> nil
    end
  end

  @doc "Expire the least-recently-used cache items"
  @spec expire!() :: :ok
  def expire!(name \\ __MODULE__) do
    GenServer.call(name, :expire!)
  end

  @impl GenServer
  def init(opts) do
    name = Keyword.fetch!(opts, :name)

    ^name =
      :ets.new(name, [
        :set,
        :named_table,
        :public,
        {:read_concurrency, true},
        {:write_concurrency, true}
      ])

    timeout = Keyword.get(opts, :timeout, 60_000)
    Process.send_after(self(), :expire, timeout)
    size = Keyword.get(opts, :size, Application.get_env(:v3_api, :cache_size))
    {:ok, %{name: name, size: size, timeout: timeout}}
  end

  @impl GenServer
  def handle_call(:expire!, _from, state) do
    :ok = do_expire(state)
    {:reply, :ok, state}
  end

  @impl GenServer
  def handle_info(:expire, state) do
    :ok = do_expire(state)
    Process.send_after(self(), :expire, state.timeout)
    {:noreply, state}
  end

  defp do_expire(%{name: name, size: size}) do
    current_size = :ets.info(name, :size)

    _ =
      Logger.info(fn ->
        "#{name} report - size=#{current_size} max_size=#{size} memory=#{:ets.info(name, :memory)}"
      end)

    if current_size > size do
      # keep half of the cache, so that we don't bounce around clearing the
      # cache each minute
      keep = div(size, 2)

      name
      |> :ets.match({:"$2", :_, :_, :"$1"})
      |> Enum.sort(&>=/2)
      |> Enum.drop(keep)
      |> Enum.each(fn [_lru, key] -> :ets.delete(name, key) end)
    else
      :ok
    end
  end

  defp now do
    System.monotonic_time()
  end
end
