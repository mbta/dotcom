defmodule Dotcom.ServicePatterns do
  @moduledoc """
  Information about transit service!
  """

  use Dotcom.Gettext.Sigils

  alias Dotcom.Utils.ServiceDateTime
  alias Services.Service

  @services_repo Application.compile_env!(:dotcom, :repo_modules)[:services]
  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

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

  @spec upcoming_holidays_and_service(Routes.Route.id_t(), Date.t()) :: [
          {Holiday.t(), boolean()}
        ]
  def upcoming_holidays_and_service(
        route_id,
        current_date \\ ServiceDateTime.service_date()
      ) do
    route_id
    |> @services_repo.by_route_id()
    |> Stream.flat_map(& &1.all_active_dates)
    |> Stream.uniq()
    |> Stream.reject(&Date.before?(&1, current_date))
    |> then(fn served_dates ->
      if Enum.empty?(served_dates) do
        []
      else
        last_served_date = Enum.max(served_dates, Date)
        rating_end = @schedules_repo.end_of_rating()
        # might still want to show holidays which aren't served by this route,
        # but are in within the current rating
        cutoff_date = rating_end || last_served_date

        current_date
        |> Holiday.Repo.following()
        |> Enum.reject(&Date.after?(&1.date, cutoff_date))
        |> Enum.map(&{&1, &1.date in served_dates})
      end
    end)
  end
end
