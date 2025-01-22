defmodule Algolia.Index do
  @moduledoc false
  @callback all :: [Algolia.Object.t()]
  @callback index_name :: String.t()
end
