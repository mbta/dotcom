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
          {Date.t(), String.t(), boolean()}
        ]
  def upcoming_holidays_and_service(
        route_id,
        current_date \\ ServiceDateTime.service_date()
      ) do
    services = @services_repo.by_route_id(route_id)
    served_dates = Stream.flat_map(services, & &1.all_active_dates)

    holiday_entries = upcoming_holiday_entries(current_date, served_dates)
    extra_service_entries = upcoming_extra_service_entries(services, current_date)

    (extra_service_entries ++ holiday_entries)
    |> Enum.group_by(&elem(&1, 0))
    |> Enum.map(fn {date, entries} ->
      case pick_name(entries, date) do
        {name, served?} -> {date, name, served?}
        _ -> nil
      end
    end)
    |> Enum.reject(&is_nil/1)
    |> Enum.sort_by(&elem(&1, 0), Date)
  end

  defp upcoming_holiday_entries(current_date, served_dates) do
    rating_end = @schedules_repo.end_of_rating()

    current_date
    |> Holiday.Repo.following()
    |> Enum.reject(&Date.after?(&1.date, rating_end))
    |> Enum.map(fn holiday ->
      {holiday.date, holiday, holiday.date in served_dates}
    end)
  end

  defp upcoming_extra_service_entries(services, current_date) do
    services
    |> Enum.filter(&(&1.typicality in [:extra_service, :holiday_service]))
    |> Enum.reject(&service_ended_before?(&1, current_date))
    |> Enum.flat_map(fn service ->
      Enum.map(service.all_active_dates, fn date ->
        {date, service, true}
      end)
    end)
  end

  defp service_ended_before?(%{all_active_dates: dates}, current_date) do
    last_served_date = Enum.max(dates, Date)
    Date.after?(current_date, last_served_date)
  end

  # Prefer the service added date name, then the holiday name
  defp pick_name(entries, date) do
    service =
      Enum.find_value(entries, fn
        {_, %Service{} = service, _} -> service
        _ -> nil
      end)

    holiday =
      Enum.find(entries, fn
        {_, %Holiday{}, _} -> true
        _ -> false
      end)

    date_key = Date.to_iso8601(date)

    case service do
      %Service{added_dates_notes: notes} ->
        notes
        |> Map.get(date_key)
        |> service_name_or_holiday(holiday)

      nil ->
        holiday_name(holiday)
    end
  end

  defp service_name_or_holiday(name, _holiday) when name not in [nil, false], do: {name, true}
  defp service_name_or_holiday(_name, holiday), do: holiday_name(holiday)

  defp holiday_name({_, %Holiday{name: name}, served?}), do: {name, served?}
  defp holiday_name(_), do: nil
end
