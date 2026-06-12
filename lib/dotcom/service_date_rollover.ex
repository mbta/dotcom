defmodule Dotcom.ServiceDateRollover do
  @moduledoc """
  Notifies via PubSub when the service date advances to the next service date

      // subscribe to updates
      _ = Dotcom.ServiceDateRollover.subscribe()

      // handle the update
      def handle_info({:service_date_rollover, new_service_date}, socket)
  """

  use GenServer

  import Dotcom.Utils.ServiceDateTime, only: [end_of_service_day: 0, service_date: 0]

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)
  @topic_name "service_date_rollover"

  def start_link(_opts \\ []) do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  @impl GenServer
  def init(_) do
    {:ok, %{}, {:continue, :schedule_next_run}}
  end

  @impl GenServer
  def handle_info(:dispatch_change, state) do
    _ =
      Phoenix.PubSub.broadcast(
        Dotcom.PubSub,
        @topic_name,
        {:service_date_rollover, service_date()}
      )

    {:noreply, state, {:continue, :schedule_next_run}}
  end

  @impl GenServer
  def handle_continue(:schedule_next_run, state) do
    Process.send_after(self(), :dispatch_change, ms_to_next_rollover())
    {:noreply, state}
  end

  def ms_to_next_rollover() do
    end_of_service_day()
    |> DateTime.shift(microsecond: {1, 4})
    |> DateTime.diff(@date_time_module.now(), :millisecond)
    |> max(1000)
  end

  def subscribe() do
    Phoenix.PubSub.subscribe(Dotcom.PubSub, @topic_name)
  end

  def topic_name(), do: @topic_name
end
