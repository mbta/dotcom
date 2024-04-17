defmodule Facilities.RepoTest do
  use ExUnit.Case

  import Mock

  alias Facilities.Repo
  alias MBTA.Api.Facilities

  describe "get_for_stop/1" do
    test "should call the api" do
      with_mock Facilities, filter_by: fn _stop_id -> [] end do
        assert [] = Repo.get_for_stop("test-id")
        assert_called(Facilities.filter_by([{"stop", "test-id"}]))
      end
    end
  end
end
