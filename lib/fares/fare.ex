defmodule Fares.Fare do
  @moduledoc """
  Represents a method of paying for transit on the MBTA.
  """

  alias Routes.Route

  @type fare_name :: {atom, String.t()} | atom
  @type media ::
          :charlie_card
          | :charlie_ticket
          | :cash
          | :commuter_ticket
          | :contactless_payment
          | :mticket
          | :student_card
          | :senior_card
          | :paper_ferry
          | :special_event
  @type reduced :: nil | :student | :senior_disabled | :any
  @type duration :: :single_trip | :round_trip | :day | :week | :weekend | :month | :invalid
  @type t :: %__MODULE__{
          mode: Route.route_type() | :massport_shuttle,
          name: fare_name,
          media: [media],
          reduced: reduced,
          duration: duration,
          cents: non_neg_integer,
          additional_valid_modes: [Route.route_type()],
          price_label: String.t() | nil
        }

  defstruct mode: nil,
            name: nil,
            media: [],
            reduced: nil,
            duration: nil,
            cents: 0,
            additional_valid_modes: [],
            price_label: nil

  @spec valid_modes(t() | nil) :: [Route.route_type()]
  def valid_modes(nil), do: []

  def valid_modes(%__MODULE__{mode: mode, additional_valid_modes: additional_valid_modes}),
    do: [mode] ++ additional_valid_modes
end
