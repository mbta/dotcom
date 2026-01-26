defmodule Dotcom.Cache.KeyGenerator do
  @moduledoc """
  Generate a readable cache key based on the module, function, and arguments.
  """

  require Logger

  @behaviour Nebulex.Caching.KeyGenerator

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, fun, args) do
    unique_id = args |> inspect() |> Base.encode64()

    "#{clean_mod(mod)}|#{fun}|#{unique_id}"
  end

  defp clean_mod(mod) do
    mod
    |> Kernel.to_string()
    |> String.split(".")
    |> Kernel.tl()
    |> Enum.map_join(".", &Recase.to_snake/1)
    |> String.downcase()
  end
end
