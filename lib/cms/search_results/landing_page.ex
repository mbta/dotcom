defmodule CMS.SearchResult.LandingPage do
  @moduledoc false
  defstruct title: "",
            url: "",
            highlights: []

  @type t :: %__MODULE__{
          title: String.t(),
          url: String.t(),
          highlights: [String.t()]
        }

  def build(result) do
    %__MODULE__{
      title: result["ts_title"],
      url: List.first(result["sm_url"]),
      highlights: result["highlights"]
    }
  end
end
