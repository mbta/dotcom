defmodule Dotcom.Translator.LibreTranslate do
  @moduledoc """
  An implementation of `Dotcom.Translate.Behaviour` that uses LibreTranslate.
  """

  use Nebulex.Caching.Decorators

  import Dotcom.Locales, only: [default_locale_code: 0]

  @behaviour Dotcom.Translator.Behaviour

  @cache Application.compile_env!(:dotcom, :cache)
  @timeout :timer.minutes(1)
  @ttl :timer.minutes(1)

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def translate_html(html, locale) do
    Req.post!("http://10.0.0.2:5000/translate",
      finch: Translator.Finch,
      json: html_request(html, locale),
      receive_timeout: @timeout
    )
    |> Map.get(:body)
    |> Map.get("translatedText")
  end

  @decorate cacheable(cache: @cache, on_error: :nothing, opts: [ttl: @ttl])
  def translate_text(html, locale) do
    Req.post!("http://10.0.0.2:5000/translate",
      finch: Translator.Finch,
      json: text_request(html, locale),
      receive_timeout: @timeout
    )
    |> Map.get(:body)
    |> Map.get("translatedText")
  end

  defp html_request(html, locale) do
    %{
      q: html,
      source: default_locale_code(),
      target: locale,
      format: "html"
    }
  end

  defp text_request(string, locale) do
    %{
      q: string,
      source: default_locale_code(),
      target: locale,
      format: "text"
    }
  end
end
