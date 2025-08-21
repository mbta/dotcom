defmodule Algolia.Stop.Route do
  defstruct [:icon, :display_name, :type]

  @type t :: %__MODULE__{
          icon: atom,
          display_name: String.t(),
          type: [0..4]
        }

  def new(icon, routes) do
    %__MODULE__{
      icon: icon,
      display_name: Routes.Route.type_summary(icon, routes),
      type:
        icon
        |> Routes.Route.types_for_mode()
        |> List.first()
    }
  end
end
