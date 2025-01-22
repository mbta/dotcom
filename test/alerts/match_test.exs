defmodule Alerts.MatchTest do
  use ExUnit.Case, async: true
  use Timex

  alias Alerts.Alert
  alias Alerts.InformedEntity

  test ".match returns alerts matching the provided InformedEntity" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3"
          }
        ]
      )
    ]

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 2}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{route: "2"}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route: "21"}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{stop: "3"}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{stop: "31"}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2"}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "21"}) == []

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2", stop: "3"}) ==
             alerts

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2", stop: "4"}) == []
  end

  test ".match can include partially defined informed entities" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2"
          }
        ]
      )
    ]

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 2}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{route: "2"}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route: "21"}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{stop: "3"}) == []
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2"}) == alerts
    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "21"}) == []

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2", stop: "3"}) ==
             alerts

    assert Alerts.Match.match(alerts, %InformedEntity{route_type: 1, route: "2", stop: "4"}) ==
             alerts
  end

  test ".match can take a datetime to filter further" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{stop: "1"}
        ],
        active_period: [
          {nil, ~N[2016-06-01T00:00:00]},
          {NaiveDateTime.from_erl!({{2016, 6, 2}, {0, 0, 0}}), NaiveDateTime.from_erl!({{2016, 6, 2}, {1, 0, 0}})},
          {NaiveDateTime.from_erl!({{2016, 6, 3}, {0, 0, 0}}), nil}
        ]
      )
    ]

    ie = %InformedEntity{stop: "1"}

    assert Alerts.Match.match(alerts, ie) == alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 1}, {0, 0, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 2}, {0, 0, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 2}, {0, 30, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 3}, {0, 0, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 4}, {0, 0, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 5, 20}, {0, 0, 0}})) ==
             alerts

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 1}, {12, 0, 0}})) ==
             []

    assert Alerts.Match.match(alerts, ie, NaiveDateTime.from_erl!({{2016, 6, 2}, {12, 0, 0}})) ==
             []
  end

  test ".match returns alerts that have a nil value for a non-nil key in the entity to match" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3"
          }
        ]
      )
    ]

    assert Alerts.Match.match(alerts, %InformedEntity{direction_id: 1, route: "2"}) == alerts
  end

  test ".match fails if the entity to match does not share a key with any of the entities in the alert" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3"
          }
        ]
      )
    ]

    assert Alerts.Match.match(alerts, %InformedEntity{direction_id: 1}) == []
  end

  test ".match returns alerts with activities if no activities are specified" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3",
            activities: MapSet.new([:board, :ride])
          }
        ]
      )
    ]

    assert Alerts.Match.match(alerts, %InformedEntity{stop: "3"}) == alerts
  end

  test ".match returns alerts with activities that are a superset of specified activities" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3",
            activities: MapSet.new([:board, :ride])
          }
        ]
      )
    ]

    query = %InformedEntity{
      stop: "3",
      activities: MapSet.new([:board])
    }

    assert Alerts.Match.match(alerts, query) == alerts
  end

  test ".match returns alerts with activities that are a subset of specified activities" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3",
            activities: MapSet.new([:board, :ride])
          }
        ]
      )
    ]

    query = %InformedEntity{
      stop: "3",
      activities: MapSet.new([:ride, :exit, :board])
    }

    assert Alerts.Match.match(alerts, query) == alerts
  end

  test ".match does not return alerts that do not have any of specified activities" do
    alerts = [
      Alert.new(
        informed_entity: [
          %InformedEntity{
            route_type: 1,
            route: "2",
            stop: "3",
            activities: MapSet.new([:board, :ride])
          }
        ]
      )
    ]

    query = %InformedEntity{
      stop: "3",
      activities: MapSet.new([:exit])
    }

    assert Alerts.Match.match(alerts, query) == []
  end
end
