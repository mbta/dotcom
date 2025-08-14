defmodule Dotcom.RoutePdfs do
  @moduledoc """
  gets pdfs for a route from the CMS, and chooses which ones to display
  """

  alias CMS.{Partial.RoutePdf, Repo}

  @spec fetch_and_choose_pdfs(String.t(), Date.t()) :: [RoutePdf.t()]
  def fetch_and_choose_pdfs(route_id, date) do
    route_id
    |> Repo.get_schedule_pdfs()
    |> choose_pdfs(date)
  end

  @spec choose_pdfs([RoutePdf.t()], Date.t()) :: [RoutePdf.t()]
  def choose_pdfs(route_pdfs, date) do
    {current, upcoming} =
      route_pdfs
      |> Enum.reject(&RoutePdf.outdated?(&1, date))
      |> Enum.split_with(&RoutePdf.started?(&1, date))

    current ++ upcoming
  end
end
