defmodule Facilities.RepoTest do
  use ExUnit.Case
  alias Facilities.Repo

  import Mock

  describe "get_for_stop/1" do
    test "should call the api" do
      with_mock MBTA.Api.Facilities, filter_by: fn _stop_id -> [] end do
        assert [] = Repo.get_for_stop("test-id")
        assert_called(MBTA.Api.Facilities.filter_by([{"stop", "test-id"}]))
      end
    end
  end
end
