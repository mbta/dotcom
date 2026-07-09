defmodule DotcomWeb.Plugs.AssignFromParam do
  @moduledoc """
  Assigns to the Conn based on a given param, allowing configuration of a
  fallback value.

  ## Usage

  At minimum, requires the following options:
  - `:param` - the name of the param to assign from
  - `:fallback_fn` - a 0-arity function which returns a fallback value

  Optionally, can provide a `:validator_fn` which is a 1-arity function which
  returns an `{:ok, value}` tuple. If omitted, defaults to `fn value -> {:ok,
  value} end`.

  ```
  plug(DotcomWeb.Plugs.AssignFromParam,
    param: "color",
    validator_fn: fn
      value -> if value in ["RED", "ORANGE", "YELLOW"] do
        {:ok, String.downcase(value)}
      else
        {:error, :ugly_color}
      end
    end,
    fallback_fn: fn -> "black" end
  )
  ```

  Would do the following:
  - "?color=RED" -> assigns `:color` to `"red"`
  - "?color=BLUE" -> assigns `:color` to `"black"` (fallback)
  - (color param not present) -> assigns `:color` to `"black"` (fallback)
  """

  import Plug.Conn, only: [assign: 3]

  @behaviour Plug

  @impl true
  def init(opts), do: opts

  @impl true
  def call(conn, opts) do
    param = Keyword.fetch!(opts, :param)
    fallback_fn = Keyword.fetch!(opts, :fallback_fn)
    validator_fn = Keyword.get(opts, :validator_fn, fn value -> {:ok, value} end)

    validate_call(conn, param, validator_fn, fallback_fn)
  end

  defp validate_call(%{query_params: query_params} = conn, param, validator_fn, fallback_fn)
       when is_map_key(query_params, param) do
    param_value = Map.get(query_params, param)
    param_atom = String.to_atom(param)

    case validator_fn.(param_value) do
      {:ok, value} ->
        assign(conn, param_atom, value)

      _ ->
        assign(conn, param_atom, fallback_fn.())
    end
  end

  defp validate_call(conn, param, _, fallback_fn) do
    assign(conn, String.to_atom(param), fallback_fn.())
  end
end
