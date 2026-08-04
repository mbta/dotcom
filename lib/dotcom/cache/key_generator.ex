defmodule Dotcom.Cache.KeyGenerator do
  @moduledoc """
  Generate a readable cache key based on the module, function, and arguments.
  """

  require Logger

  @behaviour Nebulex.Caching.KeyGenerator

  @impl Nebulex.Caching.KeyGenerator
  def generate(mod, fun, args) do
    unique_id = args |> inspect() |> Base.encode64()

    module_name =
      Util.get_or_save_persistent_term({:key_generator, mod}, fn -> clean_mod(mod) end)

    "#{module_name}|#{fun}|#{unique_id}"
  end

  defp clean_mod(mod) do
    mod
    |> Kernel.to_string()
    |> String.split(".")
    |> Kernel.tl()
    |> Enum.map_join(".", &Recase.to_snake/1)
  end
end
