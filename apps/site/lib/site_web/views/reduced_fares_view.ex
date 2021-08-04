defmodule SiteWeb.ReducedFaresView do
  @moduledoc """
  View for the Reduced Fares section of the website.
  """
  use SiteWeb, :view

  alias Plug.Conn

  @type form_id :: String.t()
  @type url :: String.t()
  @type url_mapping :: %{form_id() => url()}

  @spec reduced_fares_url(Conn.t()) :: url()
  def reduced_fares_url(%Conn{path_info: ["reduced-fares", form_id | _]}) do
    reduced_fares_urls()
    |> Map.get(form_id)
  end

  @spec reduced_fares_urls() :: url_mapping()
  def reduced_fares_urls do
    case env(:reduced_fares_urls) do
      "" -> %{}
      json -> Poison.Parser.parse!(json)
    end
  end

  defp env(key) do
    Application.get_env(:site, __MODULE__)[key]
  end
end
