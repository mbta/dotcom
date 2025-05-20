defmodule DotcomWeb.MbtaGoFeedbackController do
  @moduledoc """
  Redirects users to the appropriate feedback form based on their language and OS
  """
  use DotcomWeb, :controller

  @airtable_form_url "https://airtable.com/appdYDxevMwSoOnv5/pagEeBp8XZalpGHwA/form"
  @lang_param "lang"

  def android(conn, params) do
    feedback_redirect(conn, params[@lang_param], :android)
  end

  def android_ht(conn, _params) do
    feedback_redirect(conn, "ht", :android)
  end

  def ios(conn, params) do
    feedback_redirect(conn, params[@lang_param], :ios)
  end

  def ios_ht(conn, _params) do
    feedback_redirect(conn, "ht", :ios)
  end

  defp feedback_redirect(conn, lang, os) do
    conn
    |> redirect(external: airtable_url(lang, os))
    |> halt
  end

  defp airtable_url(lang, os) do
    encoded_params =
      URI.encode_query(
        [
          prefill_Language: language_param(lang),
          "prefill_Phone Operating System": os_param(os)
        ],
        :rfc3986
      )

    @airtable_form_url
    |> URI.parse()
    |> URI.append_query(encoded_params)
    |> URI.to_string()
  end

  defp language_param(lang) do
    case lang do
      "es-US" -> "Español"
      "fr" -> "Français"
      "ht" -> "Kreyòl Ayisyen"
      "pt-BR" -> "Português"
      "vi" -> "Tiếng Việt"
      "zh-Hans" -> "中文（简体）"
      "zh-Hant" -> "中文（繁體）"
      _ -> "English"
    end
  end

  defp os_param(os) do
    case os do
      :ios -> "iOS"
      :android -> "Android"
    end
  end
end
