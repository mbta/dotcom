defmodule MBTA.Api.Behaviour do
  @moduledoc """
  Defines the behaviour for the MBTA API.
  """

  @callback get_json(String.t()) :: JsonApi.t() | {:error, any}
  @callback get_json(String.t(), Keyword.t()) :: JsonApi.t() | {:error, any}
  @callback get_json(String.t(), Keyword.t(), Keyword.t()) :: JsonApi.t() | {:error, any}

  @implementation Application.compile_env!(:dotcom, :mbta_api)

  def get_json(url) do
    @implementation.get_json(url)
  end

  def get_json(url, params) do
    @implementation.get_json(url, params)
  end

  def get_json(url, params, opts) do
    @implementation.get_json(url, params, opts)
  end
end
