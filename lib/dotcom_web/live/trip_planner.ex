defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.TripPlanner.{InputForm, Results, ResultsSummary}
  import DotcomWeb.Router.Helpers, only: [live_path: 2]

  alias Dotcom.TripPlan
  alias Dotcom.TripPlan.{AntiCorruptionLayer, InputForm, ItineraryGroup, ItineraryGroups}

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
  When the live view first loads, there are three possible scenarios:

  1. There are no query params. We go to step (2) and use the default params.
  2. There are query params representing the old structure of the trip planner form. We convert these, encode them, and redirect to (3).
  3. The new `?plan=ENCODED` query param is present. We decode it and mount the form with the decoded values.
  """
  def mount(%{"plan" => plan}, _session, socket) when is_binary(plan) do
    changeset = plan |> AntiCorruptionLayer.decode() |> InputForm.changeset()

    %{params: params} = changeset

    params_with_datetime =
      params
      |> add_datetime_if_needed(params)

    new_socket =
      socket
      |> assign(@state)
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> update_datepicker(params_with_datetime)
      |> submit_changeset(changeset)

    {:ok, new_socket}
  end

  def mount(params, _session, socket) do
    converted_params = AntiCorruptionLayer.convert_old_params(params)

    new_socket = navigate_state(socket, converted_params)

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
    <h1>Trip Planner</h1>
    <div>
      <.input_form class="mb-4" changeset={@input_form.changeset} />
      <div>
        <.results_summary class="mt-2 mb-6" changeset={@input_form.changeset} results={@results} />
        <div class={[
          "flex flex-col-reverse gap-4 md:flex-row md:gap-7"
        ]}>
          <.results
            :if={Enum.count(@results.itinerary_groups) > 0 || @results.loading?}
            class="md:max-w-[25rem] md:sticky md:top-4"
            results={@results}
          />
          <.live_component
            module={MbtaMetro.Live.Map}
            id="trip-planner-map"
            class={[
              "md:sticky md:top-4",
              "h-64 md:h-[32rem] w-full",
              @results.itinerary_group_selection == nil && "hidden md:block",
              @results.itinerary_group_selection != nil && "block"
            ]}
            config={@map.config}
            lines={@map.lines}
            pins={@map.pins}
            points={@map.points}
          />
        </div>
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
  # Triggered when we cannot connect to OTP, or we receive a timeout error.
  def handle_async(
        "get_itinerary_groups",
        {:ok, {:error, %Req.TransportError{reason: _reason}}},
        socket
      ) do
    message =
      Application.get_env(
        :open_trip_planner_client,
        :fallback_error_message,
        "Cannot connect to OpenTripPlanner. Please try again later."
      )

    new_socket = assign(socket, :results, Map.put(@state.results, :error, message))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered by OTP errors, we combine them into a single error message and add it to the results state.
  def handle_async("get_itinerary_groups", {:ok, {:error, errors}}, socket)
      when is_list(errors) do
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
  # - Store the state of the form in the URL
  # - Update the input form state with the new changeset
  # - Update the map state with the new pins
  # - Reset the results state
  def handle_event(
        "input_form_change",
        %{"input_form" => params},
        %{assigns: %{input_form: %{changeset: %{params: previous_params}}}} = socket
      ) do
    params_with_datetime =
      previous_params
      |> Map.merge(params)
      |> add_datetime_if_needed(previous_params)

    changeset = InputForm.changeset(params_with_datetime)

    pins = input_form_to_pins(changeset)

    new_socket =
      socket
      |> patch_state(params_with_datetime)
      |> assign(:input_form, Map.put(@state.input_form, :changeset, changeset))
      |> assign(:map, Map.put(@state.map, :pins, pins))
      |> update_datepicker(params_with_datetime)
      |> submit_changeset(changeset)

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

    new_map = %{
      lines: [],
      points: []
    }

    new_socket =
      socket
      |> assign(:results, Map.merge(socket.assigns.results, new_results))
      |> assign(:map, Map.merge(socket.assigns.map, new_map))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user selects a particular itinerary
  #
  # - Update the itinerary selection
  def handle_event("select_itinerary", %{"index" => index}, socket) do
    index = String.to_integer(index)

    new_map = %{
      lines:
        itinerary_groups_to_lines(
          socket.assigns.results.itinerary_groups,
          socket.assigns.results.itinerary_group_selection,
          index
        ),
      points:
        itinerary_groups_to_points(
          socket.assigns.results.itinerary_groups,
          socket.assigns.results.itinerary_group_selection,
          index
        )
    }

    new_socket =
      socket
      |> assign(:results, Map.put(socket.assigns.results, :itinerary_selection, index))
      |> assign(:map, Map.merge(socket.assigns.map, new_map))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user selects a particular itinerary group
  #
  # - Update the itinerary group selection
  # - Update the map state with the new lines and points
  def handle_event(
        "select_itinerary_group",
        %{"index" => group_index},
        %{
          assigns: %{
            results: %{itinerary_groups: itinerary_groups}
          }
        } = socket
      ) do
    group_index = String.to_integer(group_index)

    %ItineraryGroup{representative_index: representative_index} =
      Enum.at(itinerary_groups, group_index)

    new_map = %{
      lines:
        itinerary_groups_to_lines(
          itinerary_groups,
          group_index,
          representative_index
        ),
      points:
        itinerary_groups_to_points(
          itinerary_groups,
          group_index,
          representative_index
        )
    }

    new_results = %{
      itinerary_group_selection: group_index,
      itinerary_selection: representative_index
    }

    new_socket =
      socket
      |> assign(:results, Map.merge(socket.assigns.results, new_results))
      |> assign(:map, Map.merge(socket.assigns.map, new_map))

    {:noreply, new_socket}
  end

  @impl true
  # Triggered when the user clicks the button to swap to "from" and "to" data
  #
  # - Passes the changed form data to the input_form_change event
  # - Dispatches a "set-query" event that is used by the AlgoliaAutocomplete
  #   hook to update the displayed value of the location search box. This
  #   reconciles a mismatch which happens when the user switches the origin and
  #   destination values.
  def handle_event(
        "swap_direction",
        _params,
        %{assigns: %{input_form: %{changeset: changeset}}} = socket
      ) do
    new_to = Map.get(changeset.changes, :from) |> location_data_from_changeset()
    new_from = Map.get(changeset.changes, :to) |> location_data_from_changeset()

    if new_to != new_from do
      changes = %{"to" => new_to, "from" => new_from}
      new_socket = push_event(socket, "set-query", changes)
      handle_event("input_form_change", %{"input_form" => changes}, new_socket)
    else
      {:noreply, socket}
    end
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

  @impl true
  # We have to handle the result of the push_patch, but we ignore it.
  def handle_params(_params, _uri, socket) do
    {:noreply, socket}
  end

  # If we **switch** from 'now' to 'depart at' or 'arrive by', we need to update the datetime to the nearest 5 minutes.
  # We default the datetime to `Timex.now/1` if the type is 'now'.
  # Otherwise, we keep the datetime the user set.
  defp add_datetime_if_needed(params, %{"datetime_type" => "now"} = _previous_params) do
    params |> Map.put("datetime", nearest_5_minutes())
  end

  defp add_datetime_if_needed(%{"datetime_type" => "now"} = params, _previous_params) do
    params |> Map.put("datetime", Timex.now("America/New_York"))
  end

  defp add_datetime_if_needed(params, _previous_params) do
    params
  end

  # Run an OTP plan on the changeset data and return itinerary groups or an error.
  defp get_itinerary_groups(%Ecto.Changeset{valid?: true} = changeset) do
    {:ok, data} = Ecto.Changeset.apply_action(changeset, :submit)

    case Dotcom.TripPlan.OpenTripPlanner.plan(data) do
      {:ok, itineraries} ->
        ItineraryGroups.from_itineraries(itineraries,
          take_from_end: data.datetime_type == "arrive_by"
        )

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
  defp itinerary_groups_to_itinerary_map(itinerary_groups, group_index, index) do
    itinerary_groups
    |> Enum.at(group_index)
    |> Map.get(:itineraries)
    |> Enum.at(index)
    |> TripPlan.Map.itinerary_map()
  end

  # Get the itinerary map at the given index and convert it to lines.
  defp itinerary_groups_to_lines(itinerary_groups, group_index, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(group_index, index)
    |> TripPlan.Map.get_lines()
  end

  # Get the itinerary map at the given index and convert it to points.
  defp itinerary_groups_to_points(itinerary_groups, group_index, index) do
    itinerary_groups
    |> itinerary_groups_to_itinerary_map(group_index, index)
    |> TripPlan.Map.get_points()
  end

  # For the from or to fields, get the underlying location data if changed
  defp location_data_from_changeset(%Ecto.Changeset{changes: changes}) when changes != %{} do
    changes
  end

  defp location_data_from_changeset(_), do: %{}
  # Encode params and set them in the URL while navigating to it.
  defp navigate_state(socket, params) do
    encoded = AntiCorruptionLayer.encode(params)
    path = live_path(socket, __MODULE__)

    push_navigate(socket, to: "#{path}?plan=#{encoded}")
  end

  # Round the current time to the nearest 5 minutes.
  defp nearest_5_minutes do
    datetime = Timex.now("America/New_York")
    minutes = datetime.minute
    rounded_minutes = Float.ceil(minutes / 5) * 5
    added_minutes = Kernel.trunc(rounded_minutes - minutes)

    Timex.shift(datetime, minutes: added_minutes)
  end

  # Encode params and set them in the URL while patching the browser history.
  defp patch_state(socket, params) do
    encoded = AntiCorruptionLayer.encode(params)
    path = live_path(socket, __MODULE__)

    push_patch(socket, to: "#{path}?plan=#{encoded}")
  end

  # Set an action on the changeset and submit it.
  #
  # - Update the input form state with the new changeset
  # - Update the map state with the new pins
  # - If the changeset is valid:
  #   - Set the results state to loading
  #   - Start an async operation to get the itinerary groups
  defp submit_changeset(socket, changeset) do
    new_changeset = Map.put(changeset, :action, :submit)

    new_socket =
      socket
      |> assign(:results, @state.results)
      |> assign(:input_form, Map.put(@state.input_form, :changeset, new_changeset))
      |> assign(:map, Map.put(@state.map, :pins, input_form_to_pins(new_changeset)))

    if new_changeset.valid? do
      new_socket
      |> assign(:results, Map.put(@state.results, :loading?, true))
      |> start_async("get_itinerary_groups", fn -> get_itinerary_groups(new_changeset) end)
    else
      new_socket
    end
  end

  # Destructure the latitude and longitude from a map to a GeoJSON array.
  defp to_geojson(%{longitude: longitude, latitude: latitude}) do
    [longitude, latitude]
  end

  defp to_geojson(_) do
    []
  end

  # Send an event that will get picked up by the datepicker component
  # so that the datepicker renders the correct datetime.
  #
  # Does nothing if there's no datetime in the params.
  defp update_datepicker(socket, %{"datetime" => datetime}) do
    push_event(socket, "set-datetime", %{datetime: datetime})
  end

  defp update_datepicker(socket, %{}) do
    socket
  end
end
