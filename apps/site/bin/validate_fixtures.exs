#! /usr/bin/env elixir

# """
# Compare the attributes in our fixture files to production Drupal API endpoints to see if any are missing.
#
# See the project README for information on setting the `DRUPAL_ROOT` environment variable.
#
# Run like:
#
# mix run apps/content/bin/validate_fixtures.exs
#
# """

defmodule Drupal do
  @moduledoc false

  alias CMS.API.HTTPClient

  def attributes(route) do
    route
    |> data()
    |> ApiData.individual_item()
    |> Map.keys()
  end

  defp data(route) do
    case HTTPClient.view(route, []) do
      {:ok, data} ->
        data

      _ ->
        IO.puts("Error requesting data for #{route}!")
        %{}
    end
  end
end

defmodule Fixture do
  @moduledoc false

  alias Poison.Parser

  def attributes(filename) do
    filename
    |> parse_json()
    |> ApiData.individual_item()
    |> Map.keys()
  end

  def parse_json(filename) do
    filename
    |> read()
    |> Parser.parse!()
  end

  defp read(filename) do
    filename
    |> full_path()
    |> File.read!()
  end

  defp full_path(filename) do
    [Path.dirname(__ENV__.file), "../priv/cms/", filename]
    |> Path.join()
  end
end

defmodule ApiData do
  @moduledoc false

  def individual_item(data) when is_list(data) do
    data
    |> List.first()
    |> individual_item()
  end

  def individual_item(%{} = data) when is_map(data), do: data
end

defmodule ComparisonLogger do
  @moduledoc false

  def log_differences(fixture_mapping) do
    {missing_attributes, extra_attributes} = compare_attributes(fixture_mapping)

    output = description(fixture_mapping)

    output =
      output <>
        if Enum.empty?(missing_attributes) && Enum.empty?(extra_attributes) do
          no_differences()
        else
          differences({missing_attributes, extra_attributes})
        end

    output = output <> "\n"

    IO.puts(output)
  end

  defp compare_attributes(%{drupal_route: drupal_route, fixture_name: fixture_name}) do
    drupal_attributes = Drupal.attributes(drupal_route)
    fixture_attributes = Fixture.attributes(fixture_name)

    missing_attributes = drupal_attributes -- fixture_attributes
    extra_attributes = fixture_attributes -- drupal_attributes

    {missing_attributes, extra_attributes}
  end

  defp description(%{description: description}), do: "#{description} fixture\n"

  defp no_differences, do: "\tNo differences\n"

  defp differences({missing_attributes, extra_attributes}),
    do: unless_empty(missing_attributes, &missing/1) <> unless_empty(extra_attributes, &extra/1)

  defp missing(missing_attributes),
    do: "\tMissing: \n\t\t#{missing_attributes |> Enum.join("\n\t\t")}" <> "\n"

  defp extra(extra_attributes),
    do: "\tExtra: \n\t\t#{extra_attributes |> Enum.join("\n\t\t")}" <> "\n"

  defp unless_empty(val, fun), do: if(Enum.empty?(val), do: "", else: fun.(val))
end

fixture_mappings = [
  %{
    description: "Basic page",
    drupal_route: "/destinations/fenway-park",
    fixture_name: "basic_page_with_sidebar.json"
  },
  %{
    description: "Events",
    drupal_route: "/cms/events",
    fixture_name: "cms/events.json"
  },
  %{
    description: "News",
    drupal_route: "/cms/news",
    fixture_name: "cms/news.json"
  },
  %{
    description: "Projects",
    drupal_route: "/cms/projects",
    fixture_name: "cms/projects.json"
  },
  %{
    description: "Project Updates",
    drupal_route: "/cms/project-updates",
    fixture_name: "cms/project-updates.json"
  }
]

Enum.each(fixture_mappings, &ComparisonLogger.log_differences/1)
