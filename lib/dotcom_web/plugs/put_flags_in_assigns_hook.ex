defmodule DotcomWeb.Plugs.PutFlagsInAssignsHook do
  @moduledoc """
    Grabs Laboratory flags from session and makes them available as assigns
  """

  import Phoenix.Component

  def on_mount(:default, _params, session, socket) do
    flags = Application.get_env(:laboratory, :features) |> Enum.map(fn {key, _, _} -> key end)

    socket =
      Enum.reduce(flags, socket, fn flag, socket ->
        value =
          case session_value = session[Atom.to_string(flag)] do
            nil -> nil
            _ -> session_value
          end

        socket |> assign(flag, value)
      end)

    {:cont, socket}
  end
end
