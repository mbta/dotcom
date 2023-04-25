defmodule Alerts.Alert do
  @moduledoc "Module for representation of an alert, including information such as description, severity or additional URL to learn more"
  alias Alerts.Priority
  alias Alerts.InformedEntitySet, as: IESet

  defstruct id: "",
            header: "",
            informed_entity: %IESet{},
            active_period: [],
            effect: :unknown,
            severity: 5,
            lifecycle: :unknown,
            updated_at: Timex.now(),
            description: "",
            priority: :low,
            url: ""

  @type period_pair :: {DateTime.t() | nil, DateTime.t() | nil}

  @type effect ::
          :access_issue
          | :amber_alert
          | :bike_issue
          | :cancellation
          | :delay
          | :detour
          | :dock_issue
          | :dock_closure
          | :elevator_closure
          | :escalator_closure
          | :extra_service
          | :facility_issue
          | :no_service
          | :parking_closure
          | :parking_issue
          | :policy_change
          | :service_change
          | :shuttle
          | :suspension
          | :station_closure
          | :stop_closure
          | :stop_moved
          | :schedule_change
          | :snow_route
          | :station_issue
          | :stop_shoveling
          | :summary
          | :track_change
          | :unknown

  @type severity :: 0..10
  @type lifecycle :: :ongoing | :upcoming | :ongoing_upcoming | :new | :unknown
  @type id_t :: String.t()
  @type t :: %Alerts.Alert{
          id: id_t(),
          header: String.t(),
          informed_entity: IESet.t(),
          active_period: [period_pair],
          effect: effect,
          severity: severity,
          lifecycle: lifecycle,
          updated_at: DateTime.t(),
          description: String.t() | nil,
          priority: Priority.priority_level(),
          url: String.t() | nil
        }

  @type icon_type :: :alert | :cancel | :none | :shuttle | :snow

  use Timex

  @ongoing_effects [
    :cancellation,
    :detour,
    :no_service,
    :service_change,
    :snow_route,
    :shuttle,
    :stop_closure,
    :stop_shoveling
  ]

  @all_types [
    :access_issue,
    :amber_alert,
    :delay,
    :dock_closure,
    :dock_issue,
    :extra_service,
    :elevator_closure,
    :escalator_closure,
    :policy_change,
    :schedule_change,
    :station_closure,
    :station_issue,
    :stop_moved,
    :summary,
    :suspension,
    :track_change,
    :unknown | @ongoing_effects
  ]

  @diversion_effects [
    :shuttle,
    :stop_closure,
    :station_closure,
    :detour
  ]

  @spec new(Keyword.t()) :: t()
  def new(keywords \\ [])

  def new([]) do
    %__MODULE__{}
  end

  def new(keywords) do
    keywords
    |> build_struct()
    |> set_priority()
    |> ensure_entity_set()
  end

  @spec update(t(), Keyword.t()) :: t()
  def update(%__MODULE__{} = alert, keywords) do
    alert
    |> struct!(keywords)
    |> set_priority()
    |> ensure_entity_set()
  end

  @spec set_priority(map) :: map
  defp set_priority(%__MODULE__{} = alert) do
    %__MODULE__{alert | priority: Priority.priority(alert)}
  end

  @spec build_struct(Keyword.t()) :: t()
  defp build_struct(keywords), do: struct!(__MODULE__, keywords)

  @spec ensure_entity_set(map) :: t()
  defp ensure_entity_set(alert) do
    %__MODULE__{alert | informed_entity: IESet.new(alert.informed_entity)}
  end

  @spec all_types :: [effect]
  def all_types, do: @all_types

  @spec ongoing_effects :: [effect]
  def ongoing_effects, do: @ongoing_effects

  @spec get_entity(t, :route | :stop | :route_type | :trip | :direction_id) :: Enumerable.t()
  @doc "Helper function for retrieving InformedEntity values for an alert"
  def get_entity(%__MODULE__{informed_entity: %IESet{route: set}}, :route), do: set
  def get_entity(%__MODULE__{informed_entity: %IESet{stop: set}}, :stop), do: set
  def get_entity(%__MODULE__{informed_entity: %IESet{route_type: set}}, :route_type), do: set
  def get_entity(%__MODULE__{informed_entity: %IESet{trip: set}}, :trip), do: set
  def get_entity(%__MODULE__{informed_entity: %IESet{direction_id: set}}, :direction_id), do: set

  def access_alert_types do
    [elevator_closure: "Elevator", escalator_closure: "Escalator", access_issue: "Other"]
  end

  @doc "Returns a friendly name for the alert's effect"
  @spec human_effect(t) :: String.t()
  def human_effect(%__MODULE__{effect: effect}) do
    do_human_effect(effect)
  end

  @spec do_human_effect(effect) :: String.t()
  defp do_human_effect(:amber_alert), do: "Amber Alert"
  defp do_human_effect(:cancellation), do: "Cancellation"
  defp do_human_effect(:delay), do: "Delay"
  defp do_human_effect(:suspension), do: "Suspension"
  defp do_human_effect(:track_change), do: "Track Change"
  defp do_human_effect(:detour), do: "Detour"
  defp do_human_effect(:shuttle), do: "Shuttle"
  defp do_human_effect(:stop_closure), do: "Stop Closure"
  defp do_human_effect(:dock_closure), do: "Dock Closure"
  defp do_human_effect(:station_closure), do: "Station Closure"
  defp do_human_effect(:stop_moved), do: "Stop Move"
  defp do_human_effect(:extra_service), do: "Extra Service"
  defp do_human_effect(:schedule_change), do: "Schedule Change"
  defp do_human_effect(:service_change), do: "Service Change"
  defp do_human_effect(:snow_route), do: "Snow Route"
  defp do_human_effect(:stop_shoveling), do: "Snow Shoveling"
  defp do_human_effect(:station_issue), do: "Station Issue"
  defp do_human_effect(:dock_issue), do: "Dock Issue"
  defp do_human_effect(:access_issue), do: "Access Issue"
  defp do_human_effect(:facility_issue), do: "Facility Issue"
  defp do_human_effect(:bike_issue), do: "Bike Issue"
  defp do_human_effect(:parking_issue), do: "Parking Issue"
  defp do_human_effect(:parking_closure), do: "Parking Closure"
  defp do_human_effect(:elevator_closure), do: "Elevator Closure"
  defp do_human_effect(:escalator_closure), do: "Escalator Closure"
  defp do_human_effect(:policy_change), do: "Policy Change"
  defp do_human_effect(:summary), do: "Summary"
  defp do_human_effect(_), do: "Unknown"

  @doc "Returns a friendly name for the alert's lifecycle"
  @spec human_lifecycle(t) :: String.t()
  def human_lifecycle(%__MODULE__{lifecycle: lifecycle}) do
    do_human_lifecycle(lifecycle)
  end

  @spec do_human_lifecycle(lifecycle) :: String.t()
  defp do_human_lifecycle(:new), do: "New"
  defp do_human_lifecycle(:upcoming), do: "Upcoming"
  defp do_human_lifecycle(:ongoing_upcoming), do: "Upcoming"
  defp do_human_lifecycle(:ongoing), do: "Ongoing"
  defp do_human_lifecycle(_), do: "Unknown"

  @doc """
  Show a label according to the following mutually exclusive rules:
    * if it is a delay, show a time estimatation
    * if now is withing the active period, show "today"
    * otherwise, show the lifecycle (unless is new or unknown)
  """
  @spec human_label(t) :: String.t()
  def human_label(%__MODULE__{effect: :delay, severity: 0}), do: ""
  def human_label(%__MODULE__{effect: :delay, severity: 1}), do: ""
  def human_label(%__MODULE__{effect: :delay, severity: 2}), do: ""
  def human_label(%__MODULE__{effect: :delay, severity: 3}), do: "up to 10 minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 4}), do: "up to 15 minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 5}), do: "up to 20 minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 6}), do: "up to 25 minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 7}), do: "up to 30 minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 8}), do: "30+ minutes"
  def human_label(%__MODULE__{effect: :delay, severity: 9}), do: "more than an hour"
  def human_label(alert), do: do_ongoing_upcoming(alert)

  @spec do_ongoing_upcoming(t) :: String.t()
  defp do_ongoing_upcoming(%{lifecycle: lifecycle})
       when lifecycle not in [:new, :unknown] do
    do_human_lifecycle(lifecycle)
  end

  defp do_ongoing_upcoming(_), do: ""

  @spec icon(t) :: icon_type
  def icon(%{priority: :low}), do: :none
  def icon(%{priority: :high, effect: :suspension}), do: :cancel
  def icon(%{priority: :high, effect: :cancellation}), do: :cancel
  def icon(%{priority: :high, effect: :snow_route}), do: :snow
  def icon(%{priority: :high, effect: :shuttle}), do: :shuttle
  def icon(_), do: :alert

  @spec is_high_severity_or_high_priority(t) :: boolean()
  def is_high_severity_or_high_priority(%{priority: :high}), do: true

  def is_high_severity_or_high_priority(%{severity: severity}) when severity >= 7,
    do: true

  def is_high_severity_or_high_priority(_), do: false

  @spec is_diversion(t) :: boolean()
  def is_diversion(%{effect: effect}),
    do: effect in @diversion_effects

  @spec municipality(t) :: String.t() | nil
  def municipality(alert) do
    alert
    |> get_entity(:stop)
    |> MapSet.delete(nil)
    |> Enum.find_value(fn stop_id ->
      with %Stops.Stop{} = stop <- Stops.Repo.get(stop_id) do
        stop.municipality
      end
    end)
  end
end

defimpl Poison.Encoder, for: Alerts.Alert do
  def encode(%Alerts.Alert{active_period: active_period_pairs} = alert, options) do
    active_period = Enum.map(active_period_pairs, &alert_active_period/1)

    Poison.Encoder.Map.encode(
      %{alert | active_period: active_period},
      options
    )
  end

  @spec alert_active_period(Alerts.Alert.period_pair()) :: [nil | binary]
  defp alert_active_period({first, last}) do
    [first, last] |> Enum.map(&format_time(&1))
  end

  defp format_time(t) do
    case Timex.format(t, "{YYYY}-{M}-{D} {h24}:{m}") do
      {:ok, formatted_time} -> formatted_time
      _ -> nil
    end
  end
end
