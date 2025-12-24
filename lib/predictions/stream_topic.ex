defmodule Predictions.StreamTopic do
  @moduledoc """
  Translation between `DotcomWeb.PredictionsChannel` topics, `Predictions.Store`
  and `Predictions.Stream`.

  The topic name joined in `DotcomWeb.PredictionsChannel` is the input which
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

  defstruct [:topic, :fetch_keys, :streams]

  @route_patterns_repo Application.compile_env!(:dotcom, :repo_modules)[:route_patterns]

  @type filter_params :: String.t()
  @type clear_keys :: Store.fetch_keys()
  @type t :: %__MODULE__{
          topic: String.t(),
          fetch_keys: Store.fetch_keys(),
          streams: [{clear_keys, filter_params}]
        }

  @spec new(String.t()) :: t() | {:error, term()}
  def new(topic)

  def new("stop:" <> stop_id = topic) do
    [stop: stop_id]
    |> do_new(topic)
  end

  def new(opts) when is_list(opts) do
    do_new(opts, Enum.map_join(opts, ",", fn {k, v} -> "#{k}=#{v}" end))
  end

  @spec do_new(Store.fetch_keys(), String.t()) :: t() | {:error, term()}
  defp do_new(fetch_keys, topic) do
    case streams_from_fetch_keys(fetch_keys) do
      [] ->
        {:error, :unsupported_topic}

      streams ->
        %__MODULE__{
          topic: topic,
          fetch_keys: fetch_keys,
          streams: Enum.uniq(streams)
        }
    end
  end

  @spec streams_from_fetch_keys(Store.fetch_keys()) :: [{clear_keys, filter_params}]
  defp streams_from_fetch_keys(stop: stop_id) do
    @route_patterns_repo.by_stop_id(stop_id)
    |> Enum.map(&{to_keys(&1), to_filter_name(&1)})
  end

  defp streams_from_fetch_keys(opts) do
    opts
    |> then(&{to_keys(&1), to_filter_name(&1)})
    |> List.wrap()
  end

  defp to_keys(%RoutePatterns.RoutePattern{route_id: route_id, direction_id: direction_id}) do
    [route: route_id, direction: direction_id]
  end

  defp to_keys(opts), do: opts

  defp to_filter_name(%RoutePatterns.RoutePattern{route_id: route_id, direction_id: direction_id}) do
    %{
      route: route_id,
      direction_id: direction_id
    }
    |> Enum.map_join("&", fn {filter, value} -> "filter[#{filter}]=#{value}" end)
  end

  defp to_filter_name(opts) do
    opts
    |> Enum.map_join("&", fn {filter, value} ->
      filter = if filter == :direction, do: "direction_id", else: filter
      "filter[#{filter}]=#{value}"
    end)
  end

  @spec registration_keys(t()) :: [{Store.fetch_keys(), filter_params}]
  def registration_keys(%__MODULE__{fetch_keys: fetch_keys, streams: streams}) do
    Enum.map(streams, &{fetch_keys, &1})
  end

  def start_streams(%__MODULE__{streams: streams}) do
    Enum.each(streams, &StreamSupervisor.ensure_stream_is_started/1)
  end
end
