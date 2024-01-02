defmodule Mix.Tasks.FileWrapper do
  @moduledoc """
  Filewrapper for unit testing file operations in mix tasks
  """
  def read_file(file) do
    File.read!(file)
  end

  def write_file(file, content) do
    File.write(file, content)
  end
end
