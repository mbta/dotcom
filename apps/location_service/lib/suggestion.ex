defmodule LocationService.Suggestion do
  @moduledoc """
  An autocomplete suggestion.
  [todo] deprecate GoogleMaps.Place.Prediction
  """
  @type t :: %__MODULE__{
          address: String.t(),
          highlighted_spans: [LocationService.Utils.highlighted_span()]
        }

  @enforce_keys [:address, :highlighted_spans]
  defstruct address: nil,
            highlighted_spans: nil

  @type result :: {:ok, [t()]} | {:error, :internal_error}
end
