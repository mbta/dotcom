defmodule Dotcom.Playground.UpcomingDeparturesPubsub do
  alias Dotcom.Playground.UpcomingDeparturesPubsub.SubscriptionRegister
  use GenServer

  # alias Dotcom.Playground.PredictionsConsumerStage

  def start_link(_) do
    GenServer.start_link(__MODULE__, SubscriptionRegister.new(), name: __MODULE__)
  end

  def subscribe(params) do
    GenServer.cast(__MODULE__, {:subscribe, self(), params})
  end

  def unsubscribe() do
    GenServer.cast(__MODULE__, {:unsubscribe, self()})
  end

  @impl GenServer
  def init(initial_state) do
    {:ok, initial_state}
  end

  @impl GenServer
  def handle_cast({:subscribe, caller_pid, params}, state) do
    new_state = SubscriptionRegister.add_subscription(state, caller_pid, params)
    dbg(new_state)
    {:noreply, new_state}
  end

  @impl GenServer
  def handle_cast({:unsubscribe, caller_pid}, state) do
    new_state = SubscriptionRegister.remove_subscription(state, caller_pid)
    dbg(new_state)
    {:noreply, new_state}
  end

  defmodule SubscriptionRegister do
    defstruct pids_by_params: %{}, params_by_pid: %{}

    def new() do
      %__MODULE__{}
    end

    def add_subscription(
          %__MODULE__{pids_by_params: pids_by_params, params_by_pid: params_by_pid},
          pid,
          params
        ) do
      new_pids_by_params =
        pids_by_params |> Map.update(params, [pid], fn pids -> [pid | pids] end)

      new_params_by_pid = params_by_pid |> Map.put(pid, params)

      %__MODULE__{
        pids_by_params: new_pids_by_params,
        params_by_pid: new_params_by_pid
      }
    end

    def remove_subscription(
          %__MODULE__{pids_by_params: pids_by_params, params_by_pid: params_by_pid} = state,
          pid
        ) do
      case params_by_pid do
        %{^pid => params} ->
          new_pids_by_params =
            pids_by_params
            |> Map.get(params)
            |> List.delete(pid)
            |> case do
              [] -> pids_by_params |> Map.delete(params)
              new_pids -> pids_by_params |> Map.put(params, new_pids)
            end

          new_params_by_pid = params_by_pid |> Map.delete(pid)

          %__MODULE__{pids_by_params: new_pids_by_params, params_by_pid: new_params_by_pid}

        _ ->
          state
      end
    end
  end
end
