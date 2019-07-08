defmodule Feedback.MailerTest do
  use ExUnit.Case

  alias ExUnit.CaptureLog
  alias Feedback.{Mailer, Message, Test}

  @base_message %Message{
    comments: "",
    service: "Inquiry",
    request_response: false
  }

  describe "send_heat_ticket/2" do
    test "sends an email for heat 2" do
      Mailer.send_heat_ticket(
        %Message{comments: "", service: "Complaint", request_response: false},
        nil
      )

      assert Test.latest_message()["to"] == "test@test.com"
    end

    test "has the body format that heat 2 expects" do
      Mailer.send_heat_ticket(
        %Message{comments: "", service: "Complaint", request_response: false},
        nil
      )

      assert Test.latest_message()["text"] ==
               """
               <INCIDENT>
                 <SERVICE>Complaint</SERVICE>
                 <CATEGORY>Other</CATEGORY>
                 <TOPIC></TOPIC>
                 <SUBTOPIC></SUBTOPIC>
                 <MODE></MODE>
                 <LINE></LINE>
                 <STATION></STATION>
                 <INCIDENTDATE>07/08/2019 08:04</INCIDENTDATE>
                 <VEHICLE></VEHICLE>
                 <FIRSTNAME>Riding</FIRSTNAME>
                 <LASTNAME>Public</LASTNAME>
                 <FULLNAME>Riding Public</FULLNAME>
                 <CITY></CITY>
                 <STATE></STATE>
                 <ZIPCODE></ZIPCODE>
                 <EMAILID>reply@test.com</EMAILID>
                 <PHONE></PHONE>
                 <DESCRIPTION></DESCRIPTION>
                 <CUSTREQUIRERESP>No</CUSTREQUIRERESP>
                 <MBTASOURCE>Auto Ticket 2</MBTASOURCE>
               </INCIDENT>
               """
    end

    test "uses the comments of the message for the description" do
      Mailer.send_heat_ticket(%{@base_message | comments: "major issue to report"}, nil)

      assert Test.latest_message()["text"] =~
               "<DESCRIPTION>major issue to report</DESCRIPTION>"
    end

    test "uses the phone from the message in the phone field" do
      Mailer.send_heat_ticket(%{@base_message | phone: "617-123-4567"}, nil)
      assert Test.latest_message()["text"] =~ "<PHONE>617-123-4567</PHONE>"
    end

    test "sets the emailid to the one provided by the user" do
      Mailer.send_heat_ticket(%{@base_message | email: "disgruntled@user.com"}, nil)
      assert Test.latest_message()["text"] =~ "<EMAILID>disgruntled@user.com</EMAILID>"
    end

    test "when the user does not set an email, the email is reply@test.com" do
      Mailer.send_heat_ticket(@base_message, nil)
      assert Test.latest_message()["text"] =~ "<EMAILID>reply@test.com</EMAILID>"
    end

    test "when the user sets an empty string, the email is reply@test.com" do
      Mailer.send_heat_ticket(%{@base_message | email: ""}, nil)
      assert Test.latest_message()["text"] =~ "<EMAILID>reply@test.com</EMAILID>"
    end

    test "the email does not have leading or trailing spaces" do
      Mailer.send_heat_ticket(%{@base_message | email: "   fake_email@gmail.com  "}, nil)
      assert Test.latest_message()["text"] =~ "<EMAILID>fake_email@gmail.com</EMAILID>"
    end

    test "gives the full name as the name the user provided" do
      Mailer.send_heat_ticket(%{@base_message | name: "My Full Name"}, nil)
      assert Test.latest_message()["text"] =~ "<FULLNAME>My Full Name</FULLNAME>"
    end

    test "also puts the full name in the first name field" do
      Mailer.send_heat_ticket(%{@base_message | name: "My Full Name"}, nil)
      assert Test.latest_message()["text"] =~ "<FIRSTNAME>My Full Name</FIRSTNAME>"
    end

    test "if the user does not provide a name, sets the full name to riding public" do
      Mailer.send_heat_ticket(%{@base_message | name: ""}, nil)
      assert Test.latest_message()["text"] =~ "<FULLNAME>Riding Public</FULLNAME>"
    end

    test "if the user provides a name, sets the last name to -" do
      Mailer.send_heat_ticket(%{@base_message | name: "My Full Name"}, nil)
      assert Test.latest_message()["text"] =~ "<LASTNAME>-</LASTNAME>"
    end

    test "sets customer requests response to no" do
      Mailer.send_heat_ticket(@base_message, nil)
      assert Test.latest_message()["text"] =~ "<CUSTREQUIRERESP>No</CUSTREQUIRERESP>"
    end

    test "can attach a photo" do
      Mailer.send_heat_ticket(@base_message, [
        %{path: "/tmp/nonsense.txt", filename: "test.png"}
      ])

      assert Test.latest_message()["attachments"] == [
               %{
                 "path" => "/tmp/nonsense.txt",
                 "filename" => "test.png"
               }
             ]
    end

    test "does not log anything when the user doesnt want feedback" do
      old_level = Logger.level()

      on_exit(fn ->
        Logger.configure(level: old_level)
      end)

      refute CaptureLog.capture_log(fn ->
               Logger.configure(level: :info)

               Mailer.send_heat_ticket(
                 %{@base_message | comments: "major issue to report"},
                 nil
               )
             end) =~ "major issue"
    end

    test "logs the users email when the user wants feedback" do
      old_level = Logger.level()

      on_exit(fn ->
        Logger.configure(level: old_level)
      end)

      message = %Message{
        comments: "major issue to report",
        email: "disgruntled@user.com",
        phone: "1231231234",
        name: "Disgruntled User",
        request_response: true,
        service: "Complaint"
      }

      assert CaptureLog.capture_log(fn ->
               Logger.configure(level: :info)
               Mailer.send_heat_ticket(message, nil)
             end) =~ "disgruntled@user.com"
    end
  end
end
