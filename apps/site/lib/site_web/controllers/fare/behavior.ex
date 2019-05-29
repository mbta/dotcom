defmodule SiteWeb.FareController.Behavior do
  @moduledoc "Behavior for fare pages."

  @doc "The name of the template to render"
  @callback template() :: String.t()

  @doc "Given a Plug.Conn, returns a list of fares for the page"
  @callback fares(Plug.Conn.t()) :: [Fares.Fare.t()]

  @doc "Given a list of Fares, returns the filters to use/display"
  @callback filters([Fares.Fare.t()]) :: [SiteWeb.FareController.Filter.t()]

  @doc "A callback to add additional data to the Plug.Conn"
  @callback before_render(Plug.Conn.t()) :: Plug.Conn.t()

  use SiteWeb, :controller

  defmacro __using__(_) do
    quote location: :keep do
      @behaviour unquote(__MODULE__)
    end
  end
end
