defmodule SiteWeb.Mode.FerryController do
  use SiteWeb.Mode.HubBehavior,
    meta_description:
      "Schedule information for MBTA ferry routes operating in Massachusetts Bay, including downloadable PDFs."

  def route_type, do: 4

  def mode_name, do: "Ferry"

  def mode_icon, do: :ferry

  def fare_description do
    "Fares differ between Hingham/Hull Ferries & Charlestown Ferries. Refer to the information below:"
  end

  def fares do
    SiteWeb.ViewHelpers.mode_summaries(:ferry)
  end
end
