defmodule CMS.Field.Link do
  @moduledoc """
  Represents the "Link" field type associated with various content types in the CMS
  """

  defstruct [:title, url: "http://example.com"]

  @type t :: %__MODULE__{
          title: String.t() | nil,
          url: String.t()
        }

  def from_api(data) do
    %__MODULE__{
      title: data["title"],
      url: parse_uri(data)
    }
  end

  defp parse_uri(data) do
    case data["uri"] do
      "internal:" <> relative_path -> relative_path
      "entity:node/" <> id -> "/node/#{id}"
      url -> url
    end
  end
end
