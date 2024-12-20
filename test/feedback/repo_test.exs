defmodule Feedback.RepoTest do
  use ExUnit.Case, async: true

  import ExUnit.CaptureLog, only: [capture_log: 1]
  import Feedback.Repo
  import Mox
  import Test.Support.EnvHelpers, only: [set_log_level: 1]

  @message %Feedback.Message{
    comments: "This is great",
    service: "Something",
    no_request_response: false,
    incident_date_time: Timex.now(),
    email: "fake@email.com",
    first_name: "Test",
    last_name: "Public",
    phone: nil
  }

  @bad_message %Feedback.Message{
    comments: "This will error",
    service: "Something else",
    no_request_response: true,
    incident_date_time: Timex.now()
  }

  setup :verify_on_exit!

  describe "send_ticket/1" do
    setup do
      set_log_level(:info)
    end

    @tag :flaky
    test "returns ok and logs success" do
      expect(AwsClient.Mock, :send_raw_email, fn message ->
        assert message["RawMessage"]["Data"]

        Feedback.Test.send_email(message)
      end)

      log =
        capture_log(fn ->
          assert {:ok, _, _} = send_ticket(@message)
        end)

      assert log =~ "[info]"
      refute log =~ "[error]"
      assert log =~ "HEAT Ticket successfully sent"
    end

    test "returns error and logs error" do
      expect(AwsClient.Mock, :send_raw_email, fn _ ->
        {:error, :ignored}
      end)

      log =
        capture_log(fn ->
          assert {:error, _} = send_ticket(@bad_message)
        end)

      assert log =~ "[error]"
    end
  end
end
