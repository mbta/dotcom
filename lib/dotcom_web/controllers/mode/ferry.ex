defmodule DotcomWeb.Mode.FerryController do
  use Dotcom.Gettext.Sigils

  use DotcomWeb.Mode.HubBehavior,
    meta_description:
      ~t"Schedule information for MBTA ferry routes operating in Massachusetts Bay, including downloadable PDFs."

  def route_type, do: 4

  def mode_name, do: ~t"Ferry"

  def mode_icon, do: :ferry

  def fare_description do
    ~t"Fares differ between Hingham/Hull Ferries & Charlestown Ferries. Refer to the information below:"
  end

  def fares do
    DotcomWeb.ViewHelpers.mode_summaries(:ferry)
  end
end
