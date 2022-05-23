defmodule SiteWeb.CMS.Page.ProjectContactTest do
  use Site.ViewCase, async: true

  import SiteWeb.CMS.PageView

  alias CMS.Page.Project
  alias Phoenix.HTML
  alias Plug.Conn

  @conn %Conn{
    assigns: %{
      alerts: [],
      date_time: DateTime.utc_now(),
      page: %{redirects: [], page_alias: 'n/a'}
    }
  }
  @project %Project{id: 1}

  describe "_contact.html" do
    test ".project-contact is not rendered if no data is available" do
      output =
        @project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      refute output =~ "project-contact"
    end

    test ".project-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".contact-element-contact is not rendered if contact_information is not available" do
      project = %{@project | media_email: "present", media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      refute output =~ "contact-element-contact"
    end

    test ".contact-element-email is not rendered if media_email is not available" do
      project = %{@project | contact_information: "present", media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      refute output =~ "contact-element-email"
    end

    test ".contact-element-phone is not rendered if media_phone is not available" do
      project = %{@project | contact_information: "present", media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      refute output =~ "contact-element-phone"
    end

    test ".contact-element-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "contact-element-contact"
    end

    test ".contact-element-email is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "contact-element-email"
    end

    test ".contact-element-phone is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        project
        |> render_page_content(@conn)
        |> HTML.safe_to_string()

      assert output =~ "contact-element-phone"
    end
  end
end
