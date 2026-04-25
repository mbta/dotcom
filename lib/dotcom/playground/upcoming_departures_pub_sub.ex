defmodule Dotcom.Playground.UpcomingDeparturesPubsub do
  @moduledoc """
  A GenServer that tracks which consumers are subscribed to which
  sets of upcoming departures/predictions streams
  """

  use GenServer

  alias Dotcom.Playground.UpcomingDeparturesSupervisor
  alias Dotcom.Playground.UpcomingDeparturesPubsub.SubscriptionRegister

  def start_link(_) do
    GenServer.start_link(__MODULE__, SubscriptionRegister.new(), name: __MODULE__)
  end

  def subscribe(params) do
    GenServer.cast(__MODULE__, {:subscribe, self(), params})
  end

  def unsubscribe() do
    GenServer.cast(__MODULE__, {:unsubscribe, self()})
  end

  def state() do
    GenServer.call(__MODULE__, :get_state)
  end

  @impl GenServer
  def init(initial_state) do
    {:ok, initial_state}
  end

  @impl GenServer
  def handle_cast({:subscribe, caller_pid, params}, state) do
    {:noreply,
     SubscriptionRegister.add_subscription(
       state,
       caller_pid,
       params,
       &UpcomingDeparturesSupervisor.start_link/1
     )}
  end

  @impl GenServer
  def handle_cast({:unsubscribe, caller_pid}, state) do
    {:noreply,
     SubscriptionRegister.remove_subscription(
       state,
       caller_pid,
       &UpcomingDeparturesSupervisor.stop/1
     )}
  end

  @impl GenServer
  def handle_call(:get_state, _from, state) do
    {:reply, state, state}
  end

  defmodule SubscriptionRegister do
    defstruct pids_by_params: %{}, params_by_pid: %{}

    def new() do
      %__MODULE__{}
    end

    def add_subscription(
          %__MODULE__{pids_by_params: pids_by_params, params_by_pid: params_by_pid},
          pid,
          params,
          on_new_subscription
        ) do
      new_pids_by_params =
        case pids_by_params do
          %{^params => pids} ->
            pids_by_params |> Map.put(params, [pid | pids])

          _ ->
            on_new_subscription.(params)

            pids_by_params |> Map.put(params, [pid])
        end

      new_params_by_pid = params_by_pid |> Map.put(pid, params)

      %__MODULE__{
        pids_by_params: new_pids_by_params,
        params_by_pid: new_params_by_pid
      }
    end

    def remove_subscription(
          %__MODULE__{pids_by_params: pids_by_params, params_by_pid: params_by_pid} = state,
          pid,
          on_empty_subscription
        ) do
      case params_by_pid do
        %{^pid => params} ->
          new_pids_by_params =
            pids_by_params
            |> Map.get(params)
            |> List.delete(pid)
            |> case do
              [] ->
                on_empty_subscription.(params)
                pids_by_params |> Map.delete(params)

              new_pids ->
                pids_by_params |> Map.put(params, new_pids)
            end

          new_params_by_pid = params_by_pid |> Map.delete(pid)

          %__MODULE__{pids_by_params: new_pids_by_params, params_by_pid: new_params_by_pid}

        _ ->
          state
      end
    end
  end
end
