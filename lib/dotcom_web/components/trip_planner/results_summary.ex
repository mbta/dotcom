defmodule DotcomWeb.Components.TripPlanner.ResultsSummary do
  @moduledoc false

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.Helpers, only: [formatted_time_on_date: 1]

  attr :changeset, :any, required: true
  attr :class, :string, default: ""
  attr :results, :any, required: true

  # ARIA attributes are used so that AT announces the entire text, even if only
  # part of it changes. role=status provides AT with additional support
  # (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#roles_with_implicit_live_region_attributes)
  def results_summary(assigns) do
    ~H"""
    <section
      :if={
        @results.loading? || Enum.count(@results.itinerary_groups) > 0 ||
          (@changeset.action && @changeset.valid?)
      }
      class={@class}
      role="status"
      aria-atomic="true"
      aria-live="polite"
    >
      <p class="text-lg font-semibold mb-0">{submission_summary(@changeset.changes)}</p>
      <p>{time_summary(@changeset.changes)}</p>
      <.results_feedback results={@results} />
    </section>
    """
  end

  defp results_feedback(%{results: %{loading?: true}} = assigns) do
    ~H"""
    """
  end

  defp results_feedback(%{results: %{error: error}} = assigns) when not is_nil(error) do
    ~H"""
    <.feedback kind={:error}>
      <span data-test="results-summary:error">
        {@results.error}
      </span>
    </.feedback>
    """
  end

  defp results_feedback(assigns) do
    ~H"""
    <.itinerary_group_feedback itinerary_groups={@results.itinerary_groups} />
    """
  end

  defp itinerary_group_feedback(assigns) do
    ~H"""
    <.feedback :if={@itinerary_groups == []} kind={:warning}>{~t(No trips found)}.</.feedback>
    """
  end

  defp submission_summary(%{
         from: %{changes: %{name: from_name}},
         to: %{changes: %{name: to_name}}
       }) do
    gettext("Trips from %{from} to %{to}", from: from_name, to: to_name)
  end

  defp submission_summary(_), do: nil

  defp time_summary(%{datetime: datetime} = params) do
    time_on_date =
      datetime
      |> Util.to_local_time()
      |> formatted_time_on_date()

    if Map.get(params, :datetime_type) == "arrive_by" do
      gettext("Arriving by %{time}", time: time_on_date)
    else
      gettext("Leaving at %{time}", time: time_on_date)
    end
  end
end
