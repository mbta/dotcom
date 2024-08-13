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
    %__MODULE__{}
    |> cast(params, [])
    |> cast_embed(:from, required: true)
    |> cast_embed(:to, required: true)
  end

  def validate_params(params) do
    changes =
      params
      |> changeset()
      |> validate_change(:from, &validate_location/2)
      |> validate_change(:to, &validate_location/2)

    # too aggressive e.g. it shows when loading the page.
    if changes.errors == [] do
      changes
    else
      %Ecto.Changeset{changes | action: :update}
    end
  end

  defp validate_location(field, %Ecto.Changeset{valid?: false, errors: [_ | _]}) do
    Keyword.put([], field, "Please enter a location")
  end

  defp validate_location(_, _) do
    []
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
      field(:latitude, :float)
      field(:longitude, :float)
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
