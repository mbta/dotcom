defmodule Site.React.Worker do
  @moduledoc """
  React renderer worker
  """
  require Logger
  use GenServer

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts)
  end

  def init(_opts) do
    node = System.find_executable("node") || System.find_executable("nodejs")
    config = Application.get_env(:site, :react)
    port = Port.open({:spawn_executable, node}, args: [config[:build_path]])
    {:ok, %{port: port}}
  end

  def handle_call({:render, name, props}, _from, %{port: port} = state) do
    body =
      Poison.encode!(%{
        name: name,
        props: props
      })

    Port.command(port, body <> "\n")

    response =
      ""
      |> receive_response(&handle_json/1)

    case response do
      %{data: %{"error" => nil} = data} ->
        {:reply, {:ok, data}, state}

      %{data: %{"error" => _error} = data} ->
        {:reply, {:error, data}, state}

      _ ->
        {:noreply, state}
    end
  end

  defp receive_response(prev_responses, handle_fn) do
    receive do
      {_, {:data, data}} ->
        str = to_string(data)
        resp = prev_responses <> str
        handle_response(resp, handle_fn)
    end
  end

  def handle_response(resp, handle_fn) do
    # Split and keep delimiter
    ~r/(?<=\n)/
    |> Regex.split(resp, trim: true)
    |> Enum.map(&handle_data(&1, handle_fn))
    |> Enum.find(&Map.has_key?(&1, :data))
  end

  def handle_data(str, handle_fn) do
    if String.ends_with?(str, "\n") do
      if String.starts_with?(str, "node_logging") do
        handle_logging(str)
      else
        handle_fn.(str)
      end
    else
      receive_response(str, handle_fn)
    end
  end

  def handle_json(msg) do
    json = Poison.decode!(msg)
    %{data: json}
  end

  def handle_logging(msg) do
    _ = Logger.warn(inspect(msg))
    %{}
  end

  def handle_info(msg, state) do
    _ = Logger.warn(inspect(msg))
    {:noreply, state}
  end
end
