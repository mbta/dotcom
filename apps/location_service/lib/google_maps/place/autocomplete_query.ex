defmodule GoogleMaps.Place.AutocompleteQuery do
  @moduledoc """
  Query definition for Place lookups.
  """

  @type t :: %__MODULE__{
          input: String.t(),
          hit_limit: integer,
          session_token: String.t()
        }

  defstruct [:input, :hit_limit, :session_token]
end
