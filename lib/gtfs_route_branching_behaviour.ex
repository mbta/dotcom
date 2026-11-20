defmodule GTFSRouteBranching.Behaviour do
  @moduledoc """
  Behaviour for GTFSRouteBranching to allow mocking in tests.
  """

  @callback calculate(
              route :: GTFSRouteBranching.route(),
              direction_id :: 0 | 1,
              canon_stop_ids :: [GTFSRouteBranching.stop_id()],
              system_data :: GTFSRouteBranching.system_data()
            ) ::
              {GTFSRouteBranching.StopGraph.t(), GTFSRouteBranching.SegmentGraph.t() | nil,
               [GTFSRouteBranching.Segment.t()]}
end
