defmodule Alerts.Match do
  @moduledoc """

  Returns the alerts which match the provided InformedEntity or entities.

  Passing multiple entities will allow the matching to be more efficient.

  """
  use Timex

  alias Alerts.InformedEntitySet, as: IESet

  def match(alerts, entity, datetime \\ nil)

  def match(alerts, entity, nil) do
    for alert <- alerts,
        any_entity_match?(alert, entity) do
      alert
    end
  end

  def match(alerts, entity, datetime) do
    # time first in order to minimize the more-expensive entity match
    for alert <- alerts,
        any_time_match?(alert, datetime),
        any_entity_match?(alert, entity) do
      alert
    end
  end

  defp any_entity_match?(alert, entities) when is_list(entities) do
    Enum.any?(entities, &any_entity_match?(alert, &1))
  end

  defp any_entity_match?(alert, entity) do
    IESet.match?(alert.informed_entity, entity)
  end

  def any_time_match?(alert, datetime) do
    any_period_match?(alert.active_period, datetime)
  end

  def any_period_match?([], _datetime) do
    false
  end

  def any_period_match?([{nil, nil} | _rest], _datetime) do
    true
  end

  def any_period_match?([{nil, stop} | rest], datetime) do
    if compare(datetime, stop) == :gt do
      any_period_match?(rest, datetime)
    else
      true
    end
  end

  def any_period_match?([{start, nil} | _rest], datetime) do
    compare(datetime, start) != :lt
  end

  def any_period_match?([{start, stop} | rest], datetime) do
    start_compare = compare(datetime, start)
    stop_compare = compare(datetime, stop)

    cond do
      start_compare != :lt and stop_compare != :gt ->
        true

      stop_compare == :lt ->
        # if it stops in the future, no other period will match
        false

      true ->
        any_period_match?(rest, datetime)
    end
  end

  defp compare(%Date{} = first, %DateTime{} = second) do
    Date.compare(first, DateTime.to_date(second))
  end

  defp compare(%DateTime{} = first, %DateTime{} = second) do
    DateTime.compare(first, second)
  end

  defp compare(%NaiveDateTime{} = first, %NaiveDateTime{} = second) do
    NaiveDateTime.compare(first, second)
  end
end
