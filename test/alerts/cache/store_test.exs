defmodule Alerts.Cache.StoreTest do
  use ExUnit.Case

  alias Alerts.Cache.Store

  @now Timex.parse!("2017-06-08T10:00:00-05:00", "{ISO:Extended}")

  setup_all do
    _ = start_supervised(Alerts.Cache.Store)
    :ok
  end

  test "updating and fetching without a banner" do
    alert1 =
      Alerts.Alert.new(
        id: "123",
        informed_entity: [
          %Alerts.InformedEntity{route: "Blue"},
          %Alerts.InformedEntity{stop: "place-pktrm"}
        ]
      )

    alert2 =
      Alerts.Alert.new(
        id: "456",
        informed_entity: [
          %Alerts.InformedEntity{route: "Red"}
        ]
      )

    alerts = [alert1, alert2]

    Store.update(alerts, nil)

    assert Enum.sort(Store.all_alerts(@now)) == Enum.sort(alerts)
    assert Store.alert_ids_for_routes(["Blue"]) == ["123"]
    assert Store.alert_ids_for_routes([nil]) == ["123"]
    assert Enum.sort(Store.alert_ids_for_routes(["Blue", "Red", "Magenta"])) == ["123", "456"]
    assert Store.alerts(["123"], @now) == [alert1]
    assert Enum.sort(Store.alerts(["123", "456", "xyz"], @now)) == Enum.sort([alert1, alert2])
  end

  test "update and fetches banner" do
    banner = %Alerts.Banner{id: "5", title: "Title", url: "https://google.com"}
    Store.update([], banner)
    assert Store.banner() == banner

    Store.update([], nil)
    assert Store.banner() == nil
  end

  test "alerts come back in sorted order" do
    alert1 = %Alerts.Alert{id: "123", effect: :cancellation}
    alert2 = %Alerts.Alert{id: "456", effect: :policy_change}

    Store.update([alert1, alert2], nil)
    assert Store.all_alerts(@now) == [alert1, alert2]
    assert Store.alerts(["123", "456"], @now) == [alert1, alert2]

    Store.update([alert2, alert1], nil)
    assert Store.all_alerts(@now) == [alert1, alert2]
    assert Store.alerts(["123", "456"], @now) == [alert1, alert2]
  end

  test "gets the alerts by the stop id" do
    alert1 = %Alerts.Alert{
      id: "123",
      effect: :station_closure,
      informed_entity: %Alerts.InformedEntitySet{stop: MapSet.new(["543", "654"])}
    }

    alert2 = %Alerts.Alert{
      id: "124",
      effect: :station_closure,
      informed_entity: %Alerts.InformedEntitySet{stop: MapSet.new(["543"])}
    }

    alert3 = %Alerts.Alert{
      id: "125",
      effect: :station_closure,
      informed_entity: %Alerts.InformedEntitySet{stop: MapSet.new(["987", "333"])}
    }

    alert4 = %Alerts.Alert{id: "126", effect: :cancellation}

    Store.update([alert1, alert2, alert3, alert4], nil)

    assert Enum.sort(Store.alert_ids_for_stop_id("543")) == Enum.sort(["123", "124"])
  end
end
