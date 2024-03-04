defmodule Dotcom.Cache.KeyGenerator do
  @moduledoc """
  Generate a readable cache key based on the module, function, and arguments.
  """

  require Logger

  @behaviour Nebulex.Caching.KeyGenerator

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, fun, []) do
    "#{mod}|#{fun}"
  end

  def generate(mod, fun, [arg]) do
    Logger.notice(
      "dotcom.cache.key_generator: mod=#{inspect(mod)} fun=#{inspect(fun)} args=[#{inspect(arg)}]"
    )

    "#{clean_mod(mod)}|#{fun}|#{:erlang.phash2(arg)}"
  end

  def generate(mod, fun, args) do
    Logger.notice(
      "dotcom.cache.key_generator: mod=#{inspect(mod)} fun=#{inspect(fun)} args=#{inspect(args)}"
    )

    "#{clean_mod(mod)}|#{fun}|#{:erlang.phash2(args)}"
  end

  defp clean_mod(mod) do
    mod
    |> Kernel.to_string()
    |> String.split(".")
    |> (fn [_ | tail] -> tail end).()
    |> Enum.join(".")
    |> String.downcase()
  end
end
