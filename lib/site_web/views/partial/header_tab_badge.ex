defmodule SiteWeb.PartialView.HeaderTabBadge do
  @moduledoc """
  Struct for a badge that appears on a header tab.
  """

  defstruct content: "",
            class: "",
            aria_label: ""

  @type t :: %SiteWeb.PartialView.HeaderTabBadge{
          content: String.t(),
          aria_label: String.t(),
          class: String.t() | nil
        }
end
