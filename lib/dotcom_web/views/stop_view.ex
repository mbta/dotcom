defmodule DotcomWeb.StopView do
  @moduledoc """
  View helpers for the Stop controller
  """

  use DotcomWeb, :view

  alias DotcomWeb.PartialView.SvgIconWithCircle
  alias Phoenix.HTML.Safe
  alias Routes.Route

  @doc """
  Returns correct svg Icon for the given feature
  """
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
  def feature_icons(%DetailedStop{features: features}) do
    for feature <- features do
      stop_feature_icon(feature, :small)
    end
  end
end
