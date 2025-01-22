defmodule Dotcom.FontAwesomeHelpersTest do
  use ExUnit.Case, async: true

  import Dotcom.FontAwesomeHelpers
  import DotcomWeb.ViewHelpers, only: [fa: 1]

  describe "fa_icon_for_file_type/1" do
    test "returns the right icon for the given mime type" do
      assert fa_icon_for_file_type("text/calendar") == fa("calendar")
      assert fa_icon_for_file_type("audio/aac") == fa("file-audio-o")
      assert fa_icon_for_file_type("audio/x-wav") == fa("file-audio-o")
      assert fa_icon_for_file_type("text/css") == fa("file-code-o")
      assert fa_icon_for_file_type("text/html") == fa("file-code-o")
      assert fa_icon_for_file_type("text/csv") == fa("file-excel-o")

      assert fa_icon_for_file_type("application/vnd.oasis.opendocument.spreadsheet") ==
               fa("file-excel-o")

      assert fa_icon_for_file_type("application/vnd.ms-excel") == fa("file-excel-o")

      assert fa_icon_for_file_type("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") ==
               fa("file-excel-o")

      assert fa_icon_for_file_type("image/gif") == fa("file-image-o")
      assert fa_icon_for_file_type("image/jpeg") == fa("file-image-o")
      assert fa_icon_for_file_type("image/png") == fa("file-image-o")
      assert fa_icon_for_file_type("image/tiff") == fa("file-image-o")
      assert fa_icon_for_file_type("application/pdf") == fa("file-pdf-o")

      assert fa_icon_for_file_type("application/vnd.oasis.opendocument.presentation") ==
               fa("file-powerpoint-o")

      assert fa_icon_for_file_type("application/vnd.ms-powerpoint") == fa("file-powerpoint-o")

      assert fa_icon_for_file_type("application/vnd.openxmlformats-officedocument.presentationml.presentation") ==
               fa("file-powerpoint-o")

      assert fa_icon_for_file_type("application/rtf") == fa("file-text-o")
      assert fa_icon_for_file_type("video/x-msvideo") == fa("file-video-o")
      assert fa_icon_for_file_type("video/mpeg") == fa("file-video-o")
      assert fa_icon_for_file_type("video/webm") == fa("file-video-o")
      assert fa_icon_for_file_type("application/x-abiword") == fa("file-word-o")
      assert fa_icon_for_file_type("application/msword") == fa("file-word-o")
      assert fa_icon_for_file_type("application/vnd.oasis.opendocument.text") == fa("file-word-o")

      assert fa_icon_for_file_type("application/vnd.openxmlformats-officedocument.wordprocessingml.document") ==
               fa("file-word-o")

      assert fa_icon_for_file_type("application/octet-stream") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/x-bzip") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/x-bzip2") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/x-rar-compressed") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/x-tar") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/zip") == fa("file-zip-o")
      assert fa_icon_for_file_type("application/x-7z-compressed") == fa("file-zip-o")
    end

    test "falls back to general file icon for unknown mime type" do
      assert fa_icon_for_file_type("unknown/mime") == fa("file-o")
    end
  end
end
