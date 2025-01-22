defmodule Dotcom.TripPlan.ItineraryRowList do
  @moduledoc """
  Information about an Itinerary that's used for rendering.

  An optional to and from name can be passed in.
  """

  alias Dotcom.TripPlan.Itinerary
  alias Dotcom.TripPlan.ItineraryRow
  alias Stops.Stop

  defstruct rows: [],
            destination: nil,
            accessible?: false,
            alerts?: false

  @typep destination :: {String.t(), Stop.id_t(), DateTime.t(), [Alerts.Alert.t()]}

  @type t :: %__MODULE__{
          rows: [ItineraryRow.t()],
          destination: destination,
          accessible?: boolean,
          alerts?: boolean
        }

  @type opts :: [to: String.t() | nil, from: String.t() | nil]

  @doc """
  Builds a ItineraryRowList from the given itinerary
  """
  @spec from_itinerary(Itinerary.t(), opts) :: t
  def from_itinerary(%Itinerary{legs: legs, accessible?: accessible?} = itinerary, opts \\ []) do
    alerts = get_alerts(itinerary)
    rows = get_rows(itinerary, opts, alerts)

    %__MODULE__{
      rows: rows,
      destination: get_destination(legs, opts, alerts),
      accessible?: accessible?,
      alerts?: Enum.any?(rows, fn row -> !Enum.empty?(row.alerts) end)
    }
  end

  @spec get_rows(Itinerary.t(), opts, [Alerts.Alert.t()]) :: [
          ItineraryRow.t()
        ]
  defp get_rows(itinerary, opts, alerts) do
    rows =
      for {leg, index} <- Enum.with_index(itinerary.legs) do
        leg
        |> ItineraryRow.from_leg(Enum.at(itinerary.legs, index + 1))
        |> ItineraryRow.fetch_alerts(alerts)
      end

    update_from_name(rows, opts[:from])
  end

  @spec get_alerts(Itinerary.t()) :: [Alerts.Alert.t()]
  defp get_alerts(itinerary) do
    itinerary.start
    |> Alerts.Repo.all()
    |> Dotcom.TripPlan.Alerts.filter_for_itinerary(itinerary)
  end

  @spec get_destination([TripPlan.Leg.t()], Keyword.t(), [Alerts.Alert.t()]) :: destination
  defp get_destination(legs, opts, alerts) do
    last_leg = List.last(legs)

    {name, stop_id} =
      last_leg
      |> Map.get(:to)
      |> ItineraryRow.name_from_position()

    alerts = Alerts.Stop.match(alerts, stop_id)
    {destination_name(name, opts[:to]), stop_id, last_leg.stop, alerts}
  end

  @spec destination_name(String.t(), String.t() | nil) :: String.t()
  defp destination_name(default_name, nil), do: default_name
  defp destination_name(_default_name, to_name), do: to_name

  @spec update_from_name([ItineraryRow.t()], String.t() | nil) :: [ItineraryRow.t()]
  defp update_from_name(rows, nil), do: rows

  defp update_from_name([first_row | rest_rows], from_name) do
    {_default_name, stop_id} = first_row.stop
    [%{first_row | stop: {from_name, stop_id}} | rest_rows]
  end
end

defimpl Enumerable, for: Dotcom.TripPlan.ItineraryRowList do
  def count(_itinerary_row_list) do
    {:error, __MODULE__}
  end

  def member?(_itinerary_row_list, %Dotcom.TripPlan.ItineraryRow{}) do
    {:error, __MODULE__}
  end

  def member?(_itinerary_row_list, _other) do
    {:ok, false}
  end

  def reduce(%{rows: rows}, acc, fun) do
    Enumerable.reduce(rows, acc, fun)
  end

  def slice(_itinerary_row_list) do
    {:error, __MODULE__}
  end
end
