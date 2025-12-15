defmodule DotcomWeb.LinedListDemoLive do
  @moduledoc """
  A very simple page to demo the lined_list component in action
  """

  alias Routes.Route
  import DotcomWeb.RouteComponents
  use DotcomWeb, :live_view

  def render(assigns) do
    ~H"""
    <h1>Lined List Examples</h1>

    <h2>Simple Arrivals Example</h2>
    <.simple_arrivals_example />

    <h2>With a Mode Icon</h2>
    <.with_mode_icon_example />

    <h2>With a Collapsible Section</h2>
    <.with_collapsible_section_example />
    """
  end

  defp simple_arrivals_example(assigns) do
    route = %Route{id: "Green-B", type: 0}

    arrivals = [
      %{title: "Stop 1", time: "11:45 AM"},
      %{title: "Stop 2", time: "11:46 AM"},
      %{title: "Stop 3", time: "11:48 AM"}
    ]

    assigns = assigns |> assign(:route, route) |> assign(:arrivals, arrivals)

    ~H"""
    <.lined_list>
      <.lined_list_item :for={arrival <- @arrivals} route={@route}>
        <div class="grow">{arrival.title}</div>
        <div>{arrival.time}</div>
      </.lined_list_item>
    </.lined_list>
    """
  end

  defp with_mode_icon_example(assigns) do
    route = %Route{id: "Green-B", type: 0}

    arrivals = [
      %{title: "Stop 1", time: "11:45 AM"},
      %{title: "Stop 2", time: "11:46 AM"},
      %{title: "Stop 3", time: "11:48 AM"}
    ]

    assigns = assigns |> assign(:route, route) |> assign(:arrivals, arrivals)

    ~H"""
    <.lined_list>
      <.lined_list_item variant="mode" route={@route}>
        <div class="grow">Takin' the train!</div>
      </.lined_list_item>
      <.lined_list_item :for={arrival <- @arrivals} route={@route}>
        <div class="grow">{arrival.title}</div>
        <div>{arrival.time}</div>
      </.lined_list_item>
    </.lined_list>
    """
  end

  defp with_collapsible_section_example(assigns) do
    route = %Route{id: "Green-B", type: 0}

    arrivals_before = [
      %{title: "Stop -3", time: "11:41 AM"},
      %{title: "Stop -2", time: "11:43 AM"},
      %{title: "Stop -1", time: "11:44 AM"}
    ]

    arrivals_after = [
      %{title: "Stop 1", time: "11:45 AM"},
      %{title: "Stop 2", time: "11:46 AM"},
      %{title: "Stop 3", time: "11:48 AM"}
    ]

    assigns =
      assigns
      |> assign(:route, route)
      |> assign(:arrivals_before, arrivals_before)
      |> assign(:arrivals_after, arrivals_after)

    ~H"""
    <.lined_list>
      <.lined_list_item variant="mode" route={@route}>
        <div class="grow">Takin' the train!</div>
      </.lined_list_item>
      <details class="group/past-stops">
        <summary>
          <.lined_list_item route={@route} variant="none" class="bg-charcoal-90">
            <div class="grow">See past stops</div>
            <div class="shrink-0">
              <.icon name="chevron-down" class="h-3 w-3 group-open/past-stops:rotate-180" />
            </div>
          </.lined_list_item>
        </summary>
        <.lined_list_item
          :for={arrival <- @arrivals_before}
          route={@route}
          class="bg-charcoal-90 border-t-xs border-gray-lightest"
        >
          <div class="grow">{arrival.title}</div>
          <div>{arrival.time}</div>
        </.lined_list_item>
      </details>
      <.lined_list_item :for={arrival <- @arrivals_after} route={@route}>
        <div class="grow">{arrival.title}</div>
        <div>{arrival.time}</div>
      </.lined_list_item>
    </.lined_list>
    """
  end
end
