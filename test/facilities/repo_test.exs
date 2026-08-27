defmodule Facilities.RepoTest do
  use ExUnit.Case

  import Mox

  alias Facilities.Repo

  setup :verify_on_exit!

  describe "get_for_stop/1" do
    test "should call the api" do
      MBTA.Api.Mock
      |> expect(:get_json, fn "/facilities/", [{"filter[stop]", "test-id"}] ->
        %JsonApi{data: []}
      end)

      assert [] = Repo.get_for_stop("test-id")
    end
  end
end
