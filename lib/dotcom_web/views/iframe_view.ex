defmodule DotcomWeb.IframeView do
  use DotcomWeb, :view

  def webpack_path do
    Application.get_env(:dotcom, :webpack_path)
  end
end
