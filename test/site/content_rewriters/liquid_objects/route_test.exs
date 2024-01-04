defmodule Site.ContentRewriters.LiquidObjects.RouteTest do
  use ExUnit.Case, async: true

  import Site.ContentRewriters.LiquidObjects.Route

  @routes_repo_api Application.compile_env!(:site, :routes_repo_api)

  describe "route_request/1" do
    test "it handles route requests for a valid/existing route ID" do
      assert route_request("83") == {:ok, "83" |> @routes_repo_api.get() |> Map.get(:long_name)}
    end

    test "it reports when there are no results (valid request, but no repo matches)" do
      assert route_request("999") == {:error, {:unmatched, "no route match"}}
    end

    test "it handles a blank request (no filters provided)" do
      assert route_request("") == {:error, {:empty, "no input"}}
    end
  end
end
