defmodule Dotcom.TripPlan.InputForm do
  @moduledoc """
  Describes the inputs users can fill to request trip plans.

  At minimum, this requires two locations.
  """

  use TypedEctoSchema

  import Ecto.Changeset

  alias OpenTripPlannerClient.PlanParams

  @error_messages %{
    from: "Please select an origin location.",
    from_to_same: "Please select a destination at a different location from the origin.",
    modes: "Please select at least one mode of transit.",
    datetime: "Please specify a date and time in the future or select 'Now'.",
    to: "Please select a destination location."
  }

  @primary_key false
  typed_embedded_schema do
    embeds_one(:from, __MODULE__.Location)
    embeds_one(:to, __MODULE__.Location)
    embeds_one(:modes, __MODULE__.Modes)
    field(:datetime_type, :string)
    field(:datetime, :naive_datetime)
    field(:wheelchair, :boolean)
  end

  def initial_modes do
    __MODULE__.Modes.fields()
    |> Enum.map(&{Atom.to_string(&1), "true"})
    |> Map.new()
  end

  def to_params(%__MODULE__{
        from: from,
        to: to,
        datetime_type: datetime_type,
        datetime: datetime,
        modes: modes
      }) do
    %{
      fromPlace: PlanParams.to_place_param(from),
      toPlace: PlanParams.to_place_param(to),
      arriveBy: datetime_type == "arrive_by",
      date: PlanParams.to_date_param(datetime),
      numItineraries: 100,
      time: PlanParams.to_time_param(datetime),
      transportModes: __MODULE__.Modes.selected_mode_keys(modes) |> PlanParams.to_modes_param(),
      wheelchair: true
    }
    |> PlanParams.new()
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
        force_change(changeset, :datetime, Util.now())

      _ ->
        changeset
        |> validate_required([:datetime], message: error_message(:datetime))
        |> validate_change(:datetime, &validate_datetime/2)
    end
  end

  defp validate_datetime(field, date) do
    date
    |> DateTime.from_naive!("America/New_York")
    |> then(fn datetime ->
      case Timex.compare(datetime, Util.now(), :minutes) do
        -1 -> [{field, error_message(:datetime)}]
        _ -> []
      end
    end)
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

  defmodule Modes do
    @moduledoc """
    Represents the set of modes to be selected for a trip plan, additionally
    validating that at least one mode is selected. Also provides helper
    functions for rendering in forms.
    """

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
    @spec mode_label(PlanParams.mode_t()) :: String.t()
    def mode_label(:RAIL), do: "Commuter rail"
    def mode_label(mode), do: Phoenix.Naming.humanize(mode)

    @spec selected_mode_keys(__MODULE__.t()) :: [PlanParams.mode_t()]
    def selected_mode_keys(%__MODULE__{} = modes) do
      modes
      |> Map.from_struct()
      |> Enum.reject(&(elem(&1, 1) == false))
      |> Enum.map(&elem(&1, 0))
    end

    @doc """
    Summarizes the selected mode values into a single short string.
    """
    @spec selected_modes(Changeset.t() | __MODULE__.t() | [PlanParams.mode_t()]) :: String.t()
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

    def selected_modes(%{RAIL: true, SUBWAY: true, BUS: true, FERRY: true}), do: "All modes"

    def selected_modes(%{}), do: "Walking directions only"
    def selected_modes([mode]), do: mode_name(mode) <> " Only"

    def selected_modes([]), do: "Walking directions only"

    def selected_modes(modes) do
      if fields() -- modes == [] do
        "All modes"
      else
        fields()
        |> Enum.filter(&(&1 in modes))
        |> summarized_modes()
      end
    end

    defp summarized_modes([]), do: "No transit modes selected"

    defp summarized_modes([mode1, mode2]) do
      mode_name(mode1) <> " and " <> mode_name(mode2)
    end

    defp summarized_modes(modes) do
      modes
      |> Enum.map(&mode_name/1)
      |> Enum.intersperse(", ")
      |> List.insert_at(-2, "and ")
      |> Enum.join("")
    end

    defp mode_name(mode) do
      case mode do
        :RAIL -> :commuter_rail
        :SUBWAY -> :subway
        :BUS -> :bus
        :FERRY -> :ferry
      end
      |> DotcomWeb.ViewHelpers.mode_name()
    end
  end
end
