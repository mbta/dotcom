defmodule DotcomWeb.Hooks.SyncUrlParam do
  @moduledoc """
  Keeps an assign synchronized with a URL query param.

    * On `handle_params`, the param's value (or `nil` when absent) is assigned
      to the socket, so visiting a URL with the param set loads that value.
    * When the configured event fires, the hook halts it and `push_patch`es the
      current URL with the param updated (or removed, when the value is `nil`
      or `""`), which in turn updates the assign via `handle_params`.

  ## Options

    * `:param` - the URL query param name (string)
    * `:assign` - the assign key to keep in sync (atom)
    * `:event` - the LiveView event that changes the value (string)
    * `:event_key` - the key in the event params holding the new value (string)
    * `:validate` - optional function of `(value, socket)` that returns whether
      the value is valid; invalid values are cleared from the assign and URL

  ## Example

      on_mount {DotcomWeb.Hooks.SyncUrlParam,
                %{param: "variant", assign: :selected_variant, event: "set_variant", event_key: "option"}}

  The LiveView can react to the value changing in its own `handle_params/3`,
  which runs after this hook, e.g. by checking `changed?(socket, :selected_variant)`.
  """

  import Phoenix.Component, only: [assign: 3]
  import Phoenix.LiveView, only: [attach_hook: 4, push_patch: 2, put_private: 3]

  def on_mount(
        %{param: param, assign: key, event: event, event_key: event_key} = config,
        _,
        _,
        socket
      ) do
    validate = Map.get(config, :validate, fn _, _ -> true end)

    {:cont,
     socket
     |> assign(key, nil)
     |> attach_hook({__MODULE__, param}, :handle_params, fn params, uri, socket ->
       value = Map.get(params, param)
       socket = put_private(socket, {__MODULE__, :uri}, URI.parse(uri))

       case value do
         nil ->
           {:cont, assign(socket, key, nil)}

         value ->
           case validate.(value, socket) do
             true ->
               {:cont, assign(socket, key, value)}

             false ->
               {:halt,
                socket
                |> assign(key, nil)
                |> push_patch(to: patched_path(socket, param, nil))}
           end
       end
     end)
     |> attach_hook({__MODULE__, param}, :handle_event, fn
       ^event, event_params, socket ->
         {:halt, push_patch(socket, to: patched_path(socket, param, event_params[event_key]))}

       _, _, socket ->
         {:cont, socket}
     end)}
  end

  defp patched_path(socket, param, value) do
    uri = socket.private[{__MODULE__, :uri}]
    update_query(uri, &put_or_delete(&1, param, value))
  end

  defp put_or_delete(query, param, value) when value in [nil, ""], do: Map.delete(query, param)
  defp put_or_delete(query, param, value), do: Map.put(query, param, value)

  defp update_query(%URI{path: path, query: query}, fun) do
    case (query || "") |> URI.decode_query() |> fun.() do
      query when query == %{} -> path
      query -> "#{path}?#{URI.encode_query(query)}"
    end
  end
end
