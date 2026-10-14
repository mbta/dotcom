defmodule Dotcom.Encoder do
  @moduledoc false

  defimpl Jason.Encoder, for: MapSet do
    def encode(map_set, opts) do
      Jason.Encode.list(MapSet.to_list(map_set), opts)
    end
  end

  defimpl Jason.Encoder, for: [UnrootedPolytree, UnrootedPolytree.Edges, UnrootedPolytree.Node] do
    def encode(tree, opts) do
      Jason.Encode.map(tree, opts)
    end
  end
end
