defmodule SiteWeb.ProjectViewTest do
  use SiteWeb.ConnCase, async: true

  alias Content.{Field.Image, Paragraph.CustomHTML, Project, Teaser}
  alias Phoenix.HTML
  alias Plug.Conn
  alias SiteWeb.ProjectView

  @now Timex.now()
  @conn %Conn{}

  @project %Project{
    id: 1,
    updated_on: @now,
    posted_on: @now,
    path_alias: nil,
    start_year: @now.year,
    status: "In Progress"
  }

  @events [
    %Teaser{
      type: :event,
      path: "/events/2019-12-16/joint-meeting-the-fiscal-management",
      image: nil,
      text: "event teaser",
      title: "Event title",
      date: @now,
      date_end: @now,
      id: 1
    }
  ]

  @updates [
    %Teaser{
      type: :project_update,
      path: "/cms/path/alias",
      image: nil,
      text: "teaser",
      title: "title",
      date: @now,
      topic: "Projects",
      id: 1
    },
    %Teaser{
      type: :project_update,
      path: "/cms/path/alias2",
      image: nil,
      text: "teaser2",
      title: "title2",
      date: @now,
      topic: "Projects",
      id: 2
    }
  ]

  @diversions [
    %Teaser{
      type: :diversion,
      path: "/cms/path/alias3",
      text: "teaser3",
      title: "title3",
      date: nil,
      topic: nil,
      id: 3
    }
  ]

  describe "show_all_updates_link?" do
    test "returns false if there are 3 items or less" do
      assert ProjectView.show_all_updates_link?(@updates) == false
      assert @updates |> Enum.take(1) |> ProjectView.show_all_updates_link?() == false
    end

    test "returns true if there are 4 items or more" do
      updates =
        for idx <- 1..5 do
          %Content.Teaser{
            id: idx * 1000,
            title: "Update #{idx}",
            type: :project_update,
            path: "http://example.com/news?utm=stuff",
            routes: []
          }
        end

      assert updates |> Enum.take(3) |> ProjectView.show_all_updates_link?() == true
      assert updates |> Enum.take(4) |> ProjectView.show_all_updates_link?() == true
      assert ProjectView.show_all_updates_link?(updates) == true
    end
  end

  describe "show.html" do
    test "if paragraphs are present, hide timeline, status, body, gallery, and download components" do
      project =
        @project
        |> Map.put(:paragraphs, [%CustomHTML{body: "Paragraph content"}])

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "Paragraph content"
      refute output =~ "state-of-the-art safety features"
      refute output =~ "wollaston-stairs-and-elevators-to-access-platform-800_1.jpeg"
      refute output =~ "l-content-files"
      refute output =~ "Timeline:"
      refute output =~ "Status:"
    end

    test "if paragraphs are not present, show timeline, status" do
      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "Timeline:"
      assert output =~ "Status:"
    end

    test "timeline, status, and contact blocks are not required" do
      output =
        "show.html"
        |> ProjectView.render(
          project: %Project{
            id: 1,
            updated_on: @now,
            posted_on: @now,
            path_alias: nil
          },
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "About the Project"
      assert output =~ "Project Updates"
    end
  end

  describe "_contact.html" do
    test ".project-contact is not rendered if no data is available" do
      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "project-contact"
    end

    test ".project-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".project-contact is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "project-contact"
    end

    test ".contact-element-contact is not rendered if contact_information is not available" do
      project = %{@project | media_email: "present", media_phone: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "contact-element-contact"
    end

    test ".contact-element-email is not rendered if media_email is not available" do
      project = %{@project | contact_information: "present", media_phone: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "contact-element-email"
    end

    test ".contact-element-phone is not rendered if media_phone is not available" do
      project = %{@project | contact_information: "present", media_email: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "contact-element-phone"
    end

    test ".contact-element-contact is rendered if contact_information is available" do
      project = %{@project | contact_information: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "contact-element-contact"
    end

    test ".contact-element-email is rendered if media_email is available" do
      project = %{@project | media_email: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "contact-element-email"
    end

    test ".contact-element-phone is rendered if media_phone is available" do
      project = %{@project | media_phone: "present"}

      output =
        "show.html"
        |> ProjectView.render(
          project: project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "contact-element-phone"
    end
  end

  describe "_diversions.html" do
    test "renders project diversions" do
      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "c-paragraph--content-list"
      assert output =~ "c-teaser-list--diversion"
      assert output =~ "c-content-teaser--diversion"
    end
  end

  describe "_updates.html" do
    test "renders project updates" do
      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "c-project-updates-list"
      assert output =~ "c-project-update"
    end

    test "does not render an image if the update does not include one" do
      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: @updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      refute output =~ "c-project-update__photo"
    end

    test "renders an image if the update includes one" do
      updates = [
        %{
          List.first(@updates)
          | image: %Image{url: "http://example.com/img.jpg", alt: "Alt text"}
        }
      ]

      output =
        "show.html"
        |> ProjectView.render(
          project: @project,
          updates: updates,
          diversions: @diversions,
          conn: @conn,
          upcoming_events: @events,
          past_events: @events
        )
        |> HTML.safe_to_string()

      assert output =~ "c-project-update__photo"
    end
  end
end
