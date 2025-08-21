defmodule CMS.SearchResult.File do
  @moduledoc false
  defstruct mimetype: "", title: "", url: ""

  @type t :: %__MODULE__{mimetype: String.t(), title: String.t(), url: String.t()}

  @static_path "/sites/default/files"

  def build(result) do
    %__MODULE__{
      mimetype: result["ss_filemime"],
      title: result["ts_filename"],
      url: link(result["ss_uri"])
    }
  end

  defp link(path) do
    path = String.replace(path, "public:/", @static_path)

    Util.site_path(:static_url, [path])
  end
end
