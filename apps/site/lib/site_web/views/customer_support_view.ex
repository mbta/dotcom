defmodule SiteWeb.CustomerSupportView do
  @moduledoc """
  Helper functions for handling interaction with and submitting the customer support form
  """
  use SiteWeb, :view

  import Phoenix.HTML.Tag, only: [content_tag: 2, content_tag: 3]

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
  def class_for_error(value, errors, on_class, off_class) do
    if Enum.member?(errors, value), do: on_class, else: off_class
  end

  def preamble_text do
    content_tag(
      :div,
      [
        content_tag(
          :p,
          "Responses may take up to 5 business days. Do not use this form to report emergencies."
        ),
        content_tag(:p, "All fields with an asterisk* are required.")
      ]
    )
  end
end
