defmodule SiteWeb.FareTransformationView do
  @moduledoc """
  View for the Fare Transformation section of the website.
  """
  use SiteWeb, :view

  alias GoogleMaps.Geocode.Address

  defp input_value(%Address{formatted: address}) do
    address
  end

  defp input_value(_) do
    ""
  end
end
