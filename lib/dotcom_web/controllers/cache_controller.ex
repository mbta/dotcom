defmodule DotcomWeb.CacheController do
  @moduledoc """
  A controller that allows us to interact with the cache.
  """

  use DotcomWeb, :controller

  require Logger

  plug :accepts, ~w(html)
  plug :put_view, __MODULE__.View

  @cache Application.compile_env!(:dotcom, :cache)

  @doc """
  Lists all of the cache keys grouped by key component.
  Each key is a link to the get_cache_values page for that key.
  """
  def get_cache_keys(conn, _) do
    case Dotcom.Cache.Multilevel.get_all_keys() do
      {:ok, keys} ->
        conn
        |> put_status(:ok)
        |> render(:index, %{keys: keys})

      result ->
        conn
        |> send_resp(:ok, inspect(result))
        |> halt()
    end
  end

  @doc """
  Gets all of the values in every node for the given key.

  We start a one-off GenServer that publishes the key we want a value for.
  Every Elixir node receives that message and publishes its value.
  That value could come from the local cache or from the shared Redis.
  The original publisher collects all of returned values.
  Because we don't even know the number of Elixir nodes, we have to use a timeout.
  After one second, we ask the publisher for its list of values.
  Then, we shut down the publisher.

  Status codes:
  200 - All values are the same. Returns one representative value.
  409 - Conflicting values exist. Returns a list of conflicting values.
  410 - The key wasn't found in any node.
  """
  def get_cache_values(conn, %{"path" => path}) do
    uuid = UUID.uuid4(:hex) |> String.upcase() |> String.to_atom()
    key = Enum.join(path, "|")

    case GenServer.start_link(Dotcom.Cache.Inspector.Publisher, uuid, name: uuid) do
      {:ok, _} ->
        GenServer.cast(uuid, {:load, key})

        :timer.sleep(1000)

        {status, values} = GenServer.call(uuid, :get)

        GenServer.stop(uuid)

        conn
        |> put_status(status)
        |> render(:diff, %{key: key, status: status, values: values})

      {:error, reason} ->
        conn
        |> send_resp(500, reason)
        |> halt()
    end
  end

  @doc """
  Flushes the cache given a key in the path.
  Simply use a / in the path where you would use a | in the key.
  Wildcards are supported.

  Examples:

  /cache/stops.repo/stop/* -> stops.repo|stop|*
  /cache/stops.repo/stop/1 -> stops.repo|stop|1
  """
  def flush_cache_keys(conn, %{"path" => path}) do
    key = Enum.join(path, "|")

    try do
      Kernel.apply(@cache, flush_cache_function(@cache), [key])
    rescue
      e in Redix.ConnectionError ->
        Logger.warning("dotcom_web.cache_controller.error error=redis-#{e.reason}")

      e in Redix.Error ->
        Logger.warning("dotcom_web.cache_controller.error error=redis-#{e.message}")
    end

    send_resp(conn, 202, "") |> halt()
  end

  defp flush_cache_function(cache) do
    if cache.__info__(:functions) |> Keyword.has_key?(:flush_keys) do
      :flush_keys
    else
      :delete
    end
  end

  defmodule View do
    @moduledoc """
    A view for diffs that includes syntax highlighting.
    """

    use Phoenix.Component

    @doc """
    View a diff of cache values.
    """
    def diff(assigns) do
      ~H"""
      <link
        href="https://cdn.jsdelivr.net/npm/highlightjs-themes@1.0.0/color-brewer.css"
        rel="stylesheet"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js">
      </script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/elixir.min.js">
      </script>
      <div style="width: 100%; max-width: 100%;">
        <pre><code  style={"background-color: #{color(@status)}; color: white;"}>{status_string(@status)}: {@key}</code></pre>
        <pre :for={value <- @values} style="white-space: pre-wrap; word-wrap: break-word;">
          <code class="language-elixir">{value}</code>
        </pre>
      </div>
      <script>
        hljs.highlightAll();
      </script>
      """
    end

    @doc """
    All cache keys grouped by key components and ending in links to individual cache values.
    """
    def index(assigns) do
      ~H"""
      <div style="width: 100%; max-width: 100%;">
        <div style="padding: 10px 10px 15px 10px; background: mediumpurple;">
          <span :for={{k, v} <- @keys}>
            <a href={"##{k}"} style="color: white;">{k}</a>&nbsp;
          </span>
        </div>
        <div :for={{k, v} <- @keys} style="border-bottom: 1px solid gray;">
          <h1 style="padding: 10px; color: white; background: indianred;" id={k}>{k}</h1>
          <.heading :if={is_map(v)} key={[k]} keys={v} />
          <.links :if={is_list(v)} key={[k]} keys={v} />
        </div>
      </div>
      """
    end

    # If the value is a map, we want to render the heading and continue on until we find links.
    defp heading(assigns) do
      ~H"""
      <div :for={{k, v} <- @keys} style={"margin-left: #{length(@key) * 5}px"}>
        <h2>{k}</h2>
        <.heading :if={is_map(v)} key={@key ++ [k]} keys={v} />
        <.links :if={is_list(v)} key={@key ++ [k]} keys={v} />
      </div>
      """
    end

    # If the value is a list, we now render links.
    defp links(assigns) do
      links =
        Enum.map(assigns.keys, fn key ->
          {
            Enum.join(assigns.key ++ [key], "|"),
            Path.join(["cache"] ++ assigns.key ++ [key])
          }
        end)

      assigns = assign(assigns, links: links)

      ~H"""
      <ul>
        <li :for={{k, v} <- @links}>
          <a href={v} style="color: black;">{k}</a>
        </li>
      </ul>
      """
    end

    defp color(:ok), do: "green"

    defp color(:conflict), do: "red"

    defp color(:gone), do: "grey"

    defp status_string(status) do
      status
      |> Atom.to_string()
      |> Recase.to_title()
      |> String.upcase()
    end
  end
end
