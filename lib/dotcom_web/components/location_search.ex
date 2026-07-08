defmodule DotcomWeb.Components.LocationSearch do
  @moduledoc """
  A live component that renders a date picker using Flatpickr.

  You must pass in the following assigns:

    * `:id`
    * `:field` - A form field struct retrieved from a form, for example: @form[:datetime].
    * `:label`

  You can optionally pass in a `:config` map:
    * `:default_date` - The default date that should be selected.
    * `:enable_time` - A boolean that determines if the time picker should be enabled.
    * `:locale` - A two letter localization code like "es" or "zh."
    * `:max_date` - The maximum date that can be selected.
    * `:min_date` - The minimum date that can be selected.
  """

  use Phoenix.LiveComponent

  @mockResults [
    %{
      name: "Park Street",
      stop_id: "place-prktm",
      lat: 42,
      lon: -71,
      features: [],
      city: "Boston",
      state: "MA"
    }
  ]
  def mount(socket) do
    config = Map.get(socket.assigns, :config, %{})
    {locale, new_config} = Map.pop(config, :locale, "en")

    new_socket =
      assign(socket, config: new_config, locale: locale)
      |> assign(:name, nil)
      |> assign(:lat, nil)
      |> assign(:lon, nil)
      |> assign(:stop_id, nil)
      |> assign(:query, nil)
      |> assign(:value, nil)
      |> assign(:results, [])

    {:ok, new_socket}
  end

  @doc """
  Renders the date picker component.
  """
  def render(assigns) do
    dbg(assigns.value)

    ~H"""
    <div class="location_search--container">
      <input
        value={@value}
        name={@name}
        phx-change="query"
        id={@id}
        phx-target={@myself}
      />
      <div class="location_search--results_list" id={@id<>"--results"}>
        <ul :if={@results |> Enum.count() > 0}>
          <li
            :for={result <- @results}
            phx-click={Phoenix.LiveView.JS.push("choose", value: result)}
            phx-target={@myself}
          >
            {result.name}
          </li>
        </ul>
      </div>
    </div>
    """
  end

  def handle_event("query", %{"input_form" => %{"to" => value}}, socket) do
    {:noreply,
     socket
     |> assign(:query, value)
     |> assign(:value, value)
     |> assign(:results, @mockResults)}
  end

  def handle_event("query", %{"input_form" => %{"from" => value}}, socket) do
    {:noreply,
     socket
     |> assign(:query, value)
     |> assign(:value, value)
     |> assign(:results, @mockResults)}
  end

  def assign_params(socket, params) do
    socket
    |> assign(:value, params["name"])
    |> assign(:lat, params["lat"])
    |> assign(:lon, params["lon"])
    |> assign(:stop_id, params["stop_id"])
  end

  def handle_event("choose", params, socket) do
    dbg(params)
    {:noreply, socket |> assign(:results, []) |> assign_params(params)}
  end

  def handle_event(event, params, socket) do
    dbg({event, params})
    {:noreply, socket}
  end
end
