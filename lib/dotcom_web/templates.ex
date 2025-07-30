defmodule DotcomWeb.Templates do
  @moduledoc """
  This Agent tracks template usage per route.
  """

  use Agent

  require Logger

  import Dotcom.Utils.File, only: [list_all_files: 1]

  @initial_state "lib/dotcom_web/templates"
                 |> list_all_files()
                 |> Enum.filter(fn ref -> String.match?(ref, ~r/eex$/) end)
                 |> Enum.reduce(%{}, fn ref, refs -> Map.put(refs, ref, 0) end)

  @doc """
  Starts the Agent and attaches to `[:template, :track]` telemetry events.
  """
  def start_link(_) do
    _ =
      :telemetry.attach(
        "template-tracking",
        [:template, :track],
        &__MODULE__.handle_event/4,
        nil
      )

    Agent.start_link(fn -> @initial_state end, name: __MODULE__)
  end

  @doc """
  Handles telemetry events and increments each template view.
  """
  def handle_event(_name, _measurements, metadata, _config) do
    template = metadata.template

    Agent.update(__MODULE__, fn state ->
      Map.update(state, template, 0, &(&1 + 1))
    end)
  end

  @doc """
  Looks at all templates and logs any that haven't been loaded a single time.
  Then it resets the counts.
  """
  def log_unused_templates() do
    Agent.get(__MODULE__, & &1)
    |> Enum.filter(fn {_, count} -> count === 0 end)
    |> Enum.each(fn {template, _} ->
      Logger.warning("#{__MODULE__}.unused_template #{template}")
    end)

    Agent.update(__MODULE__, fn _ -> @initial_state end)
  end
end
