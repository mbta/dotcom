defmodule Mix.Tasks.Csv.Update.Zones do
  @moduledoc """
  Takes the current CR Zone csv, looks up any child stops via Repo, adds them to the csv
  """
  use Mix.Task
  alias Mix.Tasks.FileWrapper
  alias Stops.{Repo, Stop}

  @output_folder Application.app_dir(:zones, "priv/")
  @original_file Application.app_dir(:zones, "priv/crzones_without_children.csv")
  def run(args) do
    {opts, [], []} = OptionParser.parse(args, switches: [output_folder: :string, csv: :string])

    output_folder = Keyword.get(opts, :output_folder, @output_folder)
    original_file = Keyword.get(opts, :original_file, @original_file)

    # To use repo
    {:ok, _} = Application.ensure_all_started(:site)

    original = FileWrapper.read_file(original_file)

    csv_parent =
      original
      |> String.split("\n", trim: true)
      |> CSV.decode(headers: [:id, :zone])
      |> Enum.map(fn {:ok, row} -> row end)

    child_stops =
      csv_parent
      |> Enum.map(fn parent -> {get_children(parent), parent.zone} end)
      |> Enum.flat_map(&build_row/1)
      |> CSV.encode()
      |> Enum.join()

    parent_stops =
      csv_parent
      |> Enum.reduce([], &get_parent_stop/2)
      |> Enum.flat_map(&build_row/1)
      |> CSV.encode()
      |> Enum.join()

    FileWrapper.write_file(
      Path.join(output_folder, "crzones.csv"),
      original <> child_stops <> parent_stops
    )
  end

  defp build_row({children, zone}) do
    Enum.map(children, &[&1, zone])
  end

  def get_parent_stop(%{id: child_id, zone: zone}, acc) do
    case Stops.Repo.get(child_id) do
      %Stop{parent_id: nil} -> acc
      %Stop{parent_id: parent_id} -> [{[parent_id], zone} | acc]
    end
  end

  def child_ids(%Stop{child_ids: ids}), do: ids

  def get_children(%{id: id, zone: _}) do
    id
    |> Repo.get()
    |> child_ids()
    |> Enum.filter(&(&1 |> Repo.get() |> is_stop?()))
  end

  defp is_stop?(%Stop{type: type}) when type in [:station, :stop], do: true
  defp is_stop?(_), do: false
end
