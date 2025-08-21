defmodule Util.Breadcrumb do
  @moduledoc """
  Represents a breadcrumb.
  """

  @enforce_keys [:text]
  defstruct text: "", url: ""

  @type t :: %__MODULE__{
          text: String.t(),
          url: String.t()
        }

  def build(text, url \\ "")

  def build({:safe, text}, url) do
    build(text, url)
  end

  def build(text, url) do
    %__MODULE__{text: text, url: url}
  end
end
