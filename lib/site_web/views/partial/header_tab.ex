defmodule SiteWeb.PartialView.HeaderTab do
  @moduledoc """
  Struct for a tab that appears in a header.
  """

  alias SiteWeb.PartialView.HeaderTabBadge

  defstruct id: "",
            name: "",
            href: "",
            class: "",
            badge: nil

  @type t :: %SiteWeb.PartialView.HeaderTab{
          id: String.t(),
          name: String.t(),
          href: String.t(),
          class: String.t() | nil,
          badge: HeaderTabBadge.t() | nil
        }
end
