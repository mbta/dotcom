defmodule Telemetry.Helper do
  @moduledoc """
  Helper functions for seeing all telemetry events.

  Only for use in development.
  """

  @doc """
  Attach to all telemetry events and log them.

  You can pass in a filter so that you only see telemetry events for a specific module.
  E.g., if you want to see all telemetry events for Phoenix you can pass in `[:phoenix]`.
  For more specific events you can pass in more specific names like `[:phoenix, :router_dispatch]`
  or `[:phoenix, :router_dispatch, :stop]`.
  """
  def attach(filter \\ nil) do
    # Start the tracer
    :dbg.start()

    # Create tracer process with a function that pattern matches out the three arguments the
    # telemetry calls are made with.
    :dbg.tracer(
      :process,
      {
        fn
          {_, _, _, {_mod, :execute, [name, measurement, metadata]}}, _state ->
            handler(name, metadata, measurement, filter)
        end,
        nil
      }
    )

    # Trace all processes
    :dbg.p(:all, :c)

    # Trace calls to the functions used to emit telemetry events
    :dbg.tp(:telemetry, :execute, 3, [])
  end

  @doc """
  Stop the tracer and therefore stop listening for telemetry events.
  """
  def stop do
    :dbg.stop()
  end

  defp handler(name, metadata, measure, filter) do
    if !filtered?(name, filter) do
      # credo:disable-for-next-line Credo.Check.Warning.IoInspect
      IO.inspect(%{name: name, metadata: metadata, measure: measure})
    end
  end

  defp filtered?(name, filter) when is_atom(name), do: name == filter

  defp filtered?(_, nil), do: false

  defp filtered?(name, filter) do
    not Enum.all?(filter, fn entry -> Enum.member?(name, entry) end)
  end
end
