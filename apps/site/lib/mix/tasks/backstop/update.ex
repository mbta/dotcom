defmodule Mix.Tasks.Backstop.Update do
  use Mix.Task

  @shortdoc "Update Backstop references."
  @moduledoc """
  With no arguments, updates all failed references from the most recent local test run.

  Optional arguments:
    --dir     The path to a specific test run. Helpful for updating images gathered with `mix backstop.report`.
              Use the directory path logged by that process to update the reference files with those test results.

    --files   A comma-separated string of specific files to update. Use the base file name and extension, no path.
              For example: `mix backstop.update --files=test-1.png,test-2.png,test-4.png`
              If a --file option is not provided, all failed diffs will be updated.
  """

  @test_images_folder "apps/site/test/backstop_data/bitmaps_test"

  @repo_dir :site
            |> Application.app_dir()
            |> Path.join("../../../..")
            |> Path.expand()

  @references_folder @repo_dir
                     |> Path.join(@test_images_folder)
                     |> Path.join("../bitmaps_reference")
                     |> Path.expand()

  def run(args, deps \\ []) when is_list(args) do
    {opts, _, _} = OptionParser.parse(args, switches: [dir: :string, files: :string])

    test_dir =
      opts
      |> Keyword.get(:dir, @repo_dir)
      |> latest_test_dir()

    files =
      opts
      |> Keyword.get(:files, "")
      |> String.split(",")
      |> Enum.reject(&(&1 == ""))

    copy_fn = Keyword.get(deps, :copy_fn, &File.cp!/2)

    test_dir
    |> File.ls!()
    |> filter_file_list(files)
    |> Enum.map(&Path.join(test_dir, &1))
    |> Enum.each(&copy_file(&1, copy_fn))
  end

  defp latest_test_dir(parent_dir) do
    parent_dir
    |> Path.join(@test_images_folder)
    |> File.ls!()
    |> Enum.map(&(parent_dir |> Path.join(@test_images_folder) |> Path.join(&1)))
    |> Enum.filter(&File.dir?/1)
    |> Enum.max()
  end

  @doc "Either find the failed files, or filter to a list of provided files"
  def filter_file_list(directory_files, []) do
    latest_failures(directory_files)
  end

  def filter_file_list(directory_files, file_list) do
    for file <- directory_files,
        file in file_list do
      file
    end
  end

  defp latest_failures(files) do
    for file <- files,
        String.starts_with?(file, "failed_diff_") do
      String.replace_prefix(file, "failed_diff_", "")
    end
  end

  defp copy_file(path, cp_fn) do
    cp_fn.(path, destination_path(path))
  end

  @doc "Path for the reference image of a given test image"
  def destination_path(path) do
    filename = Path.basename(path)

    @references_folder
    |> Path.join(filename)
    |> Path.expand()
  end
end
