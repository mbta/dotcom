defmodule DotcomWeb.CMS.Page.ProjectContactTest do
  use Dotcom.ViewCase, async: true

  import DotcomWeb.CMS.PageView

  alias CMS.Page.Project
  alias Plug.Conn

  @conn %Conn{
    assigns: %{
      alerts: [],
      date_time: DateTime.utc_now()
    }
  }
  @project %Project{id: 1, path_alias: "/projects/test"}

  describe "_contact.html" do
    test ".project-contact is not rendered if no data is available" do
      output =
        @project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute output =~ "project-contact"
    end

    test ".project-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "project-contact"
    end

    test ".contact-element-contact is not rendered if contact_information is not available" do
      project = %{@project | media_email: "present", media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute output =~ "contact-element-contact"
    end

    test ".contact-element-email is not rendered if media_email is not available" do
      project = %{@project | contact_information: "present", media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute output =~ "contact-element-email"
    end

    test ".contact-element-phone is not rendered if media_phone is not available" do
      project = %{@project | contact_information: "present", media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      refute output =~ "contact-element-phone"
    end

    test ".contact-element-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "contact-element-contact"
    end

    test ".contact-element-email is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "contact-element-email"
    end

    test ".contact-element-phone is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "contact-element-phone"
    end

    test ".contact-element-email is rendered with alerts" do
      project = %{@project | media_email: "present"}

      conn = %{
        @conn
        | assigns: %{
            @conn.assigns
            | alerts: [
                %Alerts.Alert{
                  url: "http://mbta.com/projects/test",
                  priority: :high,
                  description: "Test Alert",
                  effect: :cancellation
                }
              ]
          }
      }

      output =
        project
        |> render_page_content(conn)
        |> Phoenix.HTML.Safe.to_iodata()
        |> IO.iodata_to_binary()

      assert output =~ "contact-element-email"
      assert output =~ "Related Service Alerts"
    end
  end
end
