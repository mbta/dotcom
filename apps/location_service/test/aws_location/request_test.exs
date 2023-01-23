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
                 Text: ^search_text
               },
               path: "/places/v0/indexes/dotcom-dev-esri/search/text"
             } = operation
    end

    test "uses Position body param for a set of coordinates" do
      search_coords = [42.124, -71.214]
      operation = new(search_coords)

      assert %ExAws.Operation.RestQuery{
               body: %{
                 Position: [-71.214, 42.124]
               },
               path: "/places/v0/indexes/dotcom-dev-here/search/position"
             } = operation
    end

    test "uses config to get request pathname" do
      old_value = System.get_env("AWS_PLACE_INDEX_PREFIX")
      System.put_env("AWS_PLACE_INDEX_PREFIX", "dotcom-prod")

      on_exit(fn ->
        if old_value do
          System.put_env("AWS_PLACE_INDEX_PREFIX", old_value)
        else
          System.delete_env("AWS_PLACE_INDEX_PREFIX")
        end
      end)

      operation = new("Everywhere")

      assert %ExAws.Operation.RestQuery{
               path: "/places/v0/indexes/dotcom-prod-esri/search/text"
             } = operation
    end
  end

  describe "autocomplete/1" do
    setup_with_mocks([
      {ExAws, [:passthrough], [request: fn operation -> operation end]}
    ]) do
      :ok
    end

    test "searches for suggestions" do
      search_text = "Melrose"
      operation = autocomplete(search_text, 1)

      assert %ExAws.Operation.RestQuery{
               body: %{
                 Text: ^search_text,
                 MaxResults: 1
               },
               path: "/places/v0/indexes/dotcom-dev-here/search/suggestions"
             } = operation
    end

    test "limits by MaxResults" do
      operation = autocomplete("Somewhere", 7)

      assert %ExAws.Operation.RestQuery{
               body: %{
                 MaxResults: 7
               }
             } = operation
    end

    test "uses config to get request pathname" do
      old_value = System.get_env("AWS_PLACE_INDEX_PREFIX")
      System.put_env("AWS_PLACE_INDEX_PREFIX", "dotcom-prod")

      on_exit(fn ->
        if old_value do
          System.put_env("AWS_PLACE_INDEX_PREFIX", old_value)
        else
          System.delete_env("AWS_PLACE_INDEX_PREFIX")
        end
      end)

      operation = autocomplete("Everywhere", 1)

      assert %ExAws.Operation.RestQuery{
               path: "/places/v0/indexes/dotcom-prod-here/search/suggestions"
             } = operation
    end
  end
end
