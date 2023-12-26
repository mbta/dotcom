defmodule Algolia.Index do
  @callback all :: [Algolia.Object.t()]
  @callback index_name :: String.t()
end
