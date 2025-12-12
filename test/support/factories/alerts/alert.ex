defmodule Test.Support.Factories.Alerts.Alert do
  @moduledoc """
  Generated fake data for %Alerts.Alert{}
  """

  alias Dotcom.Utils.ServiceDateTime
  use ExMachina

  alias Alerts.{Alert, InformedEntitySet, Priority}
  alias Test.Support.Factories

  def alert_factory do
    %Alert{
      id: :rand.uniform(999) |> Integer.to_string(),
      active_period: [{Faker.DateTime.forward(1), Faker.DateTime.forward(2)}],
      banner: nil,
      cause: Faker.Lorem.Shakespeare.king_richard_iii(),
      created_at: Timex.now(),
      description: Faker.Lorem.Shakespeare.king_richard_iii(),
      effect: Alert.all_types() |> Faker.Util.pick(),
      header: Faker.Lorem.Shakespeare.king_richard_iii(),
      image: Faker.Internet.image_url(),
      image_alternative_text: Faker.Lorem.Shakespeare.king_richard_iii(),
      informed_entity: Factories.Alerts.InformedEntitySet.build(:informed_entity_set),
      lifecycle: Alert.lifecycles() |> Faker.Util.pick(),
      priority: Priority.priority_levels() |> Faker.Util.pick(),
      severity: :rand.uniform(10),
      updated_at: Timex.now(),
      url: Faker.Internet.url()
    }
  end

  def alert_for_informed_entity_factory(attrs) do
    {informed_entity_attrs, attrs} = Map.pop(attrs, :informed_entity)

    build(
      :alert,
      attrs
      |> Map.put(
        :informed_entity,
        InformedEntitySet.new([
          Factories.Alerts.InformedEntity.build(:informed_entity, informed_entity_attrs)
        ])
      )
    )
  end

  def alert_for_route_factory(attrs) do
    {route_id, attrs} = Map.pop(attrs, :route_id)

    build(
      :alert,
      attrs
      |> Map.put(
        :informed_entity,
        InformedEntitySet.new([
          Factories.Alerts.InformedEntity.build(:informed_entity, route: route_id)
        ])
      )
    )
  end

  def alert_for_routes_factory(attrs) do
    {route_ids, attrs} = Map.pop(attrs, :route_ids)

    entities =
      route_ids |> Enum.map(&Factories.Alerts.InformedEntity.build(:informed_entity, route: &1))

    build(
      :alert,
      attrs
      |> Map.put(:informed_entity, InformedEntitySet.new(entities))
    )
  end

  def alert_for_stop_factory(attrs) do
    {stop_id, attrs} = Map.pop(attrs, :stop_id)

    build(
      :alert,
      attrs
      |> Map.put(
        :informed_entity,
        InformedEntitySet.new([
          Factories.Alerts.InformedEntity.build(:informed_entity, stop: stop_id)
        ])
      )
    )
  end

  def alert_for_trip_factory(attrs) do
    {trip_id, attrs} = Map.pop(attrs, :trip_id)

    build(
      :alert,
      attrs
      |> Map.put(
        :informed_entity,
        InformedEntitySet.new([
          Factories.Alerts.InformedEntity.build(:informed_entity, trip: trip_id)
        ])
      )
    )
  end

  def alert_for_trips_factory(attrs) do
    {trip_ids, attrs} = Map.pop(attrs, :trip_ids)

    entities =
      trip_ids |> Enum.map(&Factories.Alerts.InformedEntity.build(:informed_entity, trip: &1))

    build(
      :alert,
      attrs
      |> Map.put(:informed_entity, InformedEntitySet.new(entities))
    )
  end

  def active_during(alert, time) do
    %{alert | active_period: [{time_before(time), time_after(time)}]}
  end

  def active_now(alert) do
    alert |> active_during(Dotcom.Utils.DateTime.now())
  end

  def active_starting_at(alert, start_time) do
    %{alert | active_period: [{start_time, ServiceDateTime.end_of_service_day(start_time)}]}
  end

  def active_upcoming(alert) do
    start_time = time_after(Dotcom.Utils.DateTime.now() |> DateTime.shift(day: 7))
    end_time = time_after(start_time)
    %{alert | active_period: [{start_time, end_time}]}
  end

  # Returns a random time during the day today before the time provided.
  defp time_before(time) do
    between(Timex.beginning_of_day(time), time)
  end

  # Returns a random time during the day today after the time provided.
  defp time_after(time) do
    between(time, Timex.end_of_day(time))
  end

  # Returns a random time between the times provided in the Eastern time zone.
  defp between(time1, time2) do
    Faker.DateTime.between(time1, time2) |> Timex.to_datetime("America/New_York")
  end
end
