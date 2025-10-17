defmodule Fares.RetailLocations.Data do
  @doc """
    Parses json from the existing data file and returns it.
  """

  use Dotcom.Gettext.Sigils

  use Nebulex.Caching.Decorators

  alias Fares.RetailLocations.Location
  alias MBTA.Api.Facilities
  alias Util.Position

  @cache Application.compile_env!(:dotcom, :cache)
  @ttl :timer.hours(24)

  @spec get :: [Location.t()]
  def get do
    [{"type", "FARE_VENDING_RETAILER"}]
    |> Facilities.filter_by()
    |> parse_v3_multiple
  end

  @spec build_r_tree :: :rstar.rtree()
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def build_r_tree do
    get()
    |> Enum.map(&build_point_from_location/1)
    |> Enum.reduce(:rstar.new(2), fn l, t -> :rstar.insert(t, l) end)
  end

  @spec k_nearest_neighbors(:rstar.rtree(), Position.t(), integer) :: [Location.t()]
  def k_nearest_neighbors(tree, location, k) do
    query = build_point_from_location(location)

    tree
    |> :rstar.search_nearest(query, k)
    |> Enum.map(&:rstar_geometry.value/1)
  end

  defp build_point_from_location(location) do
    :rstar_geometry.point2d(Position.longitude(location), Position.latitude(location), location)
  end

  @spec parse_v3_multiple(JsonApi.t() | {:error, any}) :: [Location.t()] | {:error, any}
  def parse_v3_multiple({:error, _} = error) do
    error
  end

  def parse_v3_multiple(api) do
    api.data
    |> Enum.map(&parse_v3_facility/1)
    |> Enum.map(fn {:ok, facility} -> facility end)
  end

  def parse_v3_facility({:ok, %JsonApi.Item{} = item}), do: parse_v3_facility(item)
  def parse_v3_facility({:error, [%JsonApi.Error{code: "not_found"} | _]}), do: {:ok, nil}
  def parse_v3_facility({:error, _} = error), do: error

  def parse_v3_facility(%JsonApi.Item{} = item) do
    location = %Location{
      name: item.attributes["long_name"],
      address: v3_property(item, "address"),
      latitude: item.attributes["latitude"],
      longitude: item.attributes["longitude"],
      phone: v3_property(item, "contact-phone"),
      payment: Enum.map(v3_property_multiple(item, "payment-form-accepted"), &pretty_payment/1)
    }

    {:ok, location}
  end

  @spec v3_property(JsonApi.Item.t(), String.t()) :: String.t()
  def v3_property(%JsonApi.Item{} = item, prop) do
    property =
      item.attributes["properties"]
      |> Enum.filter(&(&1["name"] == prop))
      |> List.first()

    property["value"]
  end

  @spec v3_property_multiple(JsonApi.Item.t(), String.t()) :: [String.t()]
  def v3_property_multiple(%JsonApi.Item{} = item, prop) do
    item.attributes["properties"]
    |> Enum.filter(&(&1["name"] == prop))
    |> Enum.map(& &1["value"])
  end

  @spec pretty_payment(String.t()) :: String.t()
  def pretty_payment("cash"), do: ~t"Cash"
  def pretty_payment("check"), do: ~t"Check"
  def pretty_payment("coin"), do: ~t"Coin"
  def pretty_payment("credit-debit-card"), do: ~t"Credit/Debit Card"
  def pretty_payment("e-zpass"), do: ~t"EZ Pass"
  def pretty_payment("invoice"), do: ~t"Invoice"
  def pretty_payment("mobile-app"), do: ~t"Mobile App"
  def pretty_payment("smartcard"), do: ~t"Smart Card"
end
