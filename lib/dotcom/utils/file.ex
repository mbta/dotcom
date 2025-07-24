defmodule Dotcom.Utils.File do
  @moduledoc """
  A collection of functions for working with files.
  """

  @doc """
  List all files in the given directory.
  Recursively goes through each subdirectory.
  If the directory is non-existent or empty, an empty list is returned.
  """
  def list_all_files(reference) do
    if File.dir?(reference) do
      case File.ls(reference) do
        {:error, _} ->
          []

        {:ok, references} ->
          references
          |> Enum.map(&(reference <> "/" <> &1))
          |> Enum.map(&list_all_files/1)
          |> List.flatten()
      end
    else
      if File.exists?(reference), do: reference, else: []
    end
  end
end
