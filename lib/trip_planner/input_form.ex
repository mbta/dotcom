defmodule TripPlanner.InputForm do
  @moduledoc """
  Describes the inputs users can fill to request trip plans.

  At minimum, this requires two locations.
  """

  use TypedEctoSchema
  import Ecto.Changeset

  @primary_key false
  typed_embedded_schema do
    embeds_one(:from, __MODULE__.Location)
    embeds_one(:to, __MODULE__.Location)
  end

  def changeset(params \\ %{}) do
    changeset(%__MODULE__{}, params)
  end

  def changeset(input_form, params) do
    input_form
    |> cast(params, [])
    |> cast_embed(:from, required: true)
    |> cast_embed(:to, required: true)
  end

  def validate_params(params) do
    changes =
      params
      |> changeset()
      |> update_change(:from, &update_location_change/1)
      |> update_change(:to, &update_location_change/1)
      |> validate_required(:from, message: "Please specify an origin location.")
      |> validate_required(:to, message: "Please add a destination.")
      |> validate_same_locations()

    if changes.errors == [] do
      changes
    else
      %Ecto.Changeset{changes | action: :update}
    end
  end

  # make the parent field blank if the location isn't valid
  defp update_location_change(%Ecto.Changeset{valid?: false, errors: [_ | _]}), do: nil
  defp update_location_change(changeset), do: changeset

  defp validate_same_locations(changeset) do
    with from_change when not is_nil(from_change) <- get_change(changeset, :from),
         to_change when to_change === from_change <- get_change(changeset, :to) do
      add_error(
        changeset,
        :to,
        "Please select a destination at a different location from the origin."
      )
    else
      _ ->
        changeset
    end
  end

  defmodule Location do
    @moduledoc """
    Represents a location for requesting a trip plan. At minimum, coordinates
    are required. A stop_id is expected to be associated with an MBTA GTFS stop.
    If a name is not provided, one can be created based on the coordinates.
    """

    use TypedEctoSchema

    @primary_key false
    typed_embedded_schema do
      field(:latitude, :float, null: false)
      field(:longitude, :float, null: false)
      field(:name, :string)
      field(:stop_id, :string) :: Stops.Stop.id_t()
    end

    def changeset(struct \\ %__MODULE__{}, params \\ %{}) do
      struct
      |> cast(params, [:latitude, :longitude, :name, :stop_id])
      |> add_default_name()
      |> validate_required([:latitude, :longitude])
    end

    defp add_default_name(changeset) do
      struct = apply_changes(changeset)

      if is_nil(struct.name) and not is_nil(struct.latitude) and not is_nil(struct.longitude) do
        put_change(changeset, :name, "#{struct.latitude}, #{struct.longitude}")
      else
        changeset
      end
    end
  end
end
