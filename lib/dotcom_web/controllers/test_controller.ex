defmodule DotcomWeb.TestController do
  @moduledoc """
  A controller to do what we want, when we want.
  """

  require Logger

  use DotcomWeb, :controller

  if Mix.env() === :dev do
    1..10
    |> Enum.to_list()
    |> Enum.each(fn n ->
      def star_wars_quote(unquote(n)) do
        gettext(unquote(Faker.StarWars.quote()))
      end
    end)
  end

  def star_wars_quote(_), do: ""

  def index(conn, _params) do
    status = ~t(Star Wars quote of the day) <> " -> " <> star_wars_quote(:rand.uniform(10))

    Logger.notice("#{__MODULE__}: #{status}")

    send_resp(conn, 200, status)
  end
end
