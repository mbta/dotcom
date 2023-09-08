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

  alias Predictions.Store
  alias Routes.Route
  alias Stops.Stop

  defstruct [:topic, :fetch_keys, :streams]

  @type t :: %__MODULE__{
          topic: String.t(),
          fetch_keys: Store.fetch_keys(),
          streams: [String.t()]
        }

  @type api_filter_t :: %{
          required(:route) => Route.id_t(),
          required(:direction) => 0 | 1
        }

  @spec new(String.t()) :: t() | {:error, term()}
  def new(topic) do
    with "stop:" <> stop_id when stop_id != "" <- topic,
         filters when filters != [] <- filters(topic) do
      %__MODULE__{
        topic: topic,
        fetch_keys: [stop: stop_id],
        streams: Enum.map(filters, &filter_to_string/1)
      }
    else
      _ ->
        {:error, :unsupported_topic}
    end
  end

  @spec filters(Stop.id_t()) :: [api_filter_t()]
  defp filters("stop:" <> stop_id) do
    RoutePatterns.Repo.by_stop_id(stop_id)
    |> Enum.map(
      &%{
        route: &1.route_id,
        direction: &1.direction_id
      }
    )
    |> Enum.uniq()
  end

  @spec filter_to_string(api_filter_t()) :: String.t()
  defp filter_to_string(%{route: r, direction: d}) do
    "filter[route]=#{r}&filter[direction_id]=#{d}"
  end
end
