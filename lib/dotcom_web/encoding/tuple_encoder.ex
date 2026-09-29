defmodule DotcomWeb.Encoding.TupleEncoder do
  @moduledoc "Allows JSON encoding of tuples to arrays"
  alias Jason.Encoder

  defimpl Encoder, for: Tuple do
    def encode(data, options) when is_tuple(data) do
      data
      |> Tuple.to_list()
      |> Jason.Encode.list(options)
    end
  end
end
