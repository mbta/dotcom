defmodule SiteWeb.CustomerSupportControllerTest do
  use SiteWeb.ConnCase

  setup do
    conn =
      build_conn()
      |> put_req_header("x-forwarded-for", "10.108.98.#{Enum.random(0..999)}")

    {:ok, conn: conn}
  end

  describe "GET" do
    test "shows the support form", %{conn: conn} do
      conn = get(conn, customer_support_path(conn, :index))
      response = html_response(conn, 200)
      assert response =~ "Customer Support"
    end

    test "shows the support form and accepts a comment param", %{conn: conn} do
      conn =
        get(conn, customer_support_path(conn, :index, %{comments: "A comment about the MBTA"}))

      response = html_response(conn, 200)
      assert response =~ "Customer Support"
      assert response =~ "A comment about the MBTA"
    end

    test "sets the service options on the connection", %{conn: conn} do
      conn = get(conn, customer_support_path(conn, :index))

      assert conn.assigns.service_options == Feedback.Message.service_options()
    end

    test "sets a custom meta description", %{conn: conn} do
      conn = get(conn, customer_support_path(conn, :index))

      assert conn.assigns.meta_description
    end
  end

  describe "POST" do
    def valid_request_response_data do
      %{
        "comments" => "comments",
        "email" => "test@gmail.com",
        "privacy" => "on",
        "phone" => "",
        "name" => "tom brady",
        "request_response" => "on",
        "service" => "Inquiry"
      }
    end

    def valid_no_response_data do
      %{"comments" => "comments", "request_response" => "off", "service" => "Inquiry"}
    end

    test "shows a thank you message on success and sends an email", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => valid_request_response_data()
        })

      response = html_response(conn, 302)
      refute response =~ "form id=\"support-form\""
      assert redirected_to(conn) == customer_support_path(conn, :thanks)
      wait_for_ticket_task(conn)

      assert String.contains?(
               Feedback.Test.latest_message()["text"],
               ~s(<MBTASOURCE>Auto Ticket 2</MBTASOURCE>)
             )
    end

    test "sets a custom meta description", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => valid_request_response_data()
        })

      assert conn.assigns.meta_description
    end

    test "validates presence of comments", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "comments", "")
        })

      assert "comments" in conn.assigns.errors
    end

    test "validates the presence of the service type", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "service", "")
        })

      assert "service" in conn.assigns.errors
    end

    test "validates that the service is one of the allowed values", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "service", "Hug")
        })

      assert "service" in conn.assigns.errors
    end

    test "does not require name if customer does not want a response", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_no_response_data(), "name", "")
        })

      refute conn.assigns["errors"]
      wait_for_ticket_task(conn)
    end

    test "requires name if customer does want a response", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "name", "")
        })

      assert "name" in conn.assigns.errors
    end

    test "does not require email or phone when the customer does not want a response", %{
      conn: conn
    } do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_no_response_data(), "email", "")
        })

      refute conn.assigns["errors"]
      wait_for_ticket_task(conn)
    end

    test "invalid with no email when the customer wants a response", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "email", "")
        })

      assert "email" in conn.assigns.errors
    end

    test "requires a real email", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "email", "not an email")
        })

      assert "email" in conn.assigns.errors
    end

    test "invalid with phone but no email when the customer wants a response", %{conn: conn} do
      conn =
        post(
          conn,
          customer_support_path(conn, :submit),
          %{
            "support" =>
              Map.merge(valid_request_response_data(), %{"email" => "", "phone" => "555-555-5555"})
          }
        )

      assert "email" in conn.assigns.errors
    end

    test "does not require privacy checkbox when customer does not want a response", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_no_response_data(), "privacy", "")
        })

      refute conn.assigns["errors"]
      wait_for_ticket_task(conn)
    end

    test "requires privacy checkbox when customer wants a response", %{conn: conn} do
      conn =
        post(conn, customer_support_path(conn, :submit), %{
          "support" => Map.put(valid_request_response_data(), "privacy", "")
        })

      assert "privacy" in conn.assigns.errors
    end

    test "attaches photos in params", %{conn: conn} do
      params =
        valid_no_response_data()
        |> Map.put("photos", [
          %Plug.Upload{filename: "photo-1", path: "/tmp/photo-1.jpg"},
          %Plug.Upload{filename: "photo-2", path: "/tmp/photo-2.jpg"}
        ])

      conn = post(conn, customer_support_path(conn, :submit), %{"support" => params})
      wait_for_ticket_task(conn)

      attachments = Feedback.Test.latest_message()["attachments"]

      assert attachments == [
               %{"filename" => "photo-1", "path" => "/tmp/photo-1.jpg"},
               %{"filename" => "photo-2", "path" => "/tmp/photo-2.jpg"}
             ]
    end

    test "logs a warning, returns 429, and shows an error when rate limit reached", %{conn: conn} do
      path = customer_support_path(conn, :submit)

      log =
        ExUnit.CaptureLog.capture_log(fn ->
          conn =
            Enum.reduce(1..4, conn, fn _, acc ->
              acc
              |> recycle()
              |> post(path, %{"support" => valid_request_response_data()})
            end)

          assert conn.status == 429
          assert conn.assigns.errors == ["rate limit"]
        end)

      assert log =~ "rate limit exceeded"
    end
  end

  defp wait_for_ticket_task(%{private: %{ticket_task: pid}}) do
    # since the ticket sending is running in the background, we want to wait
    # for it to finish so that we're only running one test e-mail at a time.
    ref = Process.monitor(pid)
    assert_receive {:DOWN, ^ref, _, _, _}, 1_000
    :ok
  end
end
