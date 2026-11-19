defmodule GTFSRouteBranching.Behaviour do
  @moduledoc """
  Behaviour for GTFSRouteBranching to allow mocking in tests.
  """

  @callback calculate(route :: any(), direction_id :: 0 | 1, canon_stop_ids :: [String.t()],
                      system_data :: map()) :: {any(), any(), [any()]}
end
