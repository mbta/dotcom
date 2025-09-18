defmodule Dotcom.SystemStatus.SubwayCache.Behaviour do
  @moduledoc """
  A behaviour to capture the interface of `Dotcom.SystemStatus.SubwayCache`.
  """

  @doc """
  Returns the cached subway status. See `Dotcom.SystemStatus.Subway.subway_status/2`
  for more info.
  """
  @callback subway_status() :: %{
              Routes.Route.id_t() => Dotcom.SystemStatus.Subway.status_entry_group()
            }

  @doc """
  Subscribes the caller to updates any time subway status is updated. The caller
  will need to handle update messages like so:

  ```
  def handle_info(%{event: "subway_status_updated", payload: subway_status}, state) do
    # Logic goes here
  end
  ```
  """
  @callback subscribe() :: :ok | {:error, term()}
end
