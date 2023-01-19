defmodule Feedback.FakeDateTimeTest do
  @moduledoc false
  use ExUnit.Case

  describe "utc_now/1" do
    test "can start the application" do
      assert Feedback.FakeDateTime.utc_now() ==
               Enum.at(Tuple.to_list(DateTime.from_unix(1_562_573_043)), 1)
    end
  end
end
