defmodule Services.RepoTest do
  use ExUnit.Case
  import ExUnit.CaptureLog
  @moduletag :external
  import Mox
  alias Services.{Repo, Service}
  alias MBTA.Api.Services, as: ServicesApi

  test "by_route_id fetches services for a route" do
    assert [%Service{} | _] = Repo.by_route_id("Red")
  end

  test "by_route_id fetches services for a list" do
    assert [%Service{} | _] = Repo.by_route_id(["Red"])
  end

  test "by_route_id fetches services for the green line" do
    assert Repo.by_route_id("Green") == Repo.by_route_id("Green-B,Green-C,Green-D,Green-E")
  end

  test "by_route_id handles errors by logging them and returning an empty list" do
    stub(ServicesApi.Mock, :all, fn -> {:error, %{reason: "testing"}} end)
    stub(MBTA.Api.Mock, :get_json, fn _, _ -> {:error, %{reason: "testing"}} end)

    log =
      capture_log(fn ->
        assert [] = Repo.by_route_id("Red")
      end)

    assert log =~ "services_repo_handle_response_error"
  end
end
