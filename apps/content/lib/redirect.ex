defmodule Content.Redirect do
  @moduledoc """

  Represents the "Redirect" content type in the CMS. If there is a redirect, the user is redirected to
  the specified url.

  """

  import Content.Helpers, only: [parse_link: 2]
  alias Content.Field.Link

  defstruct link: %Link{}

  @type t :: %__MODULE__{
          link: Link.t()
        }

  @spec from_api(map) :: t
  def from_api(%{} = data) do
    %__MODULE__{
      link: parse_link(data, "field_redirect_to") || raise("No link specified for redirect.")
    }
  end
end
