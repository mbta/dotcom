defmodule MBTA.Api.Stream do
  @moduledoc """
  A GenStage for connecting to the MBTA's Server-Sent Event Stream
  capability. Receives events from the API and parses their data.
  Subscribers receive events as `%MBTA.Api.Stream.Event{}` structs, which
  include the event name and the data as a `%JsonApi{}` struct.

  Required options:
  `:path` (e.g. "/vehicles")
  `:name` -- name of module
  `:subscribe_to` -- pid or name of a ServerSentEventStage
  for the MBTA.Api.Stream to subscribe to. This should be
  started as part of a supervision tree.

  Other options are made available for tests, and can include:
  - :name (name of the GenStage process)
  - :base_url
  - :key
  """

  use GenStage

  alias ServerSentEventStage, as: SSES

  defmodule Event do
    @moduledoc """
    Struct representing a parsed MBTA.Api server-sent event.
    """
    defstruct data: nil, event: :unknown
    @type event :: :reset | :add | :update | :remove
    @type t :: %__MODULE__{
            event: event | :unknown,
            data: nil | JsonApi.t() | {:error, any}
          }
  end

  @spec start_link(Keyword.t()) :: {:ok, pid}
  def start_link(opts) do
    name = Keyword.fetch!(opts, :name)
    GenStage.start_link(__MODULE__, opts, name: name)
  end

  @doc """
  Builds an option list for a ServerSentEventStage
  which a MBTA.Api.Stream will subscribe to.
  Each app's ServerSentEventStage should be started
  inside the application's supervision tree.
  """
  @spec build_options(Keyword.t()) :: Keyword.t()
  def build_options(opts) do
    with base_url when not is_nil(base_url) <- config(:base_url),
         headers = config(:headers),
         key when not is_nil(key) <- List.keyfind(headers, "x-api-key", 0) do
      opts
      |> set_url(config(:base_url))
      |> Keyword.put(:headers, config(:headers))
    else
      _ ->
        raise ArgumentError, "Missing required configuration for MBTA API"
    end
  end

  def init(opts) do
    producer = Keyword.fetch!(opts, :subscribe_to)

    {:producer_consumer, %{}, subscribe_to: [producer]}
  end

  def handle_events(events, _from, state) do
    {:noreply, Enum.map(events, &parse_event/1), state}
  end

  @spec config(atom) :: any
  defp config(key) do
    config = Application.get_env(:dotcom, :mbta_api)
    config[key]
  end

  @spec set_url(Keyword.t(), String.t() | nil) :: Keyword.t()
  defp set_url(opts, base_url) when not is_nil(base_url) do
    path = Keyword.fetch!(opts, :path)

    encoded_url =
      base_url
      |> Path.join(path)
      |> URI.encode()

    Keyword.put(opts, :url, encoded_url)
  end

  @spec parse_event(SSES.Event.t()) :: Event.t()
  defp parse_event(%SSES.Event{data: data, event: event}) do
    %Event{
      data: JsonApi.parse(data),
      event: event(event)
    }
  end

  defp event("add"), do: :add
  defp event("remove"), do: :remove
  defp event("update"), do: :update
  defp event("reset"), do: :reset
  defp event(_), do: :unknown
end
