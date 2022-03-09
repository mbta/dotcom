defmodule LocationService.Suggestion do
  @moduledoc """
  An autocomplete suggestion.
  [todo] deprecate GoogleMaps.Place.Prediction
  """
  @type t :: %__MODULE__{
          address: String.t()
        }
  defstruct address: ""

  @type result :: {:ok, [t()]} | {:error, :internal_error}
end
