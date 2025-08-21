defmodule Mix.Tasks.StripSpecs do
  @moduledoc """
  Look for `spec` tags in all project files and rip them out.
  """

  @shortdoc "Remove all `spec` tags from the project."

  use Mix.Task

  import Dotcom.Utils.File, only: [list_all_files: 1]

  @directory "lib"
  @regex ~r/@spec[\s\S]*?(?=def(p|\s))/

  @impl Mix.Task
  def run(_) do
    files =
      @directory
      |> list_all_files()
      |> Enum.reject(fn path -> path =~ "lib/mix/" end)

    Enum.each(files, &strip_specs/1)
  end

  defp strip_specs(path) do
    old_file_contents = File.read!(path)

    new_file_contents = String.replace(old_file_contents, @regex, "")

    File.write!(path, new_file_contents)

    Mix.Tasks.Format.run([path])
  end
end
