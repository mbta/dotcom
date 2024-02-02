defmodule Dotcom.TripPlan.Query do
  @moduledoc "Fetch trip plan via OTP and handle response"

  alias TripPlan.{Itinerary, NamedPosition}

  defstruct [
    :from,
    :to,
    :itineraries,
    errors: MapSet.new(),
    time: :unknown,
    wheelchair_accessible?: false
  ]

  @type position_error :: TripPlan.Geocode.error() | :same_address
  @type position :: NamedPosition.t() | {:error, position_error} | nil
  @type t :: %__MODULE__{
          from: position,
          to: position,
          time: :unknown | Dotcom.TripPlan.DateTime.date_time(),
          errors: MapSet.t(atom),
          wheelchair_accessible?: boolean,
          itineraries: TripPlan.Api.t() | nil
        }

  @spec from_query(map, TripPlan.Api.connection_opts(), Keyword.t()) :: t
  def from_query(params, connection_opts, date_opts) do
    opts = get_query_options(params)

    %__MODULE__{
      wheelchair_accessible?: match?(%{"wheelchair" => "true"}, params)
    }
    |> Dotcom.TripPlan.DateTime.validate(params, date_opts)
    |> Dotcom.TripPlan.Location.validate(params)
    |> maybe_fetch_itineraries(connection_opts, opts)
  end

  @spec get_query_options(map) :: keyword()
  def get_query_options(params) do
    %{}
    |> set_default_options
    |> Map.merge(params)
    |> opts_from_query
  end

  @spec maybe_fetch_itineraries(t, TripPlan.Api.connection_opts(), Keyword.t()) :: t
  defp maybe_fetch_itineraries(
         %__MODULE__{
           to: %NamedPosition{},
           from: %NamedPosition{}
         } = query,
         connection_opts,
         opts
       ) do
    if Enum.empty?(query.errors) do
      query
      |> fetch_itineraries(connection_opts, [query.time | opts])
      |> parse_itinerary_result(query)
    else
      query
    end
  end

  defp maybe_fetch_itineraries(%__MODULE__{} = query, _conn_opts, _opts) do
    query
  end

  @spec fetch_itineraries(t, TripPlan.Api.connection_opts(), Keyword.t()) :: TripPlan.Api.t()
  defp fetch_itineraries(
         %__MODULE__{from: %NamedPosition{} = from, to: %NamedPosition{} = to},
         connection_opts,
         opts
       ) do
    TripPlan.plan(from, to, connection_opts, opts)
  end

  @spec parse_itinerary_result(TripPlan.Api.t(), t) :: t
  defp parse_itinerary_result({:ok, _} = result, %__MODULE__{} = query) do
    %{query | itineraries: result}
  end

  defp parse_itinerary_result({:error, error}, %__MODULE__{} = query) do
    query
    |> Map.put(:itineraries, {:error, error})
    |> Map.put(:errors, MapSet.put(query.errors, error))
  end

  defp set_default_options(params) do
    Map.put(params, "modes", %{
      "bus" => "true",
      "commuter_rail" => "true",
      "ferry" => "true",
      "subway" => "true"
    })
  end

  @spec opts_from_query(map, Keyword.t()) :: Keyword.t()
  def opts_from_query(query, opts \\ [])

  def opts_from_query(%{"wheelchair" => "true"} = query, opts) do
    opts_from_query(
      Map.delete(query, "wheelchair"),
      Keyword.put(opts, :wheelchair_accessible?, true)
    )
  end

  def opts_from_query(%{"modes" => modes} = query, opts) do
    active_modes = Enum.reduce(modes, [], &get_active_modes/2)

    opts_from_query(
      Map.delete(query, "modes"),
      Keyword.put(opts, :mode, active_modes)
    )
  end

  def opts_from_query(%{"root_url" => root_url} = query, opts) do
    opts_from_query(
      Map.delete(query, "root_url"),
      Keyword.put(opts, :root_url, root_url)
    )
  end

  def opts_from_query(_, opts) do
    opts
  end

  @spec get_active_modes({String.t(), String.t()}, Keyword.t()) :: Keyword.t()
  defp get_active_modes({"subway", "true"}, acc) do
    ["TRAM", "SUBWAY" | acc]
  end

  defp get_active_modes({"commuter_rail", "true"}, acc) do
    ["RAIL" | acc]
  end

  defp get_active_modes({"bus", "true"}, acc) do
    ["BUS" | acc]
  end

  defp get_active_modes({"ferry", "true"}, acc) do
    ["FERRY" | acc]
  end

  defp get_active_modes({_, "false"}, acc) do
    acc
  end

  @doc "Determines if the given query contains any itineraries"
  @spec itineraries?(t | nil) :: boolean
  def itineraries?(%__MODULE__{itineraries: {:ok, itineraries}}) do
    !Enum.empty?(itineraries)
  end

  def itineraries?(_query), do: false

  @spec get_itineraries(t) :: [Itinerary.t()]
  def get_itineraries(%__MODULE__{itineraries: {:ok, itineraries}}) do
    itineraries
  end

  def get_itineraries(%__MODULE__{itineraries: {:error, _error}}) do
    []
  end

  def get_itineraries(%__MODULE__{itineraries: nil}) do
    []
  end

  @doc "Returns the name of the location for a given query"
  @spec location_name(t, :from | :to) :: String.t()
  def location_name(%__MODULE__{} = query, key) when key in [:from, :to] do
    case Map.get(query, key) do
      %NamedPosition{name: name} -> name
      _ -> nil
    end
  end
end
