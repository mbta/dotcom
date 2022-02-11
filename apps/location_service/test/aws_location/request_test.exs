defmodule LocationService.AWS.RequestTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import Mock
  import LocationService.AWS.Request

  describe "new/1" do
    test "uses a %ExAws.Operation.RestQuery{} to request a geocode for an address" do
      Mock.with_mock ExAws, [:passthrough], request: fn operation -> operation end do
        search_text = "Somewhere over the rainbow"
        operation = new(search_text)

        assert %ExAws.Operation.RestQuery{
                 path: "/places/v0/indexes/dotcom-dev-here/search/text",
                 service: :places
               } = operation
      end
    end

    test "uses Text body param for an address text" do
      Mock.with_mock ExAws, [:passthrough], request: fn operation -> operation end do
        search_text = "200 Zoom Street"
        operation = new(search_text)

        assert %ExAws.Operation.RestQuery{
                 body: %{
                   Text: search_text
                 }
               } = operation
      end
    end

    test "uses Position body param for a set of coordinates" do
      Mock.with_mock ExAws, [:passthrough], request: fn operation -> operation end do
        search_coords = [42.124, -71.214]
        operation = new(search_coords)

        assert %ExAws.Operation.RestQuery{
                 body: %{
                   Position: search_coords
                 }
               } = operation
      end
    end
  end
end
