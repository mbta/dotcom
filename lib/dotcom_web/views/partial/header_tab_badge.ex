defmodule DotcomWeb.PartialView.HeaderTabBadge do
  @moduledoc """
  Struct for a badge that appears on a header tab.
  """

  defstruct content: "",
            class: "",
            aria_label: ""

  @type t :: %DotcomWeb.PartialView.HeaderTabBadge{
          content: String.t(),
          aria_label: String.t(),
          class: String.t() | nil
        }
end
