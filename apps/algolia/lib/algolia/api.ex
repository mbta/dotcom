defmodule Algolia.Api do
  @moduledoc """
  Interact with Algolia via their API.
  """
  alias Algolia.Config
  require Logger

  defstruct [:host, :referrer, :index, :action, :body]

  @http_pool Application.get_env(:algolia, :http_pool)

  @type t :: %__MODULE__{
          host: String.t() | nil,
          referrer: String.t() | nil,
          index: String.t() | nil,
          action: String.t() | nil,
          body: String.t() | nil
        }

  @spec post(t) :: {:ok, HTTPoison.Response.t()} | {:error, HTTPoison.Error.t() | :bad_config}
  def post(opts, config \\ nil)

  def post(%__MODULE__{} = opts, nil) do
    post(opts, Config.config())
  end

  def post(%__MODULE__{} = opts, %Config{write: <<_::binary>>, app_id: <<_::binary>>} = config) do
    do_post(opts, config)
  end

  def post(%__MODULE__{}, %Config{} = config) do
    _ = Logger.warn("module=#{__MODULE__} missing Algolia config keys: #{inspect(config)}")
    {:error, :bad_config}
  end

  defp do_post(%__MODULE__{index: index, action: action, body: body} = opts, %Config{} = config)
       when is_binary(index) and is_binary(action) and is_binary(body) do
    hackney =
      opts
      |> hackney_opts()
      |> Keyword.put(:pool, @http_pool)

    opts
    |> generate_url(config)
    |> HTTPoison.post(body, headers(opts.referrer, config), hackney: hackney)
  end

  @spec generate_url(t, Config.t()) :: String.t()
  defp generate_url(%__MODULE__{} = opts, %Config{} = config) do
    Path.join([base_url(opts, config), "1", "indexes", opts.index, opts.action])
  end

  defp base_url(%__MODULE__{host: nil}, %Config{app_id: <<app_id::binary>>}) do
    "https://" <> app_id <> "-dsn.algolia.net"
  end

  defp base_url(%__MODULE__{host: "http://localhost:" <> _ = host}, %Config{}) do
    host
  end

  @spec headers(String | nil, Config.t()) :: [{String.t(), String.t()}]
  defp headers(referrer, %Config{} = config) do
    headers = [
      {"X-Algolia-API-Key", config.write},
      {"X-Algolia-Application-Id", config.app_id}
    ]

    if referrer do
      [{"referrer", referrer} | headers]
    else
      headers
    end
  end

  defp hackney_opts(%__MODULE__{index: "*"}) do
    # By default, hackney encodes "*"; passing this option skips this encoding
    # see https://github.com/benoitc/hackney/issues/272#issuecomment-174334135
    [path_encode_fun: fn path -> path end]
  end

  defp hackney_opts(%__MODULE__{}) do
    []
  end
end
