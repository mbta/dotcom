defmodule TripPlanner.Form do
  @moduledoc """
  Describing the trip planner form.
  """

  @default_location Map.from_struct(TripPlan.NamedPosition)

  @defaults %{
    "from" =>  @default_location,
    "to" => @default_location
  }

  def new_with_defaults(params) do
    @defaults
    |> Map.merge(params, fn _, one, two -> Map.merge(one, two) end)
    |> Map.take(Map.keys(@defaults))
    |> Phoenix.Component.to_form(as: :plan) # should have no erros initially.
    # |> Phoenix.Component.to_form(as: :plan, error: errors())
  end

  # https://www.elixirstreams.com/tips/phoenix-forms-without-changesets
  # defp errors do
  #   %{
  #     "from" => "Origin location required",
  #     "to" => "Destination location required"
  #   }
  # end
end
