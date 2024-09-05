defmodule DotcomWeb.Live.Components.TripPlanner.InputForm do
  @moduledoc """
  A form to plan trips. Use in a LiveView and specify the phx-action:

  ``` <.TripPlanner.input_form /> ```

  With no phx-action provided, we'll assume we're outside a LiveView, and will
  use an action to submit to the trip planner page.
  """
  use DotcomWeb, :live_component

  alias TripPlanner.InputForm

  @impl true
  def mount(socket) do
    form =
      %InputForm{}
      |> Ecto.Changeset.change()
      |> to_form()

    {:ok, assign(socket, %{form: form, location_keys: InputForm.Location.fields()})}
  end

  @impl true
  def render(assigns) do
    ~H"""
    <section>
      <.form
        :let={f}
        for={@form}
        method="get"
        phx-change="input_change"
        phx-submit="save_form"
        phx-target={@myself}
      >
        <div :for={field <- [:from, :to]} class="mb-1">
          <.algolia_autocomplete
            config_type="trip-planner"
            placeholder="Enter a location"
            id={"#{@form_name}--#{field}"}
          >
            <.inputs_for :let={location_f} field={f[field]} skip_hidden={true}>
              <input
                :for={subfield <- @location_keys}
                type="hidden"
                class="location-input"
                id={location_f[subfield].id}
                value={location_f[subfield].value}
                name={location_f[subfield].name}
              />
            </.inputs_for>
            <p :for={{msg, _} <- f[field].errors} class="text-danger u-bold">
              <%= msg %>
            </p>
          </.algolia_autocomplete>
        </div>
        <button type="submit" class="btn btn-primary">
          Get trip suggestions
        </button>
      </.form>
    </section>
    """
  end

  @impl true
  def handle_event("input_change", params, socket) do
    # e.g. if @form.errors[:from] exists but this change event is target "_target" => ["input_form", "from", "stop_id"], eagerly revalidate to give the UI a chance to confirm before re-submitting.
    # IO.inspect(params, label: "Try to remove error")
    # IO.inspect(socket.assigns, label: "assigns")
    {:noreply, socket}
  end

  @impl true
  def handle_event("save_form", %{"input_form" => params}, socket) do
    form = validate_form(params)
    {:noreply, assign(socket, %{form: form})}
  end

  defp validate_form(params) do
    changeset = InputForm.validate_params(params)

    case Ecto.Changeset.apply_action(changeset, :insert) do
      {:ok, data} ->
        send(self(), {:updated_form, data})

        data
        |> InputForm.changeset(%{})
        |> Phoenix.Component.to_form()

      {:error, changeset} ->
        send(self(), {:updated_form, nil})
        Phoenix.Component.to_form(changeset)
    end
  end
end
