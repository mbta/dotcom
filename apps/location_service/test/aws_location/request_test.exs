defmodule AWSLocation.RequestTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import Mock
  import AWSLocation.Request

  describe "new/1" do
    setup_with_mocks([
      {ExAws, [:passthrough], [request: fn operation -> operation end]}
    ]) do
      :ok
    end

    test "uses a %ExAws.Operation.RestQuery{} to request a geocode for an address" do
      search_text = "Somewhere over the rainbow"
      operation = new(search_text)

      assert %ExAws.Operation.RestQuery{service: :places} = operation
    end

    test "uses Text body param for an address text" do
      search_text = "200 Zoom Street"
      operation = new(search_text)

      assert %ExAws.Operation.RestQuery{
               body: %{
                 Text: search_text
               }
             } = operation
    end

    test "uses Position body param for a set of coordinates" do
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
