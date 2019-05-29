defmodule Feedback.RepoTest do
  use ExUnit.Case

  describe "Feedback.Repo" do
    test "renders a message into the HEAT email format" do
      %Feedback.Message{
        email: "test@mbtace.com",
        phone: "555-555-5555",
        name: "Charlie",
        comments: "comments",
        service: "Complaint",
        request_response: false
      }
      |> Feedback.Repo.send_ticket()

      text = Feedback.Test.latest_message()["text"]
      assert text =~ ~s(<EMAILID>test@mbtace.com</EMAILID>)
      assert text =~ ~s(<PHONE>555-555-5555</PHONE>)
      assert text =~ ~s(<FULLNAME>Charlie</FULLNAME>)
      assert text =~ ~s(<DESCRIPTION>comments</DESCRIPTION>)
    end

    test "handles multiple attachments" do
      photos = [
        %Plug.Upload{path: "/tmp/photo-1.jpg", filename: "photo-1"},
        %Plug.Upload{path: "/tmp/photo-2.jpg", filename: "photo-2"}
      ]

      %Feedback.Message{
        email: "test@mbtace.com",
        phone: "555-555-5555",
        name: "Charlie",
        comments: "comments",
        photos: photos,
        service: "Complaint",
        request_response: false
      }
      |> Feedback.Repo.send_ticket()

      attachments = Feedback.Test.latest_message()["attachments"]

      assert attachments == [
               %{"path" => "/tmp/photo-1.jpg", "filename" => "photo-1"},
               %{"path" => "/tmp/photo-2.jpg", "filename" => "photo-2"}
             ]
    end
  end
end
