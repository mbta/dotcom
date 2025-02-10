defmodule Dotcom.PlannedDisruptions.Alerts do
  @moduledoc """
  """

  import Dotcom.Alerts, only: [service_impacting_alert?: 1]
  import Dotcom.Routes, only: [subway_route_ids: 0]
  import Dotcom.Utils.ServiceDateTime, only: [service_range: 1]

  alias Dotcom.Alerts.Alert
  alias Dotcom.Utils

  def get() do
    subway_route_ids()
    |> Alerts.Repo.by_route_ids(Utils.DateTime.now())
    |> Enum.filter(&service_impacting_alert?/1)
    |> Enum.group_by(&service_range/1)
  end
end
