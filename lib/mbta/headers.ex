defmodule MBTA.Headers do
  @moduledoc """
  Builds headers for calling the MBTA.Api.
  """

  @type header_list :: [{String.t(), String.t()}]

  @spec build(String.t()) :: header_list
  def build(api_key) do
    []
    |> api_key_header(api_key)
    |> extra_headers()
  end

  @spec api_key_header(header_list, String.t() | nil) :: header_list
  defp api_key_header(headers, nil), do: headers

  defp api_key_header(headers, <<key::binary>>) do
    api_version = Util.config(:dotcom, :v3_api_version)
    [{"x-api-key", key}, {"MBTA-Version", api_version} | headers]
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
