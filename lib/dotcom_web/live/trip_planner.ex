defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import MbtaMetro.Components.{Feedback, Spinner}
  import DotcomWeb.Components.TripPlanner.{InputForm, Results, ResultsSummary}

  alias Dotcom.TripPlan
  alias Dotcom.TripPlan.{AntiCorruptionLayer, InputForm, InputForm, ItineraryGroups}

  @state %{
    input_form: %{
      changeset: %Ecto.Changeset{}
    },
    map: %{
      config: Application.compile_env(:mbta_metro, :map),
      lines: [],
      pins: [],
      points: []
    },
    results: %{
      error: nil,
      itinerary_groups: [],
      itinerary_group_selection: nil,
      itinerary_selection: nil,
      loading?: false
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
      |> assign(
        :input_form,
        Map.put(@state.input_form, :changeset, query_params_to_changeset(params))
      )

    {:ok, new_socket}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <.input_form changeset={@input_form.changeset} />
      <.results_summary changeset={@input_form.changeset} results={@results} />
      <.live_component
        module={MbtaMetro.Live.Map}
        id="trip-planner-map"
        class="h-64 md:h-96 w-full"
        config={@map.config}
        lines={@map.lines}
        pins={@map.pins}
        points={@map.points}
      />
      <.results results={@results} />
    </div>
    """
  end

  @impl true
  def handle_async("get_itinerary_groups", {:ok, itinerary_groups}, socket)
      when is_list(itinerary_groups) do
    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :itinerary_groups, itinerary_groups))

    {:noreply, new_socket}
  end

  @impl true
  def handle_async("get_itinerary_groups", {:ok, result}, socket) when is_binary(result) do
    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :error, result))

    {:noreply, new_socket}
  end

  def handle_async("get_itinerary_groups", {:exit, reason}, socket) do
    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :error, reason))

    {:noreply, new_socket}
  end

  @impl true
  def handle_event("input_form_change", %{"input_form" => params}, socket) do
    changeset = InputForm.changeset(params)
    pins = input_form_to_pins(changeset)

    new_socket =
      socket
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> assign(:map, Map.put(@state.map, :pins, pins))

    {:noreply, new_socket}
  end

  @doc """
  Manually set the action on the changeset so the input form knows that it is "dirty" and set the changeset in the input form.

  Reset the results to clear out the live view and then get new results if the changeset is valid.
  """
  @impl true
  def handle_event("input_form_submit", %{"input_form" => params}, socket) do
    changeset = params |> InputForm.changeset() |> Map.put(:action, :submit)
    pins = input_form_to_pins(changeset)

    new_socket =
      socket
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> assign(:map, Map.put(@state.map, :pins, pins))
      |> assign(:results, Map.put(@state.results, :loading?, true))
      |> start_async("get_itinerary_groups", fn -> get_itinerary_groups(changeset) end)

    {:noreply, new_socket}
  end

  @impl true
  def handle_event("reset_itinerary_group", _, socket) do
    new_socket =
      socket
      |> assign(:results, Map.put(socket.assigns.results, :itinerary_group_selection, nil))

    {:noreply, new_socket}
  end

  @impl true
  def handle_event("select_itinerary", %{"index" => index}, socket) do
    index = String.to_integer(index)

    new_socket =
      socket
      |> assign(:results, Map.put(socket.assigns.results, :itinerary_selection, index))

    {:noreply, new_socket}
  end

  @impl true
  def handle_event("select_itinerary_group", %{"index" => index}, socket) do
    index = String.to_integer(index)

    new_map = %{
      lines: itinerary_groups_to_lines(socket.assigns.results.itinerary_groups, index),
      points: itinerary_groups_to_points(socket.assigns.results.itinerary_groups, index)
    }

    new_socket =
      socket
      |> assign(:results, Map.put(socket.assigns.results, :itinerary_group_selection, index))
      |> assign(:map, Map.merge(socket.assigns.map, new_map))

    {:noreply, new_socket}
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

  defp get_itinerary_groups(%Ecto.Changeset{valid?: true} = changeset) do
    {:ok, data} = Ecto.Changeset.apply_action(changeset, :submit)

    case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
      {:ok, itineraries} ->
        ItineraryGroups.from_itineraries(itineraries)

      error ->
        error
    end
  end

  defp get_itinerary_groups(_), do: []

  defp query_params_to_changeset(params) do
    %{
      "datetime" => Timex.now("America/New_York"),
      "datetime_type" => "now",
      "modes" => InputForm.initial_modes()
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

  defp to_geojson(%{longitude: longitude, latitude: latitude}) do
    [longitude, latitude]
  end

  defp to_geojson(_) do
    []
  end

  defp input_form_to_pins(%{changes: %{from: from, to: to}}) do
    [to_geojson(from.changes), to_geojson(to.changes)]
  end

  defp input_form_to_pins(%{changes: %{from: from}}) do
    [to_geojson(from.changes)]
  end

  defp input_form_to_pins(%{changes: %{to: to}}) do
    [[], to_geojson(to.changes)]
  end

  defp input_form_to_pins(_), do: []

  defp itinerary_groups_to_itinerary_map(itinerary_groups, index) do
    itinerary_groups
    |> Enum.at(index)
    |> Map.get(:itineraries)
    |> Enum.random()
    |> TripPlan.Map.itinerary_map()
  end

  defp itinerary_groups_to_lines(itinerary_groups, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(index)
    |> TripPlan.Map.get_lines()
  end

  defp itinerary_groups_to_points(itinerary_groups, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(index)
    |> TripPlan.Map.get_points()
  end
end
