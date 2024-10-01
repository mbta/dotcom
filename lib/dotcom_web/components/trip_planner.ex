defmodule DotcomWeb.Components.TripPlannerForm do
  @moduledoc """
  Reusable components mainly used for the Trip Planner
  """
  use DotcomWeb, :component

  alias Dotcom.TripPlan.InputForm
  alias MbtaMetro.Components.Button

  attr :id, :string
  attr :params, :map, default: %{}
  attr :phx_submit_handler, :string, default: nil
  attr :on_validated_pid, :any

  attr :do_validation, :boolean,
    default: false,
    doc: "Whether to run the form validation on render."

  @doc """
  A form to plan trips. Use in a LiveView and specify the phx-action:

  ``` <.TripPlanner.input_form params={%{}} id="widget" phx_submit_handler="my_form_save_event" /> ```

  With no phx-action provided, we'll assume we're outside a LiveView, and will
  use an action to submit to the trip planner page.
  """
  def input_form(assigns) do
    assigns =
      assigns
      |> assign(:action, assign_action(assigns))
      |> assign(:form, create_form(assigns))
      |> assign(:location_keys, InputForm.Location.fields())

    ~H"""
    <.form
      :let={f}
      for={@form}
      action={@action}
      method="get"
      phx-change="input_change"
      phx-submit={@phx_submit_handler}
    >
      <div :for={field <- [:from, :to]} class="mb-1">
        <.algolia_autocomplete
          config_type="trip-planner"
          placeholder="Enter a location"
          id={"#{@id}--#{field}"}
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
          <p :for={{msg, _} <- f[field].errors} :if={@do_validation} class="text-danger u-bold">
            <%= msg %>
          </p>
        </.algolia_autocomplete>
      </div>
      <Button.button color="green" type="submit">
        Get trip suggestions
      </Button.button>
    </.form>
    """
  end

  defp create_form(%{do_validation: true, params: params, on_validated_pid: on_validated_pid})
       when is_pid(on_validated_pid) do
    changeset = InputForm.validate_params(params)

    case Ecto.Changeset.apply_action(changeset, :insert) do
      {:ok, data} ->
        send(on_validated_pid, {:updated_form, data})

        data
        |> InputForm.changeset(%{})
        |> Phoenix.Component.to_form(as: "plan")

      {:error, changeset} ->
        send(on_validated_pid, {:updated_form, nil})
        Phoenix.Component.to_form(changeset, as: "plan")
    end
  end

  defp create_form(%{params: params}) do
    params
    |> InputForm.changeset()
    |> Phoenix.Component.to_form(as: "plan")
  end

  defp assign_action(%{phx_submit_handler: handler}) when is_nil(handler),
    do: "/preview/trip-planner"

  defp assign_action(_), do: nil
end
