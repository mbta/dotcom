defmodule Dotcom.Translator.LibreTranslate do
  @moduledoc """
  An implementation of `Dotcom.Translate.Behaviour` that uses LibreTranslate.
  """

  require Logger

  use Nebulex.Caching.Decorators

  import Dotcom.Locales, only: [default_locale_code: 0]

  @behaviour Dotcom.Translator.Behaviour

  @cache Application.compile_env!(:dotcom, :cache)
  @timeout if Mix.env() === :dev, do: :timer.minutes(1), else: :timer.seconds(15)
  @ttl if Mix.env() === :dev, do: :timer.minutes(1), else: :timer.hours(24 * 365)

  @impl Dotcom.Translator.Behaviour
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def translate_html(html, locale) do
    html
    |> track_length()
    |> request_body_html(locale)
    |> translate_request_body()
  end

  @impl Dotcom.Translator.Behaviour
  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def translate_text(text, locale) do
    text
    |> track_length()
    |> request_body_text(locale)
    |> translate_request_body()
  end

  defp request_body(string, locale) do
    %{
      q: string,
      source: default_locale_code(),
      target: locale
    }
  end

  defp request_body_html(html, locale) do
    request_body(html, locale)
    |> Map.put(:format, "html")
  end

  defp request_body_text(text, locale) do
    request_body(text, locale)
    |> Map.put(:format, "text")
  end

  defp process_response({:ok, response}, request_body) do
    response
    |> Map.get(:body, %{})
    |> Map.get("translatedText", Map.get(request_body, :q))
  end

  defp process_response({:error, exception}, request_body) do
    Logger.error("#{__MODULE__} #{exception}")

    Map.get(request_body, :q)
  end

  defp send_request_body(request_body) do
    Req.post(
      Application.get_env(:dotcom, :libre_translate_url),
      finch: Translator.Finch,
      json: request_body,
      receive_timeout: @timeout
    )
  end

  defp track_length(binary) do
    binary
    |> String.length()
    |> IO.inspect(label: "TRANSLATION STRING LENGTH")

    binary
  end

  defp translate_request_body(request_body) do
    request_body
    |> send_request_body()
    |> process_response(request_body)
  end
end
