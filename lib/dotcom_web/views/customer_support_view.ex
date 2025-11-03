defmodule DotcomWeb.CustomerSupportView do
  @moduledoc """
  Helper functions for handling interaction with and submitting the customer support form
  """
  use DotcomWeb, :view

  import PhoenixHTMLHelpers.Tag, only: [content_tag: 2, content_tag: 3]

  alias Feedback.Message
  alias Routes.Route

  def photo_info(%{
        "photo" => %Plug.Upload{path: path, filename: filename, content_type: content_type}
      }) do
    encoded =
      path
      |> File.read!()
      |> Base.encode64()

    {encoded, content_type, filename, File.stat!(path).size |> Sizeable.filesize()}
  end

  def photo_info(_) do
    nil
  end

  def show_error_message(conn) do
    conn.assigns.show_form && !Enum.empty?(conn.assigns[:errors])
  end

  @spec class_for_error(String.t(), [String.t()], String.t(), String.t()) :: String.t()
  def class_for_error(_, [], _, _), do: ""

  def class_for_error(value, errors, on_class, off_class) do
    if Enum.member?(errors, value), do: on_class, else: off_class
  end

  def preamble_text do
    content_tag(
      :div,
      [
        content_tag(
          :p,
          ~t"You can expect a response to most tickets within 5 business days. Certain complaints may require longer investigations, up to 30 days."
        ),
        content_tag(:p, ~t"All fields with an asterisk* are required.")
      ]
    )
  end

  @spec subject_map([Message.service_option_with_subjects()]) ::
          %{Message.service_value() => [Message.subject_value()]}
  def subject_map(service_options) do
    service_options
    |> Enum.into(%{}, fn {_text, value, subjects} -> {value, subjects} end)
  end

  @spec placeholder_text(String.t()) :: String.t()
  def placeholder_text("comments"),
    do:
      ~t"If applicable, please make sure to include the time and date of the incident, the route, and the vehicle number."

  def placeholder_text("first_name"), do: "Jane"
  def placeholder_text("last_name"), do: "Smith"
  def placeholder_text("email"), do: "janesmith@email.com"
  def placeholder_text("phone"), do: "(555)-555-5555"
  def placeholder_text("vehicle"), do: "00001"
  def placeholder_text(_), do: ""

  def help_text("phone"),
    do:
      content_tag(
        :p,
        ~t"If you'd like us to give you a call, please give us the best number where we can reach you.",
        id: "phoneHelp",
        class: "help-text"
      )

  def help_text(_), do: ""

  @doc """
  Also see DotcomWeb.ErrorHelpers.error_tag for a slightly different implementation of this functionality.
  """
  def support_error_tag(errors, field) when is_list(errors) do
    if Enum.member?(errors, field) do
      content_tag(
        :div,
        content_tag(:span, error_msg(field),
          role: "alert",
          "aria-live": "assertive",
          class: "support-#{field}-error"
        ),
        class: "error-container support-#{field}-error-container form-control-feedback"
      )
    else
      nil
    end
  end

  @spec get_all_modes :: list
  def get_all_modes do
    # get options for subway, bus, commuter rail and ferry:
    subway_bus_cr_ferry_opts =
      Enum.map(1..4, fn mode ->
        mode_name = DotcomWeb.ViewHelpers.mode_name(mode)

        case mode do
          1 -> [key: mode_name, value: ~t"Subway"]
          2 -> [key: mode_name, value: ~t"Commuter Rail"]
          3 -> [key: mode_name, value: ~t"Bus Other"]
          4 -> [key: mode_name, value: ~t"Ferry"]
        end
      end)
      |> List.insert_at(0, key: ~t"Select", value: " ")

    # append The RIDE:
    the_ride = Route.type_name(:the_ride)

    subway_bus_cr_ferry_opts
    |> List.insert_at(Enum.count(subway_bus_cr_ferry_opts),
      key: the_ride,
      value: the_ride
    )
  end

  defp error_msg("service"), do: ~t"Please select the type of concern."
  defp error_msg("comments"), do: ~t"Please enter a comment to continue."
  defp error_msg("upload"), do: ~t"Sorry. We had trouble uploading your image. Please try again."

  defp error_msg("vehicle"),
    do: ~t"Please enter a valid vehicle number with numeric characters only."

  defp error_msg("email"), do: ~t"Please enter a valid email."
  defp error_msg("first_name"), do: ~t"Please enter your first name to continue."
  defp error_msg("last_name"), do: ~t"Please enter your last name to continue."

  defp error_msg("privacy"),
    do: ~t"You must agree to our Privacy Policy before submitting your feedback."

  defp error_msg("recaptcha"),
    do: ~t"You must complete the reCAPTCHA before submitting your feedback."

  defp error_msg(_), do: ~t"Sorry. Something went wrong. Please try again."
end
