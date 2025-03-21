defmodule Test.Support.Generators.FakeWithBlocklist do
  @moduledoc """
  Generators to help generate fully-formatted addresses for testing.
  """

  @doc """
  Generate a random value from the function `fake_fun`, but don't
  generate any values that are in the blocklist
  """
  def fake_with_blocklist(fake_fun, blocklist) do
    value = fake_fun.()

    if blocklist |> Enum.member?(value) do
      fake_with_blocklist(fake_fun, blocklist)
    else
      value
    end
  end
end
