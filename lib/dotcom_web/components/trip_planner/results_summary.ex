defmodule DotcomWeb.Components.TripPlanner.ResultsSummary do
  @moduledoc false

  use DotcomWeb, :component

  alias Dotcom.TripPlan.InputForm

  def results_summary(assigns) do
    ~H"""
    <section :if={@input_form.action && @input_form.valid?} class="mt-2 mb-6">
      <p class="text-lg font-semibold mb-0">{submission_summary(@input_form.changes)}</p>
      <p>{time_summary(@input_form.changes)}</p>
      <.async_result :let={results} assign={@results}>
        <:failed :let={{:error, errors}}>
          <.error_container title="Unable to plan your trip">
            <p :for={%OpenTripPlannerClient.Error{message: message} <- errors} class="last:mb-0">
              {message}
            </p>
          </.error_container>
        </:failed>
        <:loading>
          <.spinner aria_label="Waiting for results" /> Waiting for results...
        </:loading>
        <%= if results do %>
          <%= if Enum.count(results) == 0 do %>
            <.feedback kind={:warning}>No trips found.</.feedback>
          <% else %>
            <.feedback kind={:success}>
              Found {Enum.count(results)} {Inflex.inflect("way", Enum.count(results))} to go.
            </.feedback>
          <% end %>
        <% end %>
      </.async_result>
    </section>
    """
  end

  defp submission_summary(%{from: from, to: to, modes: modes}) do
    "Planning trips from #{from.changes.name} to #{to.changes.name} using #{InputForm.Modes.selected_modes(modes.changes)}"
  end

  defp submission_summary(foo), do: IO.inspect(foo)

  defp time_summary(%{datetime: datetime, datetime_type: datetime_type}) do
    preamble = if datetime_type == "arrive_by", do: "Arriving by ", else: "Leaving at "
    time_description = Timex.format!(datetime, "{h12}:{m}{am}")
    date_description = Timex.format!(datetime, "{WDfull}, {Mfull} {D}")
    preamble <> time_description <> " on " <> date_description
  end
end
