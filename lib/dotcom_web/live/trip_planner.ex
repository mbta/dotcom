defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import MbtaMetro.Components.{Feedback, Spinner}
  import DotcomWeb.Components.TripPlanner.{InputForm, Map, Results, ResultsSummary}

  alias Dotcom.TripPlan.{AntiCorruptionLayer, InputForm, InputForm, ItineraryGroups}

  @state %{
    input_form: nil,
    results: %{
      error: nil,
      itinerary_groups: [],
      itinerary_group_selection: nil,
      itinerary_selection: nil
    }
  }

  @doc """
  Set the initial state of the live view to @state.input_form

  Clean any query parameters and convert them to a changeset for the input form.
  """
  @impl true
  def mount(params, _session, socket) do
    new_socket =
      socket
      |> assign(@state)
      |> assign(:input_form, query_params_to_changeset(params))

    {:ok, new_socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <.input_form input_form={@input_form} />
      <.results_summary input_form={@input_form} results={@results} />
      <.map input_form={@input_form} results={@results} />
    </div>
    """
  end

  @impl true
  def handle_event("input_form_change", %{"input_form" => params}, socket) do
    new_socket =
      socket
      |> assign(:input_form, InputForm.changeset(params))

    {:noreply, new_socket}
  end

  @doc """
  Manually set the action on the changeset so the input form knows that it is "dirty" and set the changeset in the input form.

  Reset the results to clear out the live view and then get new results if the changeset is valid.
  """
  @impl true
  def handle_event("input_form_submit", %{"input_form" => params}, socket) do
    changeset =
      params
      |> InputForm.changeset()
      |> Map.put(:action, :submit)

    new_socket =
      socket
      |> assign(:input_form, changeset)
      |> assign(:results, @state.results)
      |> assign_async(:results, fn ->
        {:ok, %{results: get_trip_plans(changeset)}}
      end)

    {:noreply, new_socket}
  end

  @impl true
  def handle_event("select_itinerary", index, socket) do
  end

  @impl true
  def handle_event("select_itinerary_group", index, socket) do
  end

  @doc """
  If the user selects "now" for the date and time, hide the datepicker.
  This will destroy the flatpickr instance.

  If the user selects arrive by or leave at, then we show the datepicker and set the time to the nearest 5 minutes.
  """
  @impl true
  def handle_event("toggle_datepicker", %{"input_form" => %{"datetime_type" => "now"}}, socket) do
    new_socket =
      socket
      |> push_event("set-datetime", %{datetime: nearest_5_minutes()})

    {:noreply, new_socket}
  end

  def handle_event("toggle_datepicker", _, socket) do
    new_socket =
      socket
      |> push_event("set-datetime", %{datetime: nearest_5_minutes()})

    {:noreply, new_socket}
  end

  @impl true
  def handle_event(_event, _params, socket) do
    {:noreply, socket}
  end

  @impl true
  def handle_info(_info, socket) do
    {:noreply, socket}
  end

  defp get_trip_plans(%Ecto.Changeset{valid?: true} = changeset) do
    {:ok, data} = Ecto.Changeset.apply_action(changeset, :submit)

    case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
      {:ok, itineraries} ->
        Map.put(@state.results, :itinerary_groups, ItineraryGroups.from_itineraries(itineraries))

      error ->
        Map.put(@state.results, :error, error)
    end
  end

  defp get_trip_plans(_), do: @state.results

  defp query_params_to_changeset(params) do
    %{
      "datetime" => Timex.now("America/New_York"),
      "datetime_type" => "now",
      "modes" => InputForm.initial_modes(),
    }
    |> Map.merge(AntiCorruptionLayer.convert_old_params(params))
    |> InputForm.changeset()
  end

  defp nearest_5_minutes do
    datetime = Timex.now("America/New_York")
    minutes = datetime.minute
    rounded_minutes = Float.ceil(minutes / 5) * 5
    added_minutes = Kernel.trunc(rounded_minutes - minutes)

    Timex.shift(datetime, minutes: added_minutes)
  end
end
