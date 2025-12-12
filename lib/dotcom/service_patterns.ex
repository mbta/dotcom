defmodule Dotcom.ServicePatterns do
  @moduledoc """
  Information about transit service!
  """

  alias Dotcom.Utils.ServiceDateTime

  @services_repo Application.compile_env!(:dotcom, :repo_modules)[:services]

  @doc """
  Uses schedules to determine whether service is running. Defaults to the current service date, and supports custom dates.

  iex> has_service?(route: "351", date: ~D[2025-12-25]) # false
  iex> has_service?(route: "CR-Foxboro") # probably false
  iex> has_service?(route: "1") # true, assuming it's scheduled
  """
  def has_service?(opts) do
    {date, opts} = Keyword.pop(opts, :date, ServiceDateTime.service_date())
    has_service?(opts, date)
  end

  defp has_service?(opts, date) do
    opts
    |> Keyword.fetch!(:route)
    |> @services_repo.by_route_id(date: Date.to_iso8601(date))
    |> Enum.any?(&Services.Service.serves_date?(&1, date))
  end
end
