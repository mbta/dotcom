defmodule CustomerSupportTest do
  use SiteWeb.IntegrationCase
  import Wallaby.Query

  @submit_button css("#support-submit")
  @photo_input css("#photo", visible: false)

  def get_static_test_path(filename) do
    :site
    |> Application.app_dir("priv")
    |> Path.join("test/" <> filename)
  end

  describe "customer support form" do
    @tag :wallaby
    test "Shows an error for missing type and comments", %{session: session} do
      session
      |> visit("/customer-support")
      |> click(@submit_button)
      |> assert_has(css(".support-comments-error-container"))
      |> assert_has(css(".support-service-error-container"))
    end

    @tag :wallaby
    @tag :work
    test "Checks hidden checkbox when 'would like a response' is toggled", %{
      session: session
    } do
      session
      |> visit("/customer-support")
      |> click(css("#no_request_response_label"))

      assert selected?(session, css("#no_request_response", visible: false))
    end

    @tag :wallaby
    test "Shows additional fields when 'would like a response' is enabled", %{
      session: session
    } do
      session
      |> visit("/customer-support")
      |> assert_has(css("#first_name"))
      |> assert_has(css("#last_name"))
      |> assert_has(css("#email"))
    end

    @tag :wallaby
    test "Hides additional fields when 'would like a response' is not enabled", %{
      session: session
    } do
      session
      |> visit("/customer-support")
      |> click(css("#no_request_response_label"))
      |> refute_has(css("#first_name"))
      |> refute_has(css("#last_name"))
      |> refute_has(css("#email"))
    end

    @tag :wallaby
    test "Doesn't allow non-image files to be uploaded", %{session: session} do
      session
      |> visit("/customer-support")
      |> attach_file(@photo_input, path: get_static_test_path("test_file.txt"))
      |> assert_has(css("#support-upload-error-container"))
    end

    @tag :wallaby
    test "Generates previews for each uploaded image", %{session: session} do
      session
      |> visit("/customer-support")
      |> attach_file(@photo_input, path: get_static_test_path("test_image1.png"))
      |> attach_file(@photo_input, path: get_static_test_path("test_image2.png"))
      |> assert_has(css(".photo-preview", count: 2))
    end

    @tag :wallaby
    test "Displays success on valid form submission", %{session: session} do
      session
      |> visit("/customer-support")
      |> fill_in(css("#comments"), with: "Support Form Integration Test")
      |> click(css("label[for=\"service-Suggestion\"]"))
      |> attach_file(@photo_input, path: get_static_test_path("test_image1.png"))
      |> attach_file(@photo_input, path: get_static_test_path("test_image2.png"))
      |> click(@submit_button)
      |> assert_has(css("#support-result"))

      {:ok, email} = File.read(Application.get_env(:feedback, :test_mail_file))
      assert email =~ "Support Form Integration Test"
      assert email =~ "attachments"
      assert email =~ "test_image1.png"
      assert email =~ "test_image2.png"
    end
  end
end
