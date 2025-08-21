defmodule Algolia.Config do
  @moduledoc """
  Algolia account configuration.
  """
  require Logger

  defstruct [:app_id, :search, :write]

  @type t :: %__MODULE__{
          app_id: String.t() | nil,
          search: String.t() | nil,
          write: String.t() | nil
        }

  def config do
    :dotcom
    |> Application.get_env(:algolia_config)
    |> Enum.reduce([], &parse_config/2)
    |> __MODULE__.__struct__()
  end

  defp parse_config({_key, "$" <> _}, config) do
    config
  end

  defp parse_config({key, {:system, system_key}}, config) do
    Keyword.put(config, key, System.get_env(system_key))
  end

  defp parse_config({key, val}, config) do
    Keyword.put(config, key, val)
  end
end
