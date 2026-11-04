defmodule Dotcom.ServicePatterns do
  @moduledoc """
  Information about transit service!
  """

  use Dotcom.Gettext.Sigils

  alias Dotcom.Utils.ServiceDateTime
  alias Services.Service

  @services_repo Application.compile_env!(:dotcom, :repo_modules)[:services]

  @doc """
  Whether service is running on a route for a date. Defaults to the current service date, and supports custom dates.

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
    |> @services_repo.by_route_id()
    |> Enum.any?(&Service.serves_date?(&1, date))
  end

  @spec served_dates_for_route(Routes.Route.id_t()) :: [Date.t()]
  def served_dates_for_route(route_id) do
    route_id
    |> @services_repo.by_route_id()
    |> Stream.flat_map(& &1.all_active_dates)
    |> Stream.uniq()
    |> Enum.sort(Date)
  end

  @spec upcoming_atypical_service_dates_for_route(Routes.Route.id_t(), Date.t()) :: %{
          extra_service: [Date.t()],
          holiday_service: [Date.t()]
        }
  def upcoming_atypical_service_dates_for_route(
        route_id,
        current_date \\ ServiceDateTime.service_date()
      ) do
    route_id
    |> @services_repo.by_route_id()
    |> Stream.filter(&(&1.typicality in [:extra_service, :holiday_service]))
    |> Stream.flat_map(fn service ->
      service.all_active_dates
      |> Stream.reject(&Date.before?(&1, current_date))
      |> Stream.map(&%{service: service, date: &1})
    end)
    |> Enum.group_by(& &1.service.typicality, & &1.date)
    |> Map.new(fn {typicality, dates} -> {typicality, Enum.uniq(dates) |> Enum.sort(Date)} end)
  end
end
