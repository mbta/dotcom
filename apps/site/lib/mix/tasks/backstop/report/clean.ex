defmodule Mix.Tasks.Backstop.Report.Clean do
  @moduledoc """
  Removes all files downloaded by `mix backstop.report`.
  """

  use Mix.Task
  require Logger

  def run(_) do
    parent_dir = System.tmp_dir!() |> Path.join("backstop")

    parent_dir
    |> File.ls!()
    |> Enum.map(&Path.join(parent_dir, &1))
    |> Enum.filter(&File.dir?/1)
    |> Enum.each(&remove_folder/1)
  end

  defp remove_folder(dir) do
    {:ok, _} = File.rm_rf(dir)
    Logger.warn("removed folder #{dir}")
  end
end
