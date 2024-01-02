defmodule AlertsBench do
  use Benchfella

  alias Alerts.InformedEntity

  @ie %InformedEntity{
    route_type: 1,
    route: "2",
    stop: "3",
  }
  @alerts [
    Alerts.Alert.new(
      informed_entity: [@ie],
        active_period: [
          {nil, ~N[2016-06-01T00:00:00]},
          {~N[2016-06-02T00:00:00], ~N[2016-06-02T01:00:00]},
          {~N[2016-06-03T00:00:00], nil}
        ])
  ]


  bench "Alerts.Match.match" do
    @alerts = Alerts.Match.match(@alerts, %InformedEntity{route_type: 1})
    [] = Alerts.Match.match(@alerts, %InformedEntity{route_type: 2})
    @alerts = Alerts.Match.match(@alerts, %InformedEntity{route: "2"})
    [] = Alerts.Match.match(@alerts, %InformedEntity{route: "21"})
    @alerts = Alerts.Match.match(@alerts, %InformedEntity{stop: "3"})
    [] = Alerts.Match.match(@alerts, %InformedEntity{stop: "31"})
    @alerts = Alerts.Match.match(@alerts, %InformedEntity{route_type: 1, route: "2"})
    [] = Alerts.Match.match(@alerts, %InformedEntity{route_type: 1, route: "21"})
    @alerts = Alerts.Match.match(@alerts, %InformedEntity{route_type: 1, route: "2", stop: "3"})
    [] = Alerts.Match.match(@alerts, %InformedEntity{route_type: 1, route: "2", stop: "4"})
  end

  bench "Alerts.Match.match with times" do
    ie = %InformedEntity{route: "2"}

    @alerts = Alerts.Match.match(@alerts, ie)
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-06-01T00:00:00])
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-06-02T00:00:00])
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-06-02T00:30:00])
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-06-03T00:00:00])
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-06-04T00:00:00])
    @alerts = Alerts.Match.match(@alerts, ie, ~N[2016-05-20T00:00:00])

    [] = Alerts.Match.match(@alerts, ie, ~N[2016-06-01T12:00:00])
    [] = Alerts.Match.match(@alerts, ie, ~N[2016-06-02T12:00:00])
  end

  bench "IE.match?" do
    true = InformedEntity.match?(@ie, %InformedEntity{route_type: 1})
    false = InformedEntity.match?(@ie, %InformedEntity{route_type: 2})
    true = InformedEntity.match?(@ie, %InformedEntity{route: "2"})
    false = InformedEntity.match?(@ie, %InformedEntity{route: "21"})
    true = InformedEntity.match?(@ie, %InformedEntity{stop: "3"})
    false = InformedEntity.match?(@ie, %InformedEntity{stop: "31"})
    true = InformedEntity.match?(@ie, %InformedEntity{route_type: 1, route: "2"})
    false = InformedEntity.match?(@ie, %InformedEntity{route_type: 1, route: "21"})
    true = InformedEntity.match?(@ie, %InformedEntity{route_type: 1, route: "2", stop: "3"})
    false = InformedEntity.match?(@ie, %InformedEntity{route_type: 1, route: "2", stop: "4"})
    true = InformedEntity.match?(@ie, %InformedEntity{route_type: 1, route: "2", stop: "3", trip: "trip"})
    false = InformedEntity.match?(@ie, %InformedEntity{trip: "trip"})
  end
end
