defmodule DotcomWeb.LiveComponents.TripPlannerLocationAutocomplete do
  @moduledoc """
  A LiveView-enhanced wrapper for `<.algolia_autocomplete />` for searching for trip planner locations

  <.live_component
    module={TripPlannerLocationAutocomplete}
    id="thing"
  />
  """

  use DotcomWeb, :live_component

  alias Dotcom.TripPlan.InputForm

  @impl true
  def mount(socket) do
    {:ok, socket}
  end

  @impl true
  def update(assigns, socket) do
    # IO.inspect(assigns.field, label: "the field")

    {:ok, socket |> assign(assigns) |> assign(:field_name, assigns.field.field)}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <div id={"#{@id}--autocomplete"}>
      <.algolia_autocomplete config_type="trip-planner" placeholder="Enter a location" id={@id}>
        <.inputs_for :let={location_f} field={@field} skip_hidden={true}>
          <input
            :for={subfield <- InputForm.Location.fields()}
            class="location-input"
            id={location_f[subfield].id}
            value={location_f[subfield].value}
            name={location_f[subfield].name}
          />
        </.inputs_for>
      </.algolia_autocomplete>
    </div>
    """
  end

  @impl true
  def handle_event("autocomplete_change", nil, %{assigns: %{field_name: field_name}} = socket) do
    # dbg("AUTO_COMPLETE CHANGE BUT WITH BNILL")
    send(self(), {:autocomplete_change, %{location: nil, field_name: field_name}})

    # IO.puts("CLEAR OUT THE INPUT HERE")
    {:noreply, socket}
  end

  def handle_event("autocomplete_change", params, %{assigns: %{field_name: field_name}} = socket) do
    # dbg("AUTO_COMPLETE CHANGE")
    # dbg(params)

    # %Dotcom.TripPlan.InputForm.Location{latitude: 42.365396, longitude: -71.017547, name: "Boston Logan Airport", stop_id: nil}
    # with %InputForm.Location{} = data <- location(params) do
    #   data
    #   |> Phoenix.Component.to_form()
    #   |> dbg()
    # end

    send(self(), {:autocomplete_change, %{location: location(params), field_name: field_name}})

    {:noreply, socket}
  end

  def handle_event(event, params, socket) do
    # IO.inspect({event, params}, label: "COMPONENT: Fallback handle_event")
    # dbg({event, params})

    {:noreply, socket}
  end

  defp location(params) do
    params
    |> location_params()

    # |> InputForm.Location.changeset()
    # |> Ecto.Changeset.apply_changes()
  end

  defp location_params(%{"formatted" => name, "latitude" => latitude, "longitude" => longitude}) do
    %{"name" => name, "latitude" => latitude, "longitude" => longitude, "stop_id" => nil}
  end

  defp location_params(%{
         "stop" => %{
           "id" => stop_id,
           "name" => name,
           "latitude" => latitude,
           "longitude" => longitude
         }
       }) do
    %{"name" => name, "latitude" => latitude, "longitude" => longitude, "stop_id" => stop_id}
  end

  defp location_params(params) do
    %{"name" => nil, "latitude" => nil, "longitude" => nil, "stop_id" => nil}
    |> Map.merge(params)
    |> Map.take(["name", "latitude", "longitude", "stop_id"])
  end
end
