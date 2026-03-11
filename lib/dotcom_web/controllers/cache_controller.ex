defmodule DotcomWeb.CacheController do
  @moduledoc """
  A controller that allows us to interact with the cache.
  """

  use DotcomWeb, :controller

  require Logger

  import Dotcom.Cache.Multilevel, only: [get_all_keys: 0]

  plug :accepts, ~w(html)
  plug :put_view, __MODULE__.View

  @cache Application.compile_env!(:dotcom, :cache)

  @doc """
  Lists all of the cache keys grouped by key component.
  Each key is a link to the get_cache_values page for that key.
  """
  def get_cache_keys(conn, _) do
    case get_all_keys() do
      {:ok, keys} ->
        conn
        |> put_status(:ok)
        |> render(:index, group_structured_keys(keys))

      _ ->
        Logger.warning("dotcom_web.cache_controller.error")

        send_resp(conn, 500, "") |> halt()
    end
  end

  # A structured key is one shaped like
  # "<module>|<function_name>|<args>", where args is Base 64
  # encoded. An unstructured key is anything else.
  #
  # Given a list of structured and unstructured keys, this function
  # groups them into structured versus unstructured, and nests the
  # structured keys first by module name, and then by function name.
  #
  # It leaves the unstructured keys as a plain old list.
  defp group_structured_keys(keys) do
    keys
    |> Enum.map(
      &(&1
        |> String.split("|")
        |> parse_structured()
        |> Map.put(:raw, &1))
    )
    |> Enum.group_by(& &1.type)
    |> Enum.into(%{structured_keys: [], unstructured_keys: []})
    |> Map.update!(:structured_keys, &nest_by_mod_and_fun/1)
  end

  defp parse_structured([mod, fun, base_64_args]),
    do: %{
      type: :structured_keys,
      mod: mod,
      fun: fun,
      args: base_64_args |> Base.decode64!()
    }

  defp parse_structured(_), do: %{type: :unstructured_keys}

  defp nest_by_mod_and_fun(structured_keys) do
    structured_keys
    |> Enum.group_by(& &1.mod)
    |> Map.new(fn {mod, keys} -> {mod, keys |> Enum.group_by(& &1.fun)} end)
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

        :timer.sleep(1_000)

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
      <div style="padding: 10px 10px 15px 10px; background: mediumpurple;">
        <span :for={{k, _} <- @structured_keys}>
          <a href={"##{k}"} style="color: white;">{k}</a>&nbsp;
        </span>
        <span :if={@unstructured_keys |> Enum.any?()}>
          <a href="#unstructured" style="color: white;">unstructured keys</a>&nbsp;
        </span>
      </div>

      <.structured_key_section
        :for={{mod, keys_by_fun} <- @structured_keys |> Enum.sort_by(fn {mod, _} -> mod end)}
        mod={mod}
        keys_by_fun={keys_by_fun}
        }
      />

      <.unstructured_key_section :if={@unstructured_keys |> Enum.any?()} keys={@unstructured_keys} />
      """
    end

    defp structured_key_section(assigns) do
      ~H"""
      <h1 style="padding: 10px; color: white; background: indianred;" id={@mod}>{@mod}</h1>

      <div
        :for={{fun, key_list} <- @keys_by_fun |> Enum.sort_by(fn {fun, _} -> fun end)}
        style="margin-left: 5px"
      >
        <h2>{fun}</h2>

        <ul>
          <li :for={key <- key_list |> Enum.sort_by(& &1.args)}>
            <.key_link key={key.raw} display={key.args} />
          </li>
        </ul>
      </div>
      """
    end

    defp unstructured_key_section(assigns) do
      ~H"""
      <h1 style="padding: 10px; color: white; background: indianred;" id="unstructured">
        Unstructured Keys
      </h1>

      <ul>
        <li :for={raw_key <- @keys |> Enum.map(& &1.raw) |> Enum.sort()}>
          <.key_link key={raw_key} display={raw_key} />
        </li>
      </ul>
      """
    end

    defp key_link(assigns) do
      ~H"""
      <a href={"/cache/#{@key}"} style="color: black;"><code>{@display}</code></a>
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
