defmodule Alerts.Repo.Behaviour do
  @moduledoc """
  Behaviour for the Alerts repo.
  """

  alias Alerts.Alert

  @doc """
  Return all alerts applicable to the given datetime.
  """
  @callback all(DateTime.t()) :: [Alert.t()]

  @doc """
  Return all alerts for the given route ids.
  """
  @callback by_route_ids([String.t()], DateTime.t()) :: [Alert.t()]

  @doc """
  Return all alerts for the given stop id.
  """
  @callback by_stop_id(String.t()) :: [Alert.t()]
end
