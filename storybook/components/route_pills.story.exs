defmodule DotcomWeb.Storybook.RoutePills do
  use PhoenixStorybook.Story, :component

  def function do
    &DotcomWeb.Components.RoutePills.route_pill/1
  end

  @routes [
    "Blue",
    "Green",
    "Orange",
    "Red"
  ]

  def variations do
    @routes
    |> Enum.map(fn route_id ->
      %Variation{
        id: route_id |> String.downcase() |> String.to_atom(),
        description: "#{route_id} line route lozenge",
        attributes: %{
          route_id: route_id
        }
      }
    end)
  end
end
