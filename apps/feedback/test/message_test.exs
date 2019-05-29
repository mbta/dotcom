defmodule MessageTest do
  use ExUnit.Case, async: true

  import Feedback.Message

  describe "valid_service?/1" do
    test "is true when the service is in the service_option values" do
      for {_, value} <- service_options() do
        assert valid_service?(value)
      end
    end

    test "is false when the service is not in the service_option values" do
      refute valid_service?("")
      refute valid_service?(nil)
      refute valid_service?("Question")
      refute valid_service?("nonsense")
    end
  end
end
