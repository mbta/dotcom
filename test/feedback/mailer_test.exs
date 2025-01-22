defmodule Feedback.MailerTest do
  use ExUnit.Case, async: true

  import Mox
  import Test.Support.EnvHelpers, only: [set_log_level: 1]

  alias ExUnit.CaptureLog
  alias Feedback.Mailer
  alias Feedback.Message

  @base_message %Message{
    comments: "",
    service: "Inquiry",
    subject: "Website",
    no_request_response: true,
    incident_date_time: ~D[2020-09-01]
  }

  setup :verify_on_exit!

  setup do
    stub(AwsClient.Mock, :send_raw_email, &Feedback.Test.send_email/1)
    :ok
  end

  describe "send_heat_ticket/2" do
    test "sends an email for heat 2" do
      {:ok, sent_message, _} = Mailer.send_heat_ticket(@base_message, nil)

      assert sent_message.to == [
               Application.get_env(:dotcom, :support_ticket_to_email)
             ]
    end

    test "has the body format that heat 2 expects" do
      {:ok, sent_message, _} = Mailer.send_heat_ticket(@base_message, nil)

      assert sent_message.text ==
               """
               <INCIDENT>
                 <SERVICE>Inquiry</SERVICE>
                 <CATEGORY>Website</CATEGORY>
                 <TOPIC></TOPIC>
                 <SUBTOPIC></SUBTOPIC>
                 <MODE></MODE>
                 <LINE></LINE>
                 <STATION></STATION>
                 <INCIDENTDATE>09/01/2020 00:00</INCIDENTDATE>
                 <VEHICLE></VEHICLE>
                 <FIRSTNAME>Riding</FIRSTNAME>
                 <LASTNAME>Public</LASTNAME>
                 <FULLNAME>Riding Public</FULLNAME>
                 <CITY></CITY>
                 <STATE></STATE>
                 <ZIPCODE></ZIPCODE>
                 <EMAILID>#{Application.get_env(:dotcom, :support_ticket_reply_email)}</EMAILID>
                 <PHONE></PHONE>
                 <DESCRIPTION></DESCRIPTION>
                 <CUSTREQUIRERESP>No</CUSTREQUIRERESP>
                 <SWARELATED>No</SWARELATED>
                 <MBTASOURCE>Auto Ticket 2</MBTASOURCE>
               </INCIDENT>
               """
    end

    test "uses the comments of the message for the description" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | comments: "major issue to report"},
          nil
        )

      assert sent_message.text =~
               "<DESCRIPTION>major issue to report</DESCRIPTION>"
    end

    test "generates the topic based on the service and subject" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | service: "Complaint", subject: "Bus Stop"},
          nil
        )

      assert sent_message.text =~ "<TOPIC>Other</TOPIC>"

      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | service: "Inquiry", subject: "Disability ID Cards"},
          nil
        )

      assert sent_message.text =~ "<TOPIC>Other</TOPIC>"

      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | service: "Inquiry", subject: "Other"},
          nil
        )

      assert sent_message.text =~ "<TOPIC></TOPIC>"
    end

    test "uses the phone from the message in the phone field" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | phone: "617-123-4567"}, nil)

      assert sent_message.text =~ "<PHONE>617-123-4567</PHONE>"
    end

    test "sets the emailid to the one provided by the user" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | email: "disgruntled@user.com"}, nil)

      assert sent_message.text =~ "<EMAILID>disgruntled@user.com</EMAILID>"
    end

    test "when the user does not set an email, the SUPPORT_TICKET_REPLY_EMAIL configuration email is used" do
      {:ok, sent_message, _} = Mailer.send_heat_ticket(@base_message, nil)

      assert sent_message.text =~
               "<EMAILID>#{Application.get_env(:dotcom, :support_ticket_reply_email)}</EMAILID>"
    end

    test "when the user sets an empty string, the SUPPORT_TICKET_REPLY_EMAIL configuration email is used" do
      {:ok, sent_message, _} = Mailer.send_heat_ticket(%{@base_message | email: ""}, nil)

      assert sent_message.text =~
               "<EMAILID>#{Application.get_env(:dotcom, :support_ticket_reply_email)}</EMAILID>"
    end

    test "the email does not have leading or trailing spaces" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | email: "   fake_email@gmail.com  "},
          nil
        )

      assert sent_message.text =~ "<EMAILID>fake_email@gmail.com</EMAILID>"
    end

    test "gives the full name as the name the user provided" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | first_name: "Full", last_name: "Name"}, nil)

      assert sent_message.text =~ "<FIRSTNAME>Full</FIRSTNAME>"
      assert sent_message.text =~ "<LASTNAME>Name</LASTNAME>"
      assert sent_message.text =~ "<FULLNAME>Full Name</FULLNAME>"
    end

    test "uses default first name if not provided" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | first_name: "", last_name: "Smith"}, nil)

      assert sent_message.text =~ "<FIRSTNAME>Riding</FIRSTNAME>"
      assert sent_message.text =~ "<LASTNAME>Smith</LASTNAME>"
    end

    test "uses default last name if not provided" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | first_name: "James", last_name: ""}, nil)

      assert sent_message.text =~ "<FIRSTNAME>James</FIRSTNAME>"
      assert sent_message.text =~ "<LASTNAME>Public</LASTNAME>"
    end

    test "if the user does not provide a name, sets the full name to 'Riding Public'" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(%{@base_message | first_name: "", last_name: ""}, nil)

      assert sent_message.text =~ "<FULLNAME>Riding Public</FULLNAME>"
    end

    test "sets customer requests response to no" do
      {:ok, sent_message, _} = Mailer.send_heat_ticket(@base_message, nil)
      assert sent_message.text =~ "<CUSTREQUIRERESP>No</CUSTREQUIRERESP>"
    end

    test "sets ada_respnse to yes" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{@base_message | ada_complaint: true},
          nil
        )

      assert sent_message.text =~
               "<SWARELATED>Yes</SWARELATED>"
    end

    test "does not log anything when the user doesnt want feedback" do
      set_log_level(:info)

      refute CaptureLog.capture_log(fn ->
               Mailer.send_heat_ticket(
                 %{@base_message | comments: "major issue to report"},
                 nil
               )
             end) =~ "major issue"
    end

    test "logs the users email when the user wants feedback" do
      set_log_level(:info)

      message = %Message{
        comments: "major issue to report",
        email: "disgruntled@user.com",
        phone: "1231231234",
        first_name: "Disgruntled",
        last_name: "User",
        no_request_response: false,
        service: "Complaint",
        incident_date_time: ~D[2020-09-01]
      }

      assert CaptureLog.capture_log(fn ->
               Mailer.send_heat_ticket(message, nil)
             end) =~ "disgruntled@user.com"
    end

    test "prepends ticket number to the description for charliecard/ticket complaints" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{
            @base_message
            | service: "Complaint",
              subject: "CharlieCards & Tickets",
              ticket_number: "123abc"
          },
          nil
        )

      assert String.contains?(sent_message.text, "CharlieCard or Ticket number: 123abc")
    end

    test "does not add ticket number for non-complaints" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{
            @base_message
            | service: "Question",
              subject: "CharlieCards & Tickets",
              ticket_number: "123abc"
          },
          nil
        )

      refute String.contains?(sent_message.text, "CharlieCard or Ticket number: 123abc")
    end

    test "does not add ticket number for other subjects" do
      {:ok, sent_message, _} =
        Mailer.send_heat_ticket(
          %{
            @base_message
            | ticket_number: "123abc"
          },
          nil
        )

      refute String.contains?(sent_message.text, "123abc")
    end

    test "converts 'America/New_York' date to UTC" do
      dt = Util.convert_using_timezone(~N[2016-12-12T12:12:12], "America/New_York")
      assert Mailer.formatted_utc_timestamp(dt) == "12/12/2016 17:12"
    end

    test "converts 'America/New_York' date to UTC accounting for beginning of daylight saving time" do
      dt = Util.convert_using_timezone(~N[2020-03-08T03:00:00], "America/New_York")
      assert Mailer.formatted_utc_timestamp(dt) == "03/08/2020 07:00"
    end

    test "converts 'America/New_York' date to UTC accounting for end of daylight saving time" do
      dt = Util.convert_using_timezone(~N[2020-11-01T01:00:00], "America/New_York")
      assert Mailer.formatted_utc_timestamp(dt) == "11/01/2020 06:00"
    end
  end
end
