defmodule Alerts.Alert do
  @moduledoc "Module for representation of an alert, including information such as description, severity or additional URL to learn more"

  use Dotcom.Gettext.Sigils
  use Timex

  alias Alerts.{InformedEntity, InformedEntitySet, Priority}

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

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
    :single_tracking,
    :station_closure,
    :station_issue,
    :stop_moved,
    :summary,
    :suspension,
    :track_change,
    :unknown | @ongoing_effects
  ]

  @lifecycles [:new, :ongoing, :ongoing_upcoming, :unknown, :upcoming]

  defstruct id: "",
            active_period: [],
            banner: "",
            cause: "",
            created_at: nil,
            description: "",
            effect: :unknown,
            header: "",
            image: nil,
            image_alternative_text: nil,
            informed_entity: %InformedEntitySet{},
            lifecycle: :unknown,
            priority: :low,
            severity: 5,
            updated_at: Timex.now(),
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
          | :single_tracking
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
          active_period: [period_pair],
          banner: String.t() | nil,
          cause: String.t(),
          created_at: DateTime.t() | nil,
          description: String.t() | nil,
          effect: effect,
          header: String.t(),
          image: String.t() | nil,
          image_alternative_text: String.t() | nil,
          informed_entity: InformedEntitySet.t(),
          lifecycle: lifecycle,
          priority: Priority.priority_level(),
          severity: severity,
          updated_at: DateTime.t(),
          url: String.t() | nil
        }

  @type icon_type :: :alert | :cancel | :none | :shuttle | :snow

  @spec new(Keyword.t()) :: t()
  def new(keywords \\ [])

  def new([]) do
    %__MODULE__{}
  end

  def new(keywords) do
    keywords
    |> build_struct()
    |> set_priority()
    |> set_direction_ids()
    |> ensure_entity_set()
  end

  @spec update(t(), Keyword.t()) :: t()
  def update(%__MODULE__{} = alert, keywords) do
    alert
    |> struct!(keywords)
    |> set_priority()
    |> set_direction_ids()
    |> ensure_entity_set()
  end

  defp set_direction_ids(%__MODULE__{effect: :station_closure} = alert) do
    informed_entities = Enum.map(alert.informed_entity, &set_direction_id/1)

    Map.put(alert, :informed_entity, informed_entities)
  end

  defp set_direction_ids(%__MODULE__{} = alert), do: alert

  defp set_direction_id(%InformedEntity{direction_id: nil, route_type: 1} = entity) do
    stop = @stops_repo.get(entity.stop)

    if stop && stop.child? do
      direction_id =
        stop.id
        |> @route_patterns_repo.by_stop_id()
        |> Enum.filter(&(&1.route_id == entity.route))
        |> List.first()
        |> Map.get(:direction_id)

      %InformedEntity{entity | direction_id: direction_id}
    else
      entity
    end
  end

  defp set_direction_id(entity), do: entity

  @spec set_priority(map) :: map
  defp set_priority(%__MODULE__{} = alert) do
    %__MODULE__{alert | priority: Priority.priority(alert)}
  end

  @spec build_struct(Keyword.t()) :: t()
  defp build_struct(keywords), do: struct!(__MODULE__, keywords)

  @spec ensure_entity_set(map) :: t()
  defp ensure_entity_set(alert) do
    %__MODULE__{alert | informed_entity: InformedEntitySet.new(alert.informed_entity)}
  end

  @spec all_types :: [effect]
  def all_types, do: @all_types

  @spec ongoing_effects :: [effect]
  def ongoing_effects, do: @ongoing_effects

  @spec lifecycles :: [lifecycle]
  def lifecycles, do: @lifecycles

  @spec get_entity(t, :route | :stop | :route_type | :trip | :direction_id) :: Enumerable.t()
  @doc "Helper function for retrieving InformedEntity values for an alert"
  def get_entity(%__MODULE__{informed_entity: %InformedEntitySet{route: set}}, :route), do: set
  def get_entity(%__MODULE__{informed_entity: %InformedEntitySet{stop: set}}, :stop), do: set

  def get_entity(%__MODULE__{informed_entity: %InformedEntitySet{route_type: set}}, :route_type),
    do: set

  def get_entity(%__MODULE__{informed_entity: %InformedEntitySet{trip: set}}, :trip), do: set

  def get_entity(
        %__MODULE__{informed_entity: %InformedEntitySet{direction_id: set}},
        :direction_id
      ),
      do: set

  def access_alert_types do
    [elevator_closure: "Elevator", escalator_closure: "Escalator", access_issue: "Other"]
  end

  @doc "Returns a friendly name for the alert's effect"
  @spec human_effect(t) :: String.t()
  def human_effect(%__MODULE__{effect: effect}) do
    do_human_effect(effect)
  end

  @spec do_human_effect(effect) :: String.t()
  defp do_human_effect(:amber_alert), do: ~t"Amber Alert"
  defp do_human_effect(:cancellation), do: ~t"Cancellation"
  defp do_human_effect(:delay), do: ~t"Delay"
  defp do_human_effect(:suspension), do: ~t"Suspension"
  defp do_human_effect(:track_change), do: ~t"Track Change"
  defp do_human_effect(:detour), do: ~t"Detour"
  defp do_human_effect(:shuttle), do: ~t"Shuttle"
  defp do_human_effect(:stop_closure), do: ~t"Stop Closure"
  defp do_human_effect(:dock_closure), do: ~t"Dock Closure"
  defp do_human_effect(:station_closure), do: ~t"Station Closure"
  defp do_human_effect(:stop_moved), do: ~t"Stop Move"
  defp do_human_effect(:extra_service), do: ~t"Extra Service"
  defp do_human_effect(:schedule_change), do: ~t"Schedule Change"
  defp do_human_effect(:service_change), do: ~t"Service Change"
  defp do_human_effect(:snow_route), do: ~t"Snow Route"
  defp do_human_effect(:stop_shoveling), do: ~t"Snow Shoveling"
  defp do_human_effect(:station_issue), do: ~t"Station Issue"
  defp do_human_effect(:dock_issue), do: ~t"Dock Issue"
  defp do_human_effect(:access_issue), do: ~t"Access Issue"
  defp do_human_effect(:facility_issue), do: ~t"Facility Issue"
  defp do_human_effect(:bike_issue), do: ~t"Bike Issue"
  defp do_human_effect(:parking_issue), do: ~t"Parking Issue"
  defp do_human_effect(:parking_closure), do: ~t"Parking Closure"
  defp do_human_effect(:elevator_closure), do: ~t"Elevator Closure"
  defp do_human_effect(:escalator_closure), do: ~t"Escalator Closure"
  defp do_human_effect(:policy_change), do: ~t"Policy Change"
  defp do_human_effect(:summary), do: ~t"Summary"
  defp do_human_effect(:single_tracking), do: ~t"Single Tracking"
  defp do_human_effect(_), do: ~t"Unknown"

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

  @spec human_label(t) :: String.t()
  def human_label(%{lifecycle: lifecycle})
      when lifecycle not in [:new, :unknown] do
    do_human_lifecycle(lifecycle)
  end

  def human_label(_), do: ""

  def human_severity(%__MODULE__{effect: :delay, severity: severity}),
    do: do_human_delay_severity(severity)

  def human_severity(%__MODULE__{}), do: nil

  defp do_human_delay_severity(3), do: "up to 10 min"
  defp do_human_delay_severity(4), do: "up to 15 min"
  defp do_human_delay_severity(5), do: "up to 20 min"
  defp do_human_delay_severity(6), do: "up to 25 min"
  defp do_human_delay_severity(7), do: "up to 30 min"
  defp do_human_delay_severity(8), do: "of more than 30 min"
  defp do_human_delay_severity(9), do: "of more than an hour"
  defp do_human_delay_severity(_), do: nil

  @spec icon(t) :: icon_type
  def icon(%{priority: :low}), do: :none
  def icon(%{priority: :high, effect: :suspension}), do: :cancel
  def icon(%{priority: :high, effect: :cancellation}), do: :cancel
  def icon(%{priority: :high, effect: :snow_route}), do: :snow
  def icon(%{priority: :high, effect: :shuttle}), do: :shuttle
  def icon(_), do: :alert

  def image(%{image: image}), do: image
  def image(_), do: nil

  def image_alternative_text(%{image_alternative_text: image_alternative_text}),
    do: image_alternative_text

  def image_alternative_text(_), do: nil

  @spec high_severity_or_high_priority?(t) :: boolean()
  def high_severity_or_high_priority?(%{priority: :high}), do: true

  def high_severity_or_high_priority?(%{severity: severity}) when severity >= 7,
    do: true

  def high_severity_or_high_priority?(_), do: false

  @spec municipality(t) :: String.t() | nil
  def municipality(alert) do
    alert
    |> get_entity(:stop)
    |> MapSet.delete(nil)
    |> Enum.find_value(fn stop_id ->
      with %Stops.Stop{} = stop <- @stops_repo.get(stop_id) do
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
    case Timex.format(t, "{ISO:Extended}") do
      {:ok, formatted_time} -> formatted_time
      _ -> nil
    end
  end
end
