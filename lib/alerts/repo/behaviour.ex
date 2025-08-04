defmodule Alerts.Repo.Behaviour do
  @moduledoc """
  Behaviour for the Alerts repo.
  """

  alias Alerts.{Alert, Banner}

  @doc """
  Return all alerts applicable to the given datetime.
  """
  @callback all(DateTime.t()) :: [Alert.t()]

  @doc """
  Return a banner to be displayed on all pages, or nil if no such banner exists.
  """
  @callback banner() :: Banner.t() | nil

  @doc """
  Return all alerts for the given route ids.
  """
  @callback by_route_ids([String.t()], DateTime.t()) :: [Alert.t()]

  @doc """
  Return all alerts for the given stop id.
  """
  @callback by_stop_id(String.t()) :: [Alert.t()]

  @doc """
  Get alerts which describe planned work that impacts service on the given routes at the given time.

  Sort them so that earlier alerts are displayed first.
  """
  @callback planned_service_impacts_by_routes([String.t()], DateTime.t()) :: [Alert.t()]
end
