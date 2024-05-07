defmodule DotcomWeb.Stats do
  @moduledoc """
  This Agent attaches to telemetry events emitted by Phoenix and aggregates them.
  """

  use Agent

  @doc """
  Starts the Agent and attaches to `[:phoenix, ...]` telemetry events.
  """
  def start_link(initial_value \\ %{}) do
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end
end
