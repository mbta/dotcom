defmodule LocationService.Suggestion do
  @moduledoc """
  An autocomplete suggestion.
  """
  @type t :: %__MODULE__{
          address: String.t(),
          highlighted_spans: [LocationService.Utils.HighlightedSpan.t()]
        }

  @enforce_keys [:address, :highlighted_spans]
  @derive Jason.Encoder
  defstruct address: nil,
            highlighted_spans: nil

  @type result :: {:ok, [t()]} | {:error, :internal_error}
end
