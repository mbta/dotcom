defmodule CMS.Partial.Paragraph.Unknown do
  @moduledoc """
  Represents an unknown paragraph type in the Drupal CMS.
  """

  defstruct type: ""

  @type t :: %__MODULE__{
          type: String.t()
        }

  def from_api(data) do
    %__MODULE__{
      type: parse_type(data)
    }
  end

  defp parse_type(%{"type" => [%{"target_id" => paragraph_type}]}) do
    paragraph_type
  end
end
