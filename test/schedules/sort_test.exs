defmodule SortTest do
  use ExUnit.Case, async: true

  import Schedules.Sort
  import Timex, only: [shift: 2]

  alias Schedules.Schedule
  alias Schedules.Trip

  describe "sort_by_first_departure/1" do
  end

  describe "sort_by_first_shared_stop/1" do
  end
end
