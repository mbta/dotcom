defmodule SiteWeb.FareTransformationView do
  @moduledoc """
  View for the Fare Transformation section of the website.
  """
  use SiteWeb, :view

  def alert_icon(), do: svg("icon-alerts-triangle.svg")
end
