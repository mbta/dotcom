defmodule SiteWeb.StopView do
  @moduledoc """
  View helpers for the Stop controller
  """
  use SiteWeb, :view

  alias Alerts.Alert
  alias Phoenix.HTML
  alias Phoenix.HTML.Safe
  alias Stops.{Stop, Repo}
  alias Site.React
  alias SiteWeb.PartialView.SvgIconWithCircle
  alias SiteWeb.AlertView
  alias Routes.Route

  @spec render_alerts([Alert], DateTime.t(), Stop.t(), Keyword.t()) ::
          Safe.t() | String.t()
  def render_alerts(stop_alerts, date_time, stop, opts) do
    AlertView.group(
      priority_filter: Keyword.get(opts, :priority_filter, :any),
      show_empty?: Keyword.get(opts, :show_empty?, false),
      alerts: stop_alerts,
      date_time: date_time,
      stop: %{id: stop.id |> String.replace(" ", "-"), name: stop.name},
      timeframe: Keyword.get(opts, :timeframe)
    )
  end

  @doc """
  Returns correct svg Icon for the given feature
  """
  @spec stop_feature_icon(Repo.stop_feature(), :small | :default) :: Safe.t()
  def stop_feature_icon(feature, size \\ :default)

  def stop_feature_icon(feature, size) when is_atom(size) do
    svg_icon_with_circle(%SvgIconWithCircle{icon: stop_feature_icon_atom(feature), size: size})
  end

  defp stop_feature_icon_atom(branch)
       when branch in [:"Green-B", :"Green-C", :"Green-D", :"Green-E"] do
    Route.icon_atom(%Route{id: Atom.to_string(branch), type: 0})
  end

  defp stop_feature_icon_atom(feature) do
    feature
  end

  @doc "returns small icons for features in given DetailedStop"
  @spec feature_icons(DetailedStop.t()) :: Safe.t()
  def feature_icons(%DetailedStop{features: features}) do
    for feature <- features do
      stop_feature_icon(feature, :small)
    end
  end

  @spec render_react(map) :: HTML.safe()
  def render_react(assigns) do
    Util.log_duration(__MODULE__, :do_render_react, [assigns])
  end

  @spec do_render_react(map) :: HTML.safe()
  def do_render_react(%{
        stop_page_data: stop_page_data,
        map_data: map_data,
        map_id: map_id
      }) do
    React.render(
      "StopPage",
      %{
        stopPageData: stop_page_data,
        mapData: map_data,
        mapId: map_id
      }
    )
  end
end
