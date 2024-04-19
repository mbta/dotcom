defmodule MBTA.Api.Stats do
  use Agent

  def start_link(initial_value \\ %{}) do
    :telemetry.attach("finch-recv-stop", [:finch, :recv, :stop], &__MODULE__.handle_event/4, nil)

    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  def handle_event(_name, measurement, metadata, _config) do
    path = path_to_atom(metadata.request.path)
    status = status_to_atom(metadata.status)
    duration = measurement[:duration]

    Agent.update(__MODULE__, fn state ->
      if Kernel.get_in(state, [path, status]) do
        Kernel.update_in(state, [path, status], &(&1 ++ [duration]))
      else
        Kernel.put_in(state, [Access.key(path, %{}), status], [duration])
      end
    end)
  end

  def dispatch_stats() do
    Agent.get(__MODULE__, & &1)
    |> Enum.each(fn {path, stats} ->
      Enum.each(stats, fn {status, durations} ->
        count = Enum.count(durations)

        avg =
          durations
          |> Enum.sum()
          |> Kernel.div(count)
          |> Kernel.div(1000)

        :telemetry.execute([:mbta_api, :request], %{count: count, avg: avg}, %{
          path: path,
          status: status
        })
      end)
    end)

    Agent.update(__MODULE__, fn _ -> %{} end)
  end

  defp path_to_atom(path) do
    path
    |> String.replace(~r{^/|/$}, "")
    |> String.replace(~r{/}, "_")
    |> String.to_atom()
  end

  defp status_to_atom(status) do
    status
    |> Integer.to_string()
    |> String.to_atom()
  end
end
