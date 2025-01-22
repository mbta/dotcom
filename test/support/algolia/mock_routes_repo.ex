defmodule Algolia.MockRoutesRepo do
  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]

  def by_stop("place-subway") do
    [get("HeavyRail")]
  end

  def by_stop("place-bus") do
    [get("1000")]
  end

  def by_stop("place-multi") do
    Enum.map(["HeavyRail", "LightRail", "1000", "CR-Commuterrail"], &get/1)
  end

  def by_stop("place-greenline") do
    [get("LightRail")]
  end

  def by_stop("place-commuter-rail") do
    [get("CR-Commuterrail")]
  end

  def by_stop("place-ferry") do
    [get("Boat-1000")]
  end

  def green_line do
    @routes_repo.green_line()
  end

  def all do
    Enum.map(["HeavyRail", "LightRail", "CR-Commuterrail", "1000", "Boat-1000"], &get/1)
  end

  def headsigns("CR-Commuterrail") do
    %{0 => "CR Terminus 1", 1 => "CR Terminus 2"}
  end

  def headsigns("1000") do
    %{0 => "Terminus 1", 1 => "Terminus 2"}
  end

  @direction_destinations %{0 => "Start", 1 => "End"}

  def get("HeavyRail"),
    do: %Routes.Route{
      id: "HeavyRail",
      description: :rapid_transit,
      name: "Heavy Rail",
      type: 1,
      direction_destinations: @direction_destinations
    }

  def get("LightRail"),
    do: %Routes.Route{
      id: "Green-LightRail",
      description: :rapid_transit,
      name: "Light Rail",
      type: 0,
      direction_destinations: @direction_destinations
    }

  def get("CR-Commuterrail"),
    do: %Routes.Route{
      id: "CR-Commuterrail",
      name: "Commuter Rail Line",
      type: 2,
      direction_destinations: @direction_destinations
    }

  def get("1000"), do: %Routes.Route{id: "1000", name: "1000", type: 3, direction_destinations: @direction_destinations}

  def get("Boat-1000"),
    do: %Routes.Route{
      id: "Boat-1000",
      description: :ferry,
      name: "Ferry Route",
      type: 4,
      direction_destinations: @direction_destinations
    }
end
