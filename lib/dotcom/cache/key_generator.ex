defmodule Dotcom.Cache.KeyGenerator do
  @moduledoc """
  Generate a readable cache key based on the module, function, and arguments.
  """

  @behaviour Nebulex.Caching.KeyGenerator

  require Logger

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, fun, []) do
    "#{clean_mod(mod)}|#{fun}"
  end

  def generate(mod, fun, [arg]) do
    "#{clean_mod(mod)}|#{fun}|#{:erlang.phash2(arg)}"
  end

  def generate(mod, fun, args) do
    "#{clean_mod(mod)}|#{fun}|#{:erlang.phash2(args)}"
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
