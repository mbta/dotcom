defmodule Dotcom.RateLimit do
  @moduledoc """
  Supports rate limiting across Dotcom. Currently only used to limit 
  submissions to the customer support form, but can be reused elsewhere.
  """
  use Hammer, backend: :ets
end
