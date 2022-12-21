defmodule ExVCRHelpers do
  @moduledoc """
  Test helpers to streamline working with ExVCR.
  """

  defmacro __using__(_opts) do
    quote do
      use ExVCR.Mock, adapter: ExVCR.Adapter.Hackney
      import ExVCRHelpers, only: [test_vcr: 2, test_vcr: 3]
    end
  end

  defmacro test_vcr(name, test_opts \\ quote(do: %{}), do: body) do
    quote do
      test unquote(name), unquote(test_opts) do
        module_name = Atom.to_string(__ENV__.module)

        cassette_name =
          Enum.join([module_name, unquote(name)], "--") |> String.replace(~r/[^[:alnum:]]/, "_")

        use_cassette cassette_name do
          unquote(body)
        end
      end
    end
  end
end
