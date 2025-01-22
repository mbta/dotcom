defmodule Dotcom.FontAwesomeHelpers do
  @moduledoc false
  import DotcomWeb.ViewHelpers, only: [fa: 1]

  # Selected MIME types from
  # https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
  # augmented with .pptx, .xlsx, and .docx from
  # https://blogs.msdn.microsoft.com/vsofficedeveloper/2008/05/08/office-2007-file-format-mime-types-for-http-content-streaming-2/
  @mime_type_map %{
    "calendar" => [
      "text/calendar"
    ],
    "file-audio-o" => [
      "audio/aac",
      "audio/x-wav"
    ],
    "file-code-o" => [
      "text/css",
      "text/html"
    ],
    "file-excel-o" => [
      "text/csv",
      "application/vnd.oasis.opendocument.spreadsheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ],
    "file-image-o" => [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/tiff"
    ],
    "file-pdf-o" => [
      "application/pdf"
    ],
    "file-powerpoint-o" => [
      "application/vnd.oasis.opendocument.presentation",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ],
    "file-text-o" => [
      "application/rtf"
    ],
    "file-video-o" => [
      "video/x-msvideo",
      "video/mpeg",
      "video/webm"
    ],
    "file-word-o" => [
      "application/x-abiword",
      "application/msword",
      "application/vnd.oasis.opendocument.text",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    "file-zip-o" => [
      "application/octet-stream",
      "application/x-bzip",
      "application/x-bzip2",
      "application/x-rar-compressed",
      "application/x-tar",
      "application/zip",
      "application/x-7z-compressed"
    ]
  }

  for {fa_class, mimes} <- @mime_type_map, mime <- mimes do
    def fa_icon_for_file_type(unquote(mime)), do: fa(unquote(fa_class))
  end

  def fa_icon_for_file_type(_), do: fa("file-o")
end
