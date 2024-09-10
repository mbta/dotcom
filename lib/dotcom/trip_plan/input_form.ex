defmodule Dotcom.TripPlan.InputForm do
  @moduledoc """
  Describes the inputs users can fill to request trip plans.

  At minimum, this requires two locations.
  """

  use TypedEctoSchema
  import Ecto.Changeset

  @error_messages %{
    from: "Please specify an origin location.",
    to: "Please add a destination.",
    from_to_same: "Please select a destination at a different location from the origin."
  }

  @primary_key false
  typed_embedded_schema do
    embeds_one(:from, __MODULE__.Location)
    embeds_one(:to, __MODULE__.Location)
  end

  def changeset(params \\ %{}) do
    changeset(%__MODULE__{}, params)
  end

  def changeset(form, params) do
    form
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
      |> validate_required(:from, message: error_message(:from))
      |> validate_required(:to, message: error_message(:to))
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
        error_message(:from_to_same)
      )
    else
      _ ->
        changeset
    end
  end

  def error_message(key), do: @error_messages[key]

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

    def fields, do: __MODULE__.__schema__(:fields)

    def changeset(form \\ %__MODULE__{}, params \\ %{}) do
      form
      |> cast(params, [:latitude, :longitude, :name, :stop_id])
      |> validate_required([:latitude, :longitude])
      |> add_default_name()
    end

    defp add_default_name(changeset) do
      has_name? = changed?(changeset, :name) || not is_nil(changeset.data.name)

      if not has_name? and (changed?(changeset, :latitude) or changed?(changeset, :longitude)) do
        {_, latitude} = fetch_field(changeset, :latitude)
        {_, longitude} = fetch_field(changeset, :longitude)

        put_change(
          changeset,
          :name,
          "#{latitude}, #{longitude}"
        )
      else
        changeset
      end
    end
  end
end
