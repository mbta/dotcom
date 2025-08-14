defmodule CMS.Partial.Photo do
  @moduledoc """

  Represents the "Homepage Image" content type in the CMS.
  Photos are displayed at the top of the homepage.

  """

  alias CMS.Field.Image

  defstruct image: nil

  @type t :: %__MODULE__{
          image: Image.t() | nil
        }

  @spec from_api(map) :: t
  def from_api(data) do
    %__MODULE__{
      image: parse_image(data["field_vanity_photo"])
    }
  end

  @spec parse_image([map]) :: Image.t() | nil
  defp parse_image([%{} = api_image]), do: Image.from_api(api_image)
  defp parse_image(_), do: nil
end
