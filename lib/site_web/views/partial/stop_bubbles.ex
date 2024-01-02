defmodule SiteWeb.PartialView.StopBubbles do
  use SiteWeb, :view

  alias Site.StopBubble.Params

  @spec render_stop_bubbles([Params.t()]) :: Phoenix.HTML.safe()
  def render_stop_bubbles(params, add_expand_icon? \\ false, stop_branch \\ nil) do
    content_tag :div, class: "route-branch-stop-bubbles" do
      for param <- params do
        add_branch_expand_icon =
          add_expand_icon? && (is_nil(stop_branch) || param.bubble_branch == stop_branch)

        param =
          param
          |> Map.from_struct()
          |> Map.put(:add_expand_icon?, add_branch_expand_icon)
          |> Map.put(:green_line?, green_line?(param.route_id))

        SiteWeb.PartialView.render("_stop_bubble_container.html", param)
      end
    end
  end

  defp green_line?(nil), do: false
  defp green_line?(route_id), do: String.contains?(route_id, "Green")
end
