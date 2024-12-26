defmodule DotcomWeb.Components.TripPlanner.ResultsSummary do
  @moduledoc false

  use DotcomWeb, :component

  def results_summary(assigns) do
    ~H"""
    <section
      :if={
        @results.loading? || Enum.count(@results.itinerary_groups) > 0 ||
          (@changeset.action && @changeset.valid?)
      }
      class="mt-2 mb-6"
    >
      <p class="text-lg font-semibold mb-0">{submission_summary(@changeset.changes)}</p>
      <p>{time_summary(@changeset.changes)}</p>
      <.results_feedback results={@results} />
    </section>
    """
  end

  defp results_feedback(%{results: %{loading?: true}} = assigns) do
    ~H"""
    <.spinner aria_label="Waiting for results" /> Waiting for results...
    """
  end

  defp results_feedback(%{results: %{error: nil}} = assigns) do
    ~H"""
    <.itinerary_group_feedback itinerary_groups={@results.itinerary_groups} />
    """
  end

  defp results_feedback(assigns) do
    ~H"""
    <.feedback kind={:error}>{@results.error}</.feedback>
    """
  end

  defp itinerary_group_feedback(assigns) do
    ~H"""
    <.feedback :if={@itinerary_groups == []} kind={:warning}>No trips found.</.feedback>
    """
  end

  defp submission_summary(%{from: from, to: to}) do
    "Trips from #{from.changes.name} to #{to.changes.name}"
  end

  defp time_summary(%{datetime: datetime, datetime_type: datetime_type}) do
    preamble = if datetime_type == "arrive_by", do: "Arriving by ", else: "Leaving at "
    time_description = Timex.format!(datetime, "{h12}:{m}{am}")
    date_description = Timex.format!(datetime, "{WDfull}, {Mfull} {D}")
    preamble <> time_description <> " on " <> date_description
  end
end
