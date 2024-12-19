defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

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

  @impl true
  @doc """
  Prepare the live view:

  - Set the initial state of the live view.
  - Clean any query parameters and convert them to a changeset for the input form.
  - Then, submit the form if the changeset is valid (i.e., the user visited with valid query parameters).
  """
  def mount(params, _session, socket) do
    changeset = query_params_to_changeset(params)

    new_socket =
      socket
      |> assign(@state)
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> maybe_submit_form()

    {:ok, new_socket}
  end

  @impl true
  @doc """
  The live view is made up of four subcomponents:

  - InputForm: The form for the user to input their trip details
  - ResultsSummary: A summary of the user's input and the number of results found
  - Map: A map showing the user's trip details based on results and the selected itinerary group
  - Results: Itinerary groups and itinerary details
  """
  def render(assigns) do
    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <.input_form changeset={@input_form.changeset} />
      <.results_summary changeset={@input_form.changeset} results={@results} />
      <div class={[
        "flex flex-col gap-4 md:flex-row md:gap-7"
      ]}>
        <.live_component
          module={MbtaMetro.Live.Map}
          id="trip-planner-map"
          class={[
            "md:order-last",
            "h-64 md:h-[32rem] w-full",
            @results.itinerary_group_selection == nil && "hidden md:block",
            @results.itinerary_group_selection != nil && "block"
          ]}
          config={@map.config}
          lines={@map.lines}
          pins={@map.pins}
          points={@map.points}
        />
        <.results
          :if={Enum.count(@results.itinerary_groups) > 0}
          class="md:max-w-[25rem]"
          results={@results}
        />
      </div>
    </div>
    """
  end

  @impl true
  # When itinerary groups are found, we add them to the results state.
  def handle_async("get_itinerary_groups", {:ok, itinerary_groups}, socket)
      when is_list(itinerary_groups) do
    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :itinerary_groups, itinerary_groups))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered by OTP errors, we combine them into a single error message and add it to the results state.
  def handle_async("get_itinerary_groups", {:ok, {:error, errors}}, socket) do
    error =
      errors
      |> Enum.map_join(", ", &Map.get(&1, :message))

    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :error, error))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the async operation fails, we add the error to the results state.
  def handle_async("get_itinerary_groups", {:exit, reason}, socket) do
    new_socket =
      socket
      |> assign(:results, Map.put(@state.results, :error, reason))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered every time the form changes:
  #
  # - Update the input form state with the new changeset
  # - Update the map state with the new pins
  # - Reset the results state
  def handle_event("input_form_change", %{"input_form" => params}, socket) do
    changeset = InputForm.changeset(params)
    pins = input_form_to_pins(changeset)

    new_socket =
      socket
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> assign(:map, Map.put(@state.map, :pins, pins))
      |> assign(:results, @state.results)
      |> maybe_round_datetime()

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the form is submitted:
  #
  # - Convert the params to a changeset and submit it
  def handle_event("input_form_submit", %{"input_form" => params}, socket) do
    new_socket =
      submit_changeset(socket, InputForm.changeset(params))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user selects to view all itinerary groups after selecting a particular one
  #
  # - Reset the itinerary group and itinerary selections
  def handle_event("reset_itinerary_group", _, socket) do
    new_results = %{
      itinerary_group_selection: nil,
      itinerary_selection: nil
    }

    new_socket =
      socket
      |> assign(:results, Map.merge(socket.assigns.results, new_results))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user selects a particular itinerary
  #
  # - Update the itinerary selection
  def handle_event("select_itinerary", %{"index" => index}, socket) do
    index = String.to_integer(index)

    new_socket =
      socket
      |> assign(:results, Map.put(socket.assigns.results, :itinerary_selection, index))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user selects a particular itinerary group
  #
  # - Update the itinerary group selection
  # - Update the map state with the new lines and points
  def handle_event("select_itinerary_group", %{"index" => index}, socket) do
    index = String.to_integer(index)

    new_map = %{
      lines: itinerary_groups_to_lines(socket.assigns.results.itinerary_groups, index),
      points: itinerary_groups_to_points(socket.assigns.results.itinerary_groups, index)
    }

    new_results = %{itinerary_group_selection: index, itinerary_selection: 0}

    new_socket =
      socket
      |> assign(:results, Map.merge(socket.assigns.results, new_results))
      |> assign(:map, Map.merge(socket.assigns.map, new_map))

    {:noreply, new_socket}
  end

  @impl true
  # Default if we receieve an event we don't handle.
  def handle_event(_event, _params, socket) do
    {:noreply, socket}
  end

  @impl true
  # Default if we receive an info message we don't handle.
  def handle_info(_info, socket) do
    {:noreply, socket}
  end

  # Run an OTP plan on the changeset data and return itinerary groups or an error.
  defp get_itinerary_groups(%Ecto.Changeset{valid?: true} = changeset) do
    {:ok, data} = Ecto.Changeset.apply_action(changeset, :submit)

    case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
      {:ok, itineraries} ->
        ItineraryGroups.from_itineraries(itineraries)

      error ->
        error
    end
  end

  # If the changeset is invalid, we return an empty list of itinerary groups.
  defp get_itinerary_groups(_), do: []

  # Convert the input form changeset to a list of pins for the map.
  # I.e., add pins for the from and to locations.
  defp input_form_to_pins(%{changes: %{from: from, to: to}}) do
    [to_geojson(from.changes), to_geojson(to.changes)]
  end

  # If `from` is set but `to` isn't, then we return only the one pin.
  defp input_form_to_pins(%{changes: %{from: from}}) do
    [to_geojson(from.changes)]
  end

  # If `to` is set but `from` isn't, we return an empty first pin so that to shows up as the 'B' pin.
  defp input_form_to_pins(%{changes: %{to: to}}) do
    [[], to_geojson(to.changes)]
  end

  # If neither `from` nor `to` are set, we return an empty list of pins.
  defp input_form_to_pins(_), do: []

  # Get the itinerary group at the given index and convert it to a map.
  # Selects a random itinerary from the group as they will all be the same.
  defp itinerary_groups_to_itinerary_map(itinerary_groups, index) do
    itinerary_groups
    |> Enum.at(index)
    |> Map.get(:itineraries)
    |> Enum.random()
    |> TripPlan.Map.itinerary_map()
  end

  # Get the itinerary map at the given index and convert it to lines.
  defp itinerary_groups_to_lines(itinerary_groups, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(index)
    |> TripPlan.Map.get_lines()
  end

  # Get the itinerary map at the given index and convert it to points.
  defp itinerary_groups_to_points(itinerary_groups, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(index)
    |> TripPlan.Map.get_points()
  end

  # Round the datetime to the nearest 5 minutes if:
  #
  # - The datetime type is not 'now'
  # - The datetime is before the nearest 5 minutes
  #
  # We standardize the datetime because it could be a NaiveDateTime or a DateTime or nil.
  defp maybe_round_datetime(socket) do
    datetime =
      socket.assigns.input_form.changeset.changes
      |> Map.get(:datetime)
      |> standardize_datetime()

    datetime_type = socket.assigns.input_form.changeset.changes.datetime_type
    future = nearest_5_minutes()

    if datetime_type != "now" && Timex.before?(datetime, future) do
      push_event(socket, "set-datetime", %{datetime: future})
    else
      socket
    end
  end

  # Check the input form change set for validity and submit the form if it is.
  defp maybe_submit_form(socket) do
    if socket.assigns.input_form.changeset.valid? do
      submit_changeset(socket, socket.assigns.input_form.changeset)
    else
      socket
    end
  end

  # Round the current time to the nearest 5 minutes.
  defp nearest_5_minutes do
    datetime = Timex.now("America/New_York")
    minutes = datetime.minute
    rounded_minutes = Float.ceil(minutes / 5) * 5
    added_minutes = Kernel.trunc(rounded_minutes - minutes)

    Timex.shift(datetime, minutes: added_minutes)
  end

  # Convert query parameters to a changeset for the input form.
  # Use an anti corruption layer to convert old query parameters to new ones.
  defp query_params_to_changeset(params) do
    %{
      "datetime" => Timex.now("America/New_York"),
      "datetime_type" => "now",
      "modes" => InputForm.initial_modes()
    }
    |> Map.merge(AntiCorruptionLayer.convert_old_params(params))
    |> InputForm.changeset()
  end

  # Destructure the latitude and longitude from a map to a GeoJSON array.
  defp to_geojson(%{longitude: longitude, latitude: latitude}) do
    [longitude, latitude]
  end

  defp to_geojson(_) do
    []
  end

  # Convert a NaiveDateTime to a DateTime in the America/New_York timezone.
  defp standardize_datetime(%NaiveDateTime{} = datetime) do
    Timex.to_datetime(datetime, "America/New_York")
  end

  # The lack of a datetime means we should use the nearest 5 minutes.
  defp standardize_datetime(nil), do: nearest_5_minutes()

  # If the datetime is already a DateTime, we don't need to do anything.
  defp standardize_datetime(datetime), do: datetime

  # Set an action on the changeset and submit it.
  #
  # - Update the input form state with the new changeset
  # - Update the map state with the new pins
  # - Set the results state to loading
  # - Start an async operation to get the itinerary groups
  defp submit_changeset(socket, changeset) do
    new_changeset = Map.put(changeset, :action, :submit)

    socket
    |> assign(:input_form, Map.put(@state.input_form, :changeset, new_changeset))
    |> assign(:map, Map.put(@state.map, :pins, input_form_to_pins(new_changeset)))
    |> assign(:results, Map.put(@state.results, :loading?, true))
    |> start_async("get_itinerary_groups", fn -> get_itinerary_groups(new_changeset) end)
  end
end
