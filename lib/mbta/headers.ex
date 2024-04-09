defmodule MBTA.Headers do
  @moduledoc """
  Builds headers for calling the MBTA.Api.

  Setting `:use_cache?` to `true` will include headers set by MBTA.Cache.cache_headers.
  If `:use_cache?` is set to `true`, you must also include a `:url` and a `:params` option.
  """

  alias MBTA.Cache

  @type header_list :: [{String.t(), String.t()}]

  @spec build(String.t() | nil, Keyword.t()) :: header_list
  def build(api_key, opts) do
    []
    |> api_key_header(api_key)
    |> cache_headers(opts)
    |> extra_headers()
  end

  @spec api_key_header(header_list, String.t() | nil) :: header_list
  defp api_key_header(headers, nil), do: headers

  defp api_key_header(headers, <<key::binary>>) do
    api_version = Util.config(:dotcom, :v3_api_version)
    [{"x-api-key", key}, {"MBTA-Version", api_version} | headers]
  end

  @spec cache_headers(header_list, Keyword.t()) :: header_list
  defp cache_headers(headers, opts) do
    if Keyword.get(opts, :use_cache?, true) do
      do_cache_headers(headers, opts)
    else
      headers
    end
  end

  @spec do_cache_headers(header_list, Keyword.t()) :: header_list
  defp do_cache_headers(headers, opts) do
    params = Keyword.fetch!(opts, :params)
    cache_headers_fn = Keyword.get(opts, :cache_headers_fn, &Cache.cache_headers/2)

    opts
    |> Keyword.fetch!(:url)
    |> cache_headers_fn.(params)
    |> Enum.reduce(headers, &[&1 | &2])
  end

  @spec extra_headers(header_list) :: header_list
  defp extra_headers(headers) do
    Util.config(:dotcom, :enable_experimental_features)
    |> do_extra_headers(headers)
  end

  @spec do_extra_headers(boolean() | nil, header_list) :: header_list
  defp do_extra_headers("true", headers) do
    [{"x-enable-experimental-features", "true"} | headers]
  end

  defp do_extra_headers(_, headers), do: headers
end
