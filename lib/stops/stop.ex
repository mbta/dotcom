defmodule Stops.Stop do
  @moduledoc """
  Domain model for a Stop.
  """
  alias Stops.{Api, Stop}

  @derive {Jason.Encoder, except: [:bike_storage, :fare_facilities]}

  defstruct id: nil,
            parent_id: nil,
            child_ids: [],
            name: nil,
            note: nil,
            accessibility: [],
            address: nil,
            municipality: nil,
            parking_lots: [],
            fare_facilities: [],
            bike_storage: [],
            latitude: nil,
            longitude: nil,
            child?: false,
            station?: false,
            has_fare_machine?: false,
            has_charlie_card_vendor?: false,
            closed_stop_info: nil,
            type: nil,
            platform_name: nil,
            platform_code: nil,
            description: nil,
            zone: nil,
            place_id: nil

  @type id_t :: String.t()

  @type stop_type :: :stop | :station | :entrance | :generic_node

  @type t :: %Stop{
          id: id_t,
          parent_id: id_t | nil,
          child_ids: [id_t],
          name: String.t() | nil,
          note: String.t() | nil,
          accessibility: [String.t()],
          address: String.t() | nil,
          municipality: String.t() | nil,
          parking_lots: [Stop.ParkingLot.t()],
          fare_facilities: MapSet.t(Api.fare_facility()),
          bike_storage: [Api.bike_storage_types()],
          latitude: float,
          longitude: float,
          child?: boolean,
          station?: boolean,
          has_fare_machine?: boolean,
          has_charlie_card_vendor?: boolean,
          closed_stop_info: Stops.Stop.ClosedStopInfo.t() | nil,
          type: stop_type,
          platform_name: String.t() | nil,
          platform_code: String.t() | nil,
          description: String.t() | nil,
          zone: String.t() | nil,
          place_id: String.t() | nil
        }

  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  defimpl Util.Position do
    def latitude(stop), do: stop.latitude
    def longitude(stop), do: stop.longitude
  end

  @doc """
  Returns a boolean indicating whether we know the accessibility status of the stop.
  """
  @spec accessibility_known?(t) :: boolean
  def accessibility_known?(%__MODULE__{accessibility: ["unknown" | _]}), do: false
  def accessibility_known?(%__MODULE__{}), do: true

  @doc """
  Returns a boolean indicating whether we consider the stop accessible.

  A stop can have accessibility features but not be considered accessible.
  """
  @spec accessible?(t) :: boolean
  def accessible?(%__MODULE__{accessibility: ["accessible" | _]}), do: true
  def accessible?(%__MODULE__{}), do: false

  @doc """
  Returns a boolean indicating whether the stop has a known zone
  """
  @spec has_zone?(t | id_t) :: boolean
  def has_zone?(<<id::binary>>) do
    case @stops_repo.get(id) do
      nil -> false
      stop -> has_zone?(stop)
    end
  end

  def has_zone?(%__MODULE__{zone: zone}) when not is_nil(zone), do: true
  def has_zone?(_), do: false
end

defmodule Stops.Stop.ParkingLot do
  @moduledoc """
  A group of parking spots at a Stop.
  """
  @derive Jason.Encoder

  defstruct [
    :id,
    :name,
    :address,
    :capacity,
    :payment,
    :manager,
    :utilization,
    :note,
    :latitude,
    :longitude
  ]

  @type t :: %Stops.Stop.ParkingLot{
          id: String.t(),
          name: String.t(),
          address: String.t(),
          capacity: Stops.Stop.ParkingLot.Capacity.t() | nil,
          payment: Stops.Stop.ParkingLot.Payment.t() | nil,
          manager: Stops.Stop.ParkingLot.Manager.t() | nil,
          utilization: Stops.Stop.ParkingLot.Utilization.t() | nil,
          note: String.t() | nil,
          latitude: float | nil,
          longitude: float | nil
        }
end

defmodule Stops.Stop.ParkingLot.Payment do
  @moduledoc """
  Info about payment for parking at a Stop.
  GTFS Property Mappings:
  :methods - list of payment-form-accepted
  :mobile_app - {payment-app, payment-app-id, payment-app-url}
  :rate - {fee-daily, fee-monthly}
  """
  alias Stops.Stop.ParkingLot.Payment.MobileApp

  @derive Jason.Encoder

  defstruct [:methods, :mobile_app, :daily_rate, :monthly_rate]

  @type t :: %__MODULE__{
          methods: [String.t()],
          mobile_app: MobileApp.t() | nil,
          daily_rate: String.t() | nil,
          monthly_rate: String.t() | nil
        }

  @spec parse(map) :: t
  def parse(props) do
    %__MODULE__{
      methods: Map.get(props, "payment-form-accepted", []),
      mobile_app: Stops.Helpers.struct_or_nil(MobileApp.parse(props)),
      daily_rate: Map.get(props, "fee-daily"),
      monthly_rate: Map.get(props, "fee-monthly")
    }
  end
end

defmodule Stops.Stop.ParkingLot.Payment.MobileApp do
  @moduledoc """
  GTFS Property Mappings:
  :name - payment-app
  :id - payment-app-id
  :url - payment-app-url
  """
  @derive Jason.Encoder

  defstruct [:name, :id, :url]

  @type t :: %__MODULE__{
          name: String.t() | nil,
          id: String.t() | nil,
          url: String.t() | nil
        }

  @spec parse(map) :: t
  def parse(props) do
    %__MODULE__{
      name: Map.get(props, "payment-app"),
      id: Map.get(props, "payment-app-id"),
      url: Map.get(props, "payment-app-url")
    }
  end
end

defmodule Stops.Stop.ParkingLot.Capacity do
  @moduledoc """
  Info about parking capacity at a Stop.
  GTFS Property Mappings:
  :capacity - capacity
  :accessible - capacity-accessible
  :overnight - overnight-allowed
  :type - enclosed
  """
  @derive Jason.Encoder

  defstruct [:total, :accessible, :overnight, :type]

  @type t :: %__MODULE__{
          total: integer | nil,
          accessible: integer | nil,
          overnight: String.t(),
          type: String.t() | nil
        }

  @spec parse(map) :: t
  def parse(props) do
    %__MODULE__{
      total: Map.get(props, "capacity"),
      accessible: Map.get(props, "capacity-accessible"),
      overnight: pretty_overnight_msg(Map.get(props, "overnight-allowed")),
      type: pretty_parking_type(Map.get(props, "enclosed"))
    }
  end

  # GTFS values:
  # "1 for true, 2 for false, or 0 for no information"
  @spec pretty_parking_type(integer) :: String.t() | nil
  defp pretty_parking_type(0), do: nil
  defp pretty_parking_type(1), do: "Garage"
  defp pretty_parking_type(2), do: "Surface Lot"

  @spec pretty_overnight_msg(String.t() | nil) :: String.t()
  defp pretty_overnight_msg("no"), do: "Not available"
  defp pretty_overnight_msg("yes"), do: "Available"
  defp pretty_overnight_msg("yes-except-snow"), do: "Available, except during snow emergencies"
  defp pretty_overnight_msg("no-except-snow"), do: "Not available, except during snow emergencies"

  defp pretty_overnight_msg("yes-snow-unknown"),
    do: "Available. During snow emergencies, check posted signs."

  defp pretty_overnight_msg(_), do: "Unknown"
end

defmodule Stops.Stop.ParkingLot.Manager do
  @moduledoc """
  A manager of a parking lot.
  GTFS Property Mappings:
  :name - operator
  :contact: - contact
  :phone - contact-phone
  :url - contact-url
  """
  @derive Jason.Encoder

  defstruct [:name, :contact, :phone, :url]

  @type t :: %__MODULE__{
          name: String.t() | nil,
          contact: String.t() | nil,
          phone: String.t() | nil,
          url: String.t() | nil
        }

  @spec parse(map) :: t
  def parse(props) do
    %__MODULE__{
      name: Map.get(props, "operator"),
      contact: Map.get(props, "contact"),
      phone: Map.get(props, "contact-phone"),
      url: Map.get(props, "contact-url")
    }
  end
end

defmodule Stops.Stop.ParkingLot.Utilization do
  @moduledoc """
  Utilization data for a parking lot.
  GTFS Property Mappings:
  :arrive_before - weekday-arrive-before
  :typical: - weekday-typical-utilization
  """
  @derive Jason.Encoder

  defstruct [:arrive_before, :typical]

  @type t :: %__MODULE__{
          arrive_before: String.t() | nil,
          typical: integer | nil
        }

  @spec parse(map) :: t
  def parse(props) do
    %__MODULE__{
      arrive_before: pretty_date(Map.get(props, "weekday-arrive-before")),
      typical: Map.get(props, "weekday-typical-utilization")
    }
  end

  @spec pretty_date(String.t()) :: String.t()
  defp pretty_date(date) do
    case Timex.parse(date, "{h24}:{m}:{s}") do
      {:ok, time} ->
        case Timex.format(time, "{h24}:{m} {AM}") do
          {:ok, out} -> out
        end

      {:error, _} ->
        nil
    end
  end
end

defmodule Stops.Stop.ClosedStopInfo do
  @moduledoc """
  Information about stations not in API data.
  """
  @derive Jason.Encoder

  defstruct reason: "",
            info_link: ""

  @type t :: %Stops.Stop.ClosedStopInfo{
          reason: String.t(),
          info_link: String.t()
        }
end
