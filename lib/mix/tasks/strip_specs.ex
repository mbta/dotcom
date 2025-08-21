defmodule Mix.Tasks.StripSpecs do
  @moduledoc """
  Look for @spec tags in all project files and rip them out.
  """

  @shortdoc "Remove all @spec tags from the project."

  use Mix.Task

  import Dotcom.Utils.File, only: [list_all_files: 1]

  @regex ~r/@spec[\s\S]*?(?=def)/

  @impl Mix.Task
  def run(_) do
    files = list_all_files("lib")

    Enum.each(files, &strip_specs/1)
  end

  defp strip_specs(path) do
    old_file_contents = File.read!(path)

    new_file_contents = String.replace(old_file_contents, @regex, "")

    File.write!(path, new_file_contents)

    Mix.Tasks.Format.run([path])
  end
end
