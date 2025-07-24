defmodule DotcomWeb.Translations do
  @moduledoc """
  This Agent tracks template usage per route as well as providing some helper functions.
  """

  @base_directory "lib/dotcom_web/templates"

  use Agent

  @doc """
  Starts the Agent and attaches to `[:template, :translation]` telemetry events.
  """
  def start_link(initial_value \\ %{}) do
    _ =
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

  @doc """
  Get the number of translated to total templates as a tuple.
  {translated, total}
  """
  def completion_ratio() do
    all_templates = list_all_templates()
    all_templates_count = Kernel.length(all_templates)

    translated_templates = Enum.filter(all_templates, &translated?/1)
    translated_templates_count = Kernel.length(translated_templates)

    {translated_templates_count, all_templates_count}
  end

  @doc """
  Outputs all templates rendered for the route.

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

  defp list_all_templates(reference \\ @base_directory) do
    if File.dir?(reference) do
      File.ls!(reference)
      |> Enum.map(&(reference <> "/" <> &1))
      |> Enum.map(&list_all_templates/1)
      |> List.flatten()
    else
      reference
    end
  end

  # Empty out the template list for a route.
  defp reset_route(route) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, route, %{})
    end)
  end

  defp translated?(reference) do
    not (File.read!(reference) =~ "<% track_template() %>")
  end
end
