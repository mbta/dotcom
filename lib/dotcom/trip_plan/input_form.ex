defmodule Dotcom.TripPlan.InputForm do
  @moduledoc """
  Describes the inputs users can fill to request trip plans.

  At minimum, this requires two locations.
  """

  use Dotcom.Gettext.Sigils
  use TypedEctoSchema

  import Ecto.Changeset

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  @primary_key false
  typed_embedded_schema do
    embeds_one(:from, __MODULE__.Location)
    embeds_one(:to, __MODULE__.Location)
    embeds_one(:modes, __MODULE__.Modes)
    field(:datetime_type, :string)
    field(:datetime, :utc_datetime)
    field(:wheelchair, :boolean)
  end

  def initial_modes do
    __MODULE__.Modes.fields()
    |> Enum.map(&{Atom.to_string(&1), "true"})
    |> Map.new()
  end

  def changeset(params \\ %{}) do
    changeset(%__MODULE__{}, params)
  end

  def changeset(form, params) do
    form
    |> cast(params, [:datetime, :datetime_type, :wheelchair])
    |> cast_embed(:from, required: true)
    |> cast_embed(:to, required: true)
    |> validate_change(:from, &validate_location_change/2)
    |> validate_change(:to, &validate_location_change/2)
    |> cast_embed(:modes, required: true)
    |> validate_required(:modes, message: error_message(:modes))
    |> validate_required([:datetime_type, :wheelchair])
    |> validate_same_locations()
    |> validate_chosen_datetime()
  end

  # These are embedded fields, so we need to check the underlying changeset for
  # validity. If the underlying data has changed (there are four fields, but
  # checking :name itself suffices), and the changeset is invalid, add an error.
  defp validate_location_change(
         field,
         %Ecto.Changeset{valid?: false, errors: [_ | _]} = changeset
       ) do
    if changed?(changeset, :name) do
      Keyword.new([{field, error_message(field)}])
    else
      []
    end
  end

  defp validate_location_change(_, _), do: []

  defp validate_same_locations(changeset) do
    with from_change when not is_nil(from_change) <- get_change(changeset, :from),
         true <- from_change.valid?,
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

  defp validate_chosen_datetime(changeset) do
    case get_field(changeset, :datetime_type) do
      "now" ->
        force_change(changeset, :datetime, @date_time_module.now())

      _ ->
        changeset
        |> validate_required([:datetime], message: error_message(:datetime))
        |> validate_change(:datetime, &validate_datetime/2)
    end
  end

  defp validate_datetime(field, datetime) do
    if DateTime.diff(datetime, @date_time_module.now(), :minute) < 0 do
      [{field, error_message(:datetime)}]
    else
      []
    end
  end

  def error_message(:from), do: ~t"Please select an origin location."

  def error_message(:from_to_same),
    do: ~t"Please select a destination at a different location from the origin."

  def error_message(:modes), do: ~t"Please select at least one mode of transit."

  def error_message(:datetime),
    do: ~t"Please specify a date and time in the future or select 'Now'."

  def error_message(:to), do: ~t"Please select a destination location."
  def error_message(_), do: nil

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

  defmodule Modes do
    @moduledoc """
    Represents the set of modes to be selected for a trip plan, additionally
    validating that at least one mode is selected. Also provides helper
    functions for rendering in forms.
    """

    use Dotcom.Gettext.Sigils
    use TypedEctoSchema

    alias Ecto.Changeset
    alias OpenTripPlannerClient.PlanParams

    @primary_key false
    typed_embedded_schema do
      field(:RAIL, :boolean, default: false)
      field(:SUBWAY, :boolean, default: false)
      field(:BUS, :boolean, default: false)
      field(:FERRY, :boolean, default: false)
    end

    def fields, do: __MODULE__.__schema__(:fields)

    def changeset(modes, params) do
      modes
      |> cast(params, fields())
      |> validate_at_least_one()
    end

    defp validate_at_least_one(changeset) do
      if Enum.all?(fields(), &(get_change(changeset, &1) == false)) do
        add_error(changeset, :FERRY, "")
      else
        changeset
      end
    end

    @doc """
    Translates a mode atom into a short string.
    """
    def mode_label(:RAIL), do: ~t"Commuter Rail"
    def mode_label(:TRAM), do: ~t"Subway"
    def mode_label(:SUBWAY), do: ~t"Subway"
    def mode_label(:BUS), do: ~t"Bus"
    def mode_label(:FERRY), do: ~t"Ferry"
    def mode_label(mode), do: Phoenix.Naming.humanize(mode)

    def selected_mode_keys(%__MODULE__{} = modes) do
      modes
      |> Map.from_struct()
      |> Enum.reject(&(elem(&1, 1) == false))
      |> Enum.map(&elem(&1, 0))
    end

    @doc """
    Summarizes the selected mode values into a single short string.
    """
    def selected_modes(%Changeset{} = modes_changeset) do
      modes_changeset
      |> Changeset.apply_changes()
      |> selected_modes()
    end

    def selected_modes(%__MODULE__{} = modes) do
      modes
      |> selected_mode_keys()
      |> selected_modes()
    end

    def selected_modes(%{RAIL: true, SUBWAY: true, BUS: true, FERRY: true}), do: ~t"All modes"

    def selected_modes(%{}), do: ~t"Walking directions only"
    def selected_modes([mode]), do: gettext("%{mode_label} Only", mode_label: mode_label(mode))

    def selected_modes([]), do: ~t"Walking directions only"

    def selected_modes(modes) do
      if fields() -- modes == [] do
        ~t"All modes"
      else
        fields()
        |> Enum.filter(&(&1 in modes))
        |> summarized_modes()
      end
    end

    defp summarized_modes([]), do: ~t"No transit modes selected"

    defp summarized_modes([mode1, mode2]) do
      gettext("%{mode1} and %{mode2}", mode1: mode_label(mode1), mode2: mode_label(mode2))
    end

    defp summarized_modes(modes) do
      modes
      |> Enum.map(&mode_label/1)
      |> Cldr.List.to_string!()
    end
  end
end
