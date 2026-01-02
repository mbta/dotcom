defmodule Dotcom.ServicePatterns do
  @moduledoc """
  Information about transit service!
  """

  use Dotcom.Gettext.Sigils

  alias Dotcom.Utils.ServiceDateTime
  alias Services.Service

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
    |> @services_repo.by_route_id()
    |> Enum.any?(&Service.serves_date?(&1, date))
  end

  @spec for_route(Routes.Route.id_t()) :: [Service.t()]
  def for_route(route_id) do
    route_id
    |> @services_repo.by_route_id()
    |> Stream.reject(&(&1.typicality == :canonical))
    |> Stream.flat_map(&unwrap_multiple_holidays/1)
    |> Stream.map(&add_single_date_description/1)
    |> Stream.map(&adjust_planned_description/1)
    |> Enum.reject(&Date.before?(&1.end_date, ServiceDateTime.service_date()))
    |> dedup_identical_services()
    |> dedup_similar_services()
    |> to_service_pattern()
  end

  defp unwrap_multiple_holidays(
         %{typicality: :holiday_service, added_dates: added_dates} = service
       )
       when length(added_dates) > 1 do
    for added_date <- added_dates do
      %{
        service
        | added_dates: [added_date],
          added_dates_notes: Map.take(service.added_dates_notes, [added_date])
      }
    end
  end

  defp unwrap_multiple_holidays(service), do: [service]

  defp add_single_date_description(
         %{
           added_dates: [single_date],
           added_dates_notes: added_dates_notes,
           typicality: typicality
         } = service
       )
       when typicality in [:extra_service, :holiday_service] do
    date_note = Map.get(added_dates_notes, single_date) || service.description

    formatted_date =
      single_date
      |> Date.from_iso8601!()
      |> format_tiny_date()

    %{
      service
      | description: "#{date_note}, #{formatted_date}"
    }
  end

  defp add_single_date_description(service), do: service

  defp format_tiny_date(date), do: Dotcom.Utils.Time.format!(date, :month_day_short)

  defp adjust_planned_description(%{typicality: :planned_disruption} = service) do
    dates =
      if service.start_date == service.end_date do
        " (#{format_tiny_date(service.start_date)})"
      else
        " (#{format_tiny_date(service.start_date)} - #{format_tiny_date(service.end_date)})"
      end

    Map.update!(service, :description, &(&1 <> dates))
  end

  defp adjust_planned_description(service), do: service

  defp dedup_identical_services(services) do
    services
    |> Enum.group_by(fn service ->
      {service.start_date, service.end_date, service.valid_days, service.removed_dates,
       service.added_dates}
    end)
    |> Enum.map(fn {_key, [service | _rest]} ->
      service
    end)
  end

  # If we have two services A and B with the same type and typicality,
  # with the date range from A's start to A's end a subset of the date
  # range from B's start to B's end, either A is in the list of services
  # erroneously (for example, in the case of the 39 in the fall 2019
  # rating), or A represents a special service that's not a holiday (for
  # instance, the Thanksgiving-week extra service to Logan on the SL1 in
  # the fall 2019 rating).
  #
  # However, in neither of these cases do we want to show service A. In the
  # first case, we don't want to show A because it's erroneous, and in the
  # second case, we don't want to show A for parity with the paper/PDF
  # schedules, in which these special services are not generally called
  # out.

  @spec dedup_similar_services([Service.t()]) :: [Service.t()]
  defp dedup_similar_services(services) do
    services
    |> Enum.group_by(&{&1.type, &1.typicality, &1.rating_description})
    |> Enum.flat_map(fn {_, service_group} ->
      service_group
      |> drop_extra_weekday_schedule_if_friday_present()
      |> then(fn services ->
        Enum.reject(services, &service_completely_overlapped?(&1, services))
      end)
    end)
  end

  # If there's a Friday service and two overlapping weekday schedules, we want to show the Monday-Thursday one rather than the Monday-Friday one.
  defp drop_extra_weekday_schedule_if_friday_present(services) do
    if Enum.find(services, &Service.friday_typical_service?/1) &&
         Enum.find(services, &Service.monday_to_thursday_typical_service?/1) do
      Enum.reject(services, &(&1.valid_days == [1, 2, 3, 4, 5]))
    else
      services
    end
  end

  defp service_completely_overlapped?(%{typicality: :holiday_service}, _), do: false

  defp service_completely_overlapped?(service, services) do
    Enum.any?(services, fn other_service ->
      # There's an other service that
      # - starts earlier/same time as this service
      # - and ends later/same time as this service
      # - and covers the same valid_days as this service
      other_service != service && String.contains?(service.name, other_service.name) &&
        Date.compare(other_service.start_date, service.start_date) != :gt &&
        Date.compare(other_service.end_date, service.end_date) != :lt &&
        Enum.all?(service.valid_days, &Enum.member?(other_service.valid_days, &1))
    end)
  end

  defp to_service_pattern(services) do
    services
    |> Enum.map(fn service ->
      %{
        service: service,
        dates: Service.all_valid_dates_for_service(service),
        group_label: group_label(service)
      }
    end)
    |> merge_similar_typical()
  end

  def group_label(service) do
    case service.typicality do
      :holiday_service ->
        {:holiday, ~t"Holiday Schedules"}

      :extra_service ->
        {:extra, ~t"Extra Service"}

      :planned_disruption ->
        {:planned, gettext("%{rating} Planned Work", rating: service.rating_description)}

      _ ->
        typical_service_group(service)
    end
  end

  defp typical_service_group(
         %Service{
           rating_description: rating_description,
           rating_end_date: rating_end_date,
           rating_start_date: rating_start_date
         } = service
       ) do
    end_date = short_format(rating_end_date)
    start_date = short_format(rating_start_date)

    if Service.in_current_rating?(service) do
      label =
        if rating_end_date do
          gettext("%{rating} Schedules, ends %{date}",
            rating: rating_description,
            date: end_date
          )
        else
          gettext("%{rating} Schedules, starts %{date}",
            rating: rating_description,
            date: start_date
          )
        end

      {:current, label}
    else
      if Service.in_future_rating?(service) do
        label =
          gettext("%{rating} Schedules, starts %{date}",
            rating: rating_description,
            date: start_date
          )

        {:future, label}
      else
        {:other, ~t"Other Schedules"}
      end
    end
  end

  defp short_format(date) do
    case Dotcom.Utils.Time.format(date, :month_day_short) do
      {:ok, value} -> value
      _ -> nil
    end
  end

  defp merge_similar_typical(all) do
    all
    |> Enum.group_by(&similar_typical_items/1)
    |> Enum.map(&merge_items/1)
  end

  defp similar_typical_items(%{
         dates: dates,
         service: %Service{typicality: :typical_service} = service
       }) do
    typical_groups = [
      {:monday_thursday, ~t"Monday - Thursday schedules",
       fn s ->
         s.type == :weekday &&
           (s.valid_days == [1, 2, 3, 4] || s.description =~ "Monday - Thursday")
       end},
      {:friday, ~t"Friday schedules",
       fn s ->
         s.type == :weekday && (s.valid_days == [5] || s.description =~ "Friday")
       end},
      {:weekday, ~t"Weekday schedules", fn s -> s.type == :weekday end},
      {:saturday, ~t"Saturday schedules", fn s -> s.type == :saturday end},
      {:sunday, ~t"Sunday schedules", fn s -> s.type == :sunday end},
      {:weekend, ~t"Weekend schedules", fn s -> s.type == :weekend end}
    ]

    case Enum.find(typical_groups, fn {_, _, func} -> func.(service) end) do
      {key, label, _} -> {:typical, key, label}
      _ -> {service.typicality, List.first(dates), service.description}
    end
  end

  defp similar_typical_items(%{dates: dates, service: service}),
    do: {service.typicality, List.first(dates), service.description}

  defp merge_items({label, [%{service: _, dates: dates, group_label: group_label}]}) do
    %{service_label: label, dates: dates, group_label: group_label}
  end

  defp merge_items({label, many_items}) do
    merged_dates =
      many_items
      |> Enum.flat_map(& &1.dates)
      |> Enum.uniq()
      |> Enum.sort(Date)

    merged_label = List.first(many_items) |> Map.get(:group_label)
    %{service_label: label, dates: merged_dates, group_label: merged_label}
  end
end
