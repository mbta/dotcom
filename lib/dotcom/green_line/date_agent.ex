defmodule Dotcom.GreenLine.DateAgent do
  @moduledoc """
  This is a supervised agent storing the cached results of a function for a given
  date.
  """

  import GreenLine, only: [calculate_stops_on_routes: 2]

  @typep callback_fn :: (Date.t() -> {any, any})

  def stops_on_routes(pid, direction_id) do
    Agent.get(pid, fn state -> elem(state, direction_id) end)
  end

  @doc "Resets the agent, for example when it's time to bust the cache."
  @spec reset(pid, Date.t(), callback_fn) :: :ok | {:error, any}
  def reset(pid, date, calculate_state_fn \\ &calculate_state/1) do
    case calculate_state_fn.(date) do
      {:error, _} = error -> error
      new_state -> Agent.update(pid, fn _ -> new_state end)
    end
  end

  @doc """
  Starts the agent in a supervision tree. If the calculate_state_fn fails, for
  example the API query fails, it returns {:error, msg} rather than starting up
  the Agent.
  """
  @spec start_link(Date.t(), GenServer.name(), callback_fn) :: Agent.on_start() | {:error, any}
  def start_link(date, name, calculate_state_fn \\ &calculate_state/1) do
    case calculate_state_fn.(date) do
      {:error, _} = error -> error
      initial_state -> Agent.start_link(fn -> initial_state end, name: name)
    end
  end

  def stop(pid) do
    Agent.stop(pid)
  end

  defp calculate_state(date) do
    case {calculate_stops_on_routes(0, date), calculate_stops_on_routes(1, date)} do
      {{{:error, reason}, _}, _} -> {:error, inspect(reason)}
      {_, {{:error, reason}, _}} -> {:error, inspect(reason)}
      state -> state
    end
  end
end
