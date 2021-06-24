defmodule CustomerSupportTest do
  @moduledoc """
  Integration tests for the customer support form
  """
  use SiteWeb.IntegrationCase
  alias Wallaby.{Browser, Element, Query}

  @submit_button Query.css("#support-submit")
  @photo_input Query.css("#photo", visible: false)
  @no_response_checkbox_label Query.css("#no_request_response_label")

  def get_static_test_path(filename) do
    :site
    |> Application.app_dir("priv")
    |> Path.join("test/" <> filename)
  end

  def click_query_result(session, query) do
    Browser.find(session, query, &Element.click(&1))
  end

  def submit_form(session), do: click_query_result(session, @submit_button)

  describe "customer support form" do
    @tag :wallaby
    test "Shows an error for missing type and comments", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> submit_form()
      |> Browser.assert_has(Query.css(".form-group.has-danger #comments"))
      |> Browser.assert_has(Query.css(".form-group.has-danger #service"))
    end

    @tag :wallaby
    test "Shows subject dropdown when service is selected", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> Browser.refute_has(Query.css("#subject", visible: true))
      |> Browser.assert_has(Query.css("#service .service-radio", count: 4))
      |> click_query_result(Query.css("label[for=\"service-Suggestion\"]"))
      |> Browser.assert_has(Query.css("#subject", visible: true))
    end

    @tag :wallaby
    test "Checks hidden checkbox when 'would like a response' is toggled", %{
      session: session
    } do
      session
      |> Browser.visit("/customer-support")
      |> click_query_result(@no_response_checkbox_label)
      |> Browser.selected?(@no_response_checkbox_label)
    end

    @tag :wallaby
    test "Shows additional fields when 'would like a response' is enabled", %{
      session: session
    } do
      session
      |> Browser.visit("/customer-support")
      |> Browser.assert_has(Query.css("#first_name"))
      |> Browser.assert_has(Query.css("#last_name"))
      |> Browser.assert_has(Query.css("#email"))
    end

    @tag :wallaby
    test "Hides additional fields when 'would like a response' is not enabled", %{
      session: session
    } do
      session
      |> Browser.visit("/customer-support")
      |> click_query_result(@no_response_checkbox_label)
      |> Browser.refute_has(Query.css("#first_name"))
      |> Browser.refute_has(Query.css("#last_name"))
      |> Browser.refute_has(Query.css("#email"))
    end

    @tag :wallaby
    test "Generates previews for each uploaded image", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> Browser.attach_file(@photo_input, path: get_static_test_path("test_image1.png"))
      |> Browser.attach_file(@photo_input, path: get_static_test_path("test_image2.png"))
      |> Browser.assert_has(Query.css(".photo-preview", count: 2))
    end

    @tag :wallaby
    test "Displays success on valid form submission", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> Browser.fill_in(Query.css("#comments"), with: "Support Form Integration Test")
      |> click_query_result(Query.css("label[for=\"service-Suggestion\"]"))
      |> Browser.set_value(Query.css("#support_subject"), "Other")
      |> click_query_result(@no_response_checkbox_label)
      |> click_query_result(Query.css(".g-recaptcha"))

      # the recaptcha is slow
      :timer.sleep(500)

      session
      |> submit_form()
      |> Browser.assert_has(Query.css(".support-confirmation"))
    end

    @tag :wallaby
    test "Processes email on valid form submission", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> Browser.fill_in(Query.css("#comments"), with: "Support Form Integration Test")
      |> click_query_result(Query.css("label[for=\"service-Suggestion\"]"))
      |> Browser.set_value(Query.css("#support_subject"), "Other")
      |> click_query_result(@no_response_checkbox_label)
      |> click_query_result(Query.css(".g-recaptcha"))
      |> submit_form()

      {:ok, email} = File.read(Application.get_env(:feedback, :test_mail_file))
      assert email =~ "Support Form Integration Test"
      # empty
      assert email =~ "\"attachments\":[]"
    end

    @tag :wallaby
    @tag skip: "Known failure when submitting multiple images"
    test "Processes email with image attachments on valid form submission", %{session: session} do
      session
      |> Browser.visit("/customer-support")
      |> Browser.fill_in(Query.css("#comments"), with: "Support Form Integration Test")
      |> click_query_result(Query.css("label[for=\"service-Suggestion\"]"))
      |> Browser.set_value(Query.css("#support_subject"), "Other")
      |> Browser.attach_file(@photo_input, path: get_static_test_path("test_image1.png"))
      |> Browser.attach_file(@photo_input, path: get_static_test_path("test_image2.png"))
      |> click_query_result(@no_response_checkbox_label)
      |> click_query_result(Query.css(".g-recaptcha"))
      |> submit_form()

      {:ok, email} = File.read(Application.get_env(:feedback, :test_mail_file))
      assert email =~ "Support Form Integration Test"
      # empty
      refute email =~ "\"attachments\":[]"
      assert email =~ "test_image1.png"
      assert email =~ "test_image2.png"
    end
  end
end
