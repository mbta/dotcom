defmodule DotcomWeb.Usage.Functions do
  @moduledoc """
  This Agent tracks function usage.
  """

  use Agent

  import Dotcom.Usage.Functions, only: [path: 0]

  @doc """
  Starts the Agent and builds a map of decorated functions based on a list in a file.
  The map key is a hash of [m, f, a] and the value is [m, f, a].
  """
  def start_link(_) do
    initial_state =
      path()
      |> File.stream!()
      |> CSV.decode!(headers: false)
      |> Enum.to_list()
      |> Enum.reduce(%{}, fn identifier, acc ->
        Map.put(acc, :erlang.phash2(identifier), identifier)
      end)

    Agent.start_link(fn -> initial_state end, name: __MODULE__)
  end

  @doc """
  Removes a context [m, f, a] from the list of contexts.
  """
  def remove_context(identifier) do
    Agent.update(__MODULE__, fn state ->
      Map.delete(state, :erlang.phash2(identifier))
    end)
  end

  @doc """
  Gets all decorated functions that haven't been used by the application.
  Returns a list of strings that joins the context into a familiar function reference.
  """
  def unused_functions() do
    Agent.get(__MODULE__, & &1)
    |> Map.values()
    |> Enum.map(fn [module, name, arity] ->
      "#{module}.#{name}/#{arity}"
    end)
    |> Enum.sort()
  end
end
