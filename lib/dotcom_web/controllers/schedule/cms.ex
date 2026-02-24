defmodule DotcomWeb.Schedule.CMS do
  @moduledoc """
  Fetches teaser content from the CMS.
  """

  import Util.AsyncAssign, only: [async_assign_default: 4]

  alias Routes.Route
  alias CMS.{Partial.Teaser, Repo}

  @featured_opts [
    type: [:project, :project_update, :page],
    items_per_page: 1,
    sidebar: 1
  ]

  def assign_content(conn) do
    conn
    |> async_assign_default(
      :featured_content,
      fn -> featured_teasers(conn.assigns.route) end,
      nil
    )
    |> async_assign_default(:news, fn -> news(conn.assigns.route) end, [])
  end

  def featured_teasers(route) do
    @featured_opts
    |> Keyword.put(:route_id, route.id)
    |> Repo.teasers()
    |> Enum.take(1)
    |> Enum.map(&set_utm_params(&1, route))
  end

  def news(route) do
    teasers =
      [route_id: route.id, type: [:news_entry], sidebar: 1]
      |> Repo.teasers()
      |> Enum.map(&set_utm_params(&1, route))

    mode_from_route_desc = get_mode_from_route_description(route.description)

    mode_teasers =
      if mode_from_route_desc == nil do
        []
      else
        [mode: mode_from_route_desc, type: [:news_entry], sidebar: 1]
        |> Repo.teasers()
        |> Enum.map(&set_utm_params(&1, route))
      end

    (teasers ++ mode_teasers)
    |> Enum.uniq_by(fn teaser -> teaser.title end)
    |> Enum.sort_by(& &1.date, &(Timex.compare(&1, &2) == 1))
    |> Enum.slice(0, 5)
  end

  defp set_utm_params(nil, %Route{}) do
    nil
  end

  defp set_utm_params(%Teaser{} = teaser, %Route{} = route) do
    url =
      UrlHelpers.build_utm_url(
        teaser,
        source: "schedule",
        type: utm_type(teaser.type),
        term: Route.type_atom(route)
      )

    %{teaser | path: url}
  end

  defp utm_type(:news_entry), do: :news
  defp utm_type(type), do: type

  @spec get_mode_from_route_description(Route.gtfs_route_desc()) :: String.t() | nil
  defp get_mode_from_route_description(description) do
    case description do
      :commuter_rail ->
        "commuter-rail"

      :rapid_transit ->
        "subway"

      bus
      when bus in [
             :frequent_bus_route,
             :local_bus,
             :commuter_bus,
             :supplemental_bus,
             :rail_replacement_bus,
             :community_bus
           ] ->
        "bus"

      :ferry ->
        "ferry"

      _ ->
        nil
    end
  end
end
