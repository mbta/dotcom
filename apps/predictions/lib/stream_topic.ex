defmodule Predictions.StreamTopic do
  @moduledoc """
  Translation between `SiteWeb.PredictionsChannel` topics, `Predictions.Store`
  and `Predictions.Stream`.

  The topic name joined in `SiteWeb.PredictionsChannel` is the input which
  determines
  - the appropriate `fetch_keys` needed to get relevant predictions from the
    `Predictions.Store`
  - one or more `Predictions.Stream` instances needed to fetch the relevant
    predictions.

  Every topic will be matched with one or more V3 API calls via
  `Predictions.Stream` which filter the `/predictions` streaming endpoint on a
  route and direction.
  """

  alias Predictions.{Store, StreamSupervisor}
  alias Routes.Route

  defstruct [:topic, :fetch_keys, :streams]

  @type filter_params :: String.t()
  @type t :: %__MODULE__{
          topic: String.t(),
          fetch_keys: Store.fetch_keys(),
          streams: [filter_params]
        }

  @type api_filter_t :: %{
          required(:route) => Route.id_t(),
          required(:direction_id) => 0 | 1
        }

  @spec new(String.t()) :: t() | {:error, term()}
  def new(topic)

  def new("stop:" <> stop_id = topic) do
    [stop: stop_id]
    |> do_new(topic)
  end

  def new(_) do
    {:error, :unsupported_topic}
  end

  @spec do_new(Store.fetch_keys(), String.t()) :: t() | {:error, term()}
  defp do_new(fetch_keys, topic) do
    case streams_from_fetch_keys(fetch_keys) do
      [] ->
        {:error, :no_streams_found}

      streams ->
        %__MODULE__{
          topic: topic,
          fetch_keys: fetch_keys,
          streams: Enum.uniq(streams)
        }
    end
  end

  defp streams_from_fetch_keys(stop: stop_id) do
    RoutePatterns.Repo.by_stop_id(stop_id)
    |> Enum.map(&to_filter/1)
    |> Enum.map(&filter_to_string/1)
  end

  @spec to_filter(RoutePatterns.RoutePattern.t()) :: api_filter_t()
  defp to_filter(%RoutePatterns.RoutePattern{route_id: route_id, direction_id: direction_id}) do
    %{
      route: route_id,
      direction_id: direction_id
    }
  end

  @spec filter_to_string(api_filter_t()) :: filter_params
  defp filter_to_string(filters) do
    filters
    |> Enum.map(fn {filter, value} -> "filter[#{filter}]=#{value}" end)
    |> Enum.join("&")
  end

  @spec registration_keys(t()) :: [{Store.fetch_keys(), filter_params}]
  def registration_keys(%__MODULE__{fetch_keys: fetch_keys, streams: streams}) do
    Enum.map(streams, &{fetch_keys, &1})
  end

  def start_streams(%__MODULE__{streams: streams}) do
    Enum.each(streams, &StreamSupervisor.ensure_stream_is_started/1)
  end
end
