defmodule DotcomWeb.Components.TripPlanner.ResultsSummary do
  @moduledoc false

  use DotcomWeb, :component

  alias Dotcom.TripPlan.InputForm

  def results_summary(assigns) do
    ~H"""
    <section :if={@results.loading? || (Enum.count(@results.itinerary_groups) > 0) || (@changeset.action && @changeset.valid?)} class="mt-2 mb-6">
      <p class="text-lg font-semibold mb-0">{submission_summary(@changeset.changes)}</p>
      <p>{time_summary(@changeset.changes)}</p>
      <%= if @results.loading? do %>
        <.spinner aria_label="Waiting for results" /> Waiting for results...
      <% else %>
        <%= if @results.error do %>
          <.feedback kind={:error}>{@results.error}</.feedback>
        <% end %>
        <%= if Enum.count(@results.itinerary_groups) == 0 do %>
          <.feedback kind={:warning}>No trips found.</.feedback>
        <% else %>
          <.feedback kind={:success}>
            Found {Enum.count(@results.itinerary_groups)} {Inflex.inflect(
              "way",
              Enum.count(@results.itinerary_groups)
            )} to go.
          </.feedback>
        <% end %>
      <% end %>
    </section>
    """
  end

  defp submission_summary(%{from: from, to: to, modes: modes}) do
    modes_string = modes.changes |> InputForm.Modes.selected_modes() |> String.downcase()

    "Planning trips from #{from.changes.name} to #{to.changes.name} using #{modes_string}"
  end

  defp time_summary(%{datetime: datetime, datetime_type: datetime_type}) do
    preamble = if datetime_type == "arrive_by", do: "Arriving by ", else: "Leaving at "
    time_description = Timex.format!(datetime, "{h12}:{m}{am}")
    date_description = Timex.format!(datetime, "{WDfull}, {Mfull} {D}")
    preamble <> time_description <> " on " <> date_description
  end
end
