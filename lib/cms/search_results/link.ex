defmodule CMS.SearchResult.Link do
  @moduledoc false
  defstruct title: "",
            url: "",
            description: ""

  @type t :: %__MODULE__{
          title: String.t(),
          url: String.t(),
          description: String.t()
        }

  def build(result) do
    %__MODULE__{
      title: result["ss_field_url_title"],
      url: parse_link(result["ss_field_url_link"]),
      description: result["ts_field_description"]
    }
  end

  defp parse_link(link) do
    case String.split(link, ":") do
      ["internal", part] -> part
      ["entity", part] -> "/#{part}"
    end
  end
end
