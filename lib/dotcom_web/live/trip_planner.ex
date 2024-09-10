defmodule DotcomWeb.Live.TripPlanner do
  @moduledoc """
  The entire Trip Planner experience, including submitting and validating user
  input, querying and parsing results from OpenTripPlanner, and rendering the
  results in a list and map format.
  """

  use DotcomWeb, :live_view

  import DotcomWeb.Components.TripPlannerForm

  @form_id "trip-planner-form"

  @impl true
  def mount(params, _session, socket) do
    pid = self()
    {:ok, assign(socket, :params, plan_params(params)) |> assign(:pid, pid)}
  end

  defp plan_params(%{"plan" => params}), do: params
  defp plan_params(_), do: %{}

  @impl true
  def handle_params(params, _uri, socket) do
    {:noreply, assign(socket, :params, plan_params(params))}
  end

  @impl true
  def render(assigns) do
    assigns =
      assigns
      |> assign_new(:submitted_values, fn -> nil end)
      |> assign_new(:do_validation, fn -> false end)
      |> assign(:form_id, @form_id)

    ~H"""
    <h1>Trip Planner <mark style="font-weight: 400">Preview</mark></h1>
    <div style="row">
      <section class="col-md-12 col-lg-4">
        <.input_form
          params={@params}
          id={@form_id}
          do_validation={@do_validation}
          on_validated_pid={@pid}
          phx_submit_handler="save_form"
        />
        <code :if={@submitted_values}>
          <%= inspect(@submitted_values) %>
        </code>
      </section>
      <div class="col-md-12 col-lg-8">
        <div id="trip-planner-map-wrapper" phx-update="ignore">
          <div style="height: 400px;" id="trip-planner-map" phx-hook="TripPlannerMap" />
        </div>
      </div>
    </div>
    """
  end

  @impl true
  def handle_event("map_change", %{"id" => id} = params, socket) do
    {:noreply, push_event(socket, id, location_props(params))}
  end

  @impl true
  def handle_event("input_change", %{"plan" => params}, socket) do
    merged_params =
      socket.assigns.params
      |> Map.merge(params, fn _, a, b -> Map.merge(a, b) end)

    {:noreply,
     assign(socket, %{
       do_validation: false,
       params: merged_params
     })}
  end

  @impl true
  def handle_event("save_form", %{"plan" => params}, socket) do
    {:noreply,
     socket
     |> assign(:do_validation, true)
     |> push_patch(to: path_with_params(params), replace: true)}
  end

  @impl true
  def handle_event(_, _, socket), do: {:noreply, socket}

  @impl true
  def handle_info({:updated_form, data}, socket) do
    {:noreply, assign(socket, :submitted_values, data)}
  end

  defp path_with_params(params) do
    %{"plan" => params}
    |> Plug.Conn.Query.encode()
    |> then(&("/preview/trip-planner?" <> &1))
  end

  # Selected from list of popular locations
  defp location_props(%{"stop_id" => stop} = props) when is_binary(stop) do
    Map.take(props, ["name", "latitude", "longitude", "stop_id"])
  end

  # GTFS stop
  defp location_props(%{"stop" => stop}) when is_map(stop) do
    Map.take(stop, ["name", "latitude", "longitude"])
    |> Map.put("stop_id", stop["id"])
  end

  # From AWS
  defp location_props(%{"address" => address} = props) do
    Map.take(props, ["latitude", "longitude"])
    |> Map.put_new("name", address)
  end

  # Geolocated
  defp location_props(props) do
    Map.take(props, ["name", "latitude", "longitude"])
  end
end
