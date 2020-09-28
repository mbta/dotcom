defmodule SiteWeb.CustomerSupportView do
  use SiteWeb, :view

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
end
