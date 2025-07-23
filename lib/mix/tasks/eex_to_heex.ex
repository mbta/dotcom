defmodule Mix.Tasks.EexToHeex do
  @moduledoc """
  Wraps the [eextoheex](https://github.com/Multiverse-io/eextoheex) library in a Mix task.
  """

  @shortdoc "Use eextoheex to convert template files."

  use Mix.Task

  @impl Mix.Task
  @doc """
  Converts an `.eex` file to `.heex` and deletes the old file.

  %> mix eex_to_heex lib/dotcom_web/templates/foo.html.eex
  """
  def run([path]) do
    {:ok, _} = Briefly.start(nil, nil)

    old_file_contents = File.read!(path)

    {:ok, new_file_contents} = EexToHeex.eex_to_heex(old_file_contents)

    directory = Path.split(path) |> List.delete_at(-1) |> Path.join()

    new_file_ref =
      Path.split(path)
      |> List.last()
      |> String.split(".")
      |> List.delete_at(-1)
      |> Enum.join(".")
      |> Kernel.then(&"#{directory}/#{&1}.heex")

    File.write!(new_file_ref, new_file_contents)
    File.rm!(path)

    :ok = Mix.Tasks.Format.run([new_file_ref])
  end
end
