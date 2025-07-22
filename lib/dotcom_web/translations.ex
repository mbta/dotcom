defmodule DotcomWeb.Translations do
  @moduledoc """
  This Agent tracks template usage per route.
  """

  use Agent

  @doc """
  Starts the Agent and attaches to `[:template, :translation]` telemetry events.
  """
  def start_link(initial_value \\ %{}) do
    :telemetry.attach(
      "template-translation",
      [:template, :translation],
      &__MODULE__.handle_event/4,
      nil
    )

    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  @doc """
  Handles telemetry events and aggregates them by route.
  """
  def handle_event(_name, _measurements, metadata, _config) do
    route = metadata.route
    template = metadata.template

    Agent.update(__MODULE__, fn state ->
      Map.update(state, route, %{}, fn template_list ->
        Map.put(template_list, template, nil)
      end)
    end)
  end

  def state() do
    Agent.get(__MODULE__, & &1)
  end

  @doc """
  Returns all templates rendered for the route.

  Then, it resets the template list for that route.
  """
  def templates(route) do
    Agent.get(__MODULE__, & &1)
    |> Map.get(route)
    |> Map.keys()
    |> Enum.uniq()
    |> Enum.sort()
    |> Enum.each(&IO.puts(&1))

    reset_route(route)
  end

  # Empty out the template list for a route.
  defp reset_route(route) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, route, %{})
    end)
  end
end
