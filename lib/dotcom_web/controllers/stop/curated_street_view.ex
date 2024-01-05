defmodule DotcomWeb.StopController.CuratedStreetView do
  @moduledoc """
  Module for retreiving curated street view links for stop pages
  """

  alias Stops.Stop

  @urls %{
    "place-sstat" =>
      "https://www.google.com/maps/@42.3525788,-71.0553574,3a,75y,163.27h,107.69t/data=!3m6!1e1!3m4!1sanRemqiMAwXSR_cMnct4Og!2e0!7i16384!8i8192",
    # Brockton: "CR Morning Drop-off" sign
    "place-MM-0200" =>
      "https://www.google.com/maps/@42.0844083,-71.0156909,3a,75y,294.34h,89.91t/data=!3m6!1e1!3m4!1sedGNjWy3ih49KuVjbWtgQA!2e0!7i16384!8i8192"
  }

  @spec url(Stop.id_t()) :: String.t() | nil
  def url(stop_id), do: Map.get(@urls, stop_id)
end
