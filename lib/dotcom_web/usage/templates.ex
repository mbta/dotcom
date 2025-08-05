defmodule DotcomWeb.Usage.Templates do
  @moduledoc """
  This Agent tracks template usage.
  """

  use Agent

  require Logger

  import Dotcom.Utils.File, only: [list_all_files: 1]

  @initial_state "lib/dotcom_web/templates"
                 |> list_all_files()
                 |> Enum.filter(fn ref -> String.match?(ref, ~r/eex$/) end)
                 |> Map.new(fn template -> {template, nil} end)

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
  Handles telemetry events and removes the template from the list.
  """
  def handle_event(_name, _measurements, metadata, _config) do
    Agent.update(__MODULE__, fn state ->
      Map.delete(state, metadata.template)
    end)
  end

  @doc """
  Looks at all templates and logs any that haven't been loaded a single time.
  """
  def unused_templates() do
    Agent.get(__MODULE__, & &1)
    |> Map.keys()
  end
end
