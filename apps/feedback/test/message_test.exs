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

  describe "valid_subject_for_service?/2" do
    test "is true when the subject is in the allowed subject values for the given service option" do
      assert valid_subject_for_service?("Bus Stop", "Complaint")
      assert valid_subject_for_service?("Other", "Complaint")
      assert valid_subject_for_service?("MBTA Projects/Programs", "Suggestion")
      assert valid_subject_for_service?("Other", "Suggestion")
      assert valid_subject_for_service?("CharlieCards & Tickets", "Inquiry")
      assert valid_subject_for_service?("Other", "Inquiry")
      assert valid_subject_for_service?("Employee", "Commendation")
      assert valid_subject_for_service?("Other", "Commendation")
    end

    test "is false when the subject is not in the allowed subject values for the given service option" do
      refute valid_subject_for_service?("", "Complaint")
      refute valid_subject_for_service?(nil, "Complaint")
      refute valid_subject_for_service?(nil, "Complaint")
      refute valid_subject_for_service?("Fare Policy", "Complaint")
      refute valid_subject_for_service?("TAlerts/Countdowns/Apps", "Suggestion")
      refute valid_subject_for_service?("TAlerts/Countdowns/Apps", "Inquiry")
      refute valid_subject_for_service?("CTD", "Commendation")
    end
  end
end
