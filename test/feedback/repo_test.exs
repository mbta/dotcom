defmodule Feedback.RepoTest do
  use ExUnit.Case

  import ExUnit.CaptureLog, only: [capture_log: 1]
  import Feedback.Repo
  import Mock

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

  describe "send_ticket/1" do
    setup do
      old_level = Logger.level()

      on_exit(fn ->
        Logger.configure(level: old_level)
      end)

      Logger.configure(level: :info)
    end

    setup_with_mocks([
      {Feedback.Mailer, [],
       [
         send_heat_ticket: fn message, _ ->
           if message == @message do
             {:ok, %{}}
           else
             {:error, "Something went wrong"}
           end
         end
       ]}
    ]) do
      :ok
    end

    test "returns ok and logs success" do
      log =
        capture_log(fn ->
          assert {:ok, _, _} = send_ticket(@message)
        end)

      assert log =~ "[info]"
      refute log =~ "[error]"
      assert log =~ "HEAT Ticket successfully sent"
    end

    test "returns error and logs error" do
      log =
        capture_log(fn ->
          assert {:error, _} = send_ticket(@bad_message)
        end)

      assert log =~ "[error]"
    end
  end
end
