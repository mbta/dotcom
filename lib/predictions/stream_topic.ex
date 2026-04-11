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
          topic: map(),
          fetch_keys: Store.fetch_keys(),
          streams: [{clear_keys, filter_params}]
        }

  @spec new(map()) :: t() | {:error, term()}
  def new(%{route_id: route_id, direction_id: direction_id} = opts)
      when is_binary(route_id) and is_integer(direction_id) do
    fetch_keys =
      case opts[:stop_id] do
        nil ->
          [route: route_id, direction: direction_id]

        stop_id ->
          [route: route_id, direction: direction_id, stop: stop_id]
      end

    streams = [{fetch_keys, to_filter_name(%{route_id: route_id, direction_id: direction_id})}]

    %__MODULE__{
      topic: opts,
      fetch_keys: fetch_keys,
      streams: streams
    }
  end

  def new(%{stop_id: stop_id} = opts) when is_binary(stop_id) do
    fetch_keys = [stop: stop_id]

    streams =
      @route_patterns_repo.by_stop_id(stop_id)
      |> Enum.map(&{fetch_keys, to_filter_name(&1)})
      |> Enum.uniq()

    if streams == [] do
      {:error, :no_streams_found}
    else
      %__MODULE__{
        topic: opts,
        fetch_keys: fetch_keys,
        streams: streams
      }
    end
  end

  def new(_) do
    {:error, :unsupported_topic}
  end

  defp to_filter_name(%{route_id: route_id, direction_id: direction_id}) do
    %{
      route: route_id,
      direction_id: direction_id
    }
    |> Enum.map_join("&", fn {filter, value} -> "filter[#{filter}]=#{value}" end)
  end

  # defp to_filter_names(%{stop_id: stop_id}) do
  #   @route_patterns_repo.by_stop_id(stop_id)
  #   |> Enum.map(&{to_keys(&1), to_filter_name(&1)})
  #   |> Enum.uniq()
  # end

  # defp to_keys(%{route_id: route_id, direction_id: direction_id}) do
  #   [route: route_id, direction: direction_id]
  # end

  @spec registration_keys(t()) :: [{Store.fetch_keys(), filter_params}]
  def registration_keys(%__MODULE__{fetch_keys: fetch_keys, streams: streams}) do
    Enum.map(streams, &{fetch_keys, &1})
  end

  def start_streams(%__MODULE__{streams: streams}) do
    Enum.each(streams, &StreamSupervisor.ensure_stream_is_started/1)
  end
end
