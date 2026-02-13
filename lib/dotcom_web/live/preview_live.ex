defmodule DotcomWeb.PreviewLive do
  @moduledoc """
  A page that we can visit that links to the other preview pages that currently exist.
  """

  use DotcomWeb, :live_view

  alias DotcomWeb.Router.Helpers
  alias DotcomWeb.ScheduleFinderLive
  alias DotcomWeb.StopMapLive
  alias DotcomWeb.WorldCupCalloutLive
  alias Phoenix.LiveView

  @pages [
    %{
      arguments: ["Red", "0"],
      icon_name: "icon-realtime-tracking",
      module: ScheduleFinderLive,
      title: "Schedule Finder 2.0"
    },
    %{
      arguments: [],
      icon_name: "icon-stop-default",
      module: StopMapLive,
      title: "Stop Page Map"
    },
    %{
      arguments: [],
      icon_name: "comment-dots",
      icon_type: "regular",
      module: WorldCupCalloutLive,
      title: "World Cup Callout"
    }
  ]

  @impl LiveView
  def render(assigns) do
    assigns = assigns |> assign(:pages, @pages)

    ~H"""
    <h1>Preview Pages</h1>

    <div class="flex flex-wrap gap-2">
      <.link
        :for={page <- @pages}
        class="flex items-center gap-3 border border-xs border-black p-5 rounded-lg text-black no-underline hover:bg-brand-primary-lightest"
        href={
          Kernel.apply(
            Helpers,
            :live_path,
            [DotcomWeb.Endpoint, page.module] ++ page.arguments
          )
        }
      >
        <.icon
          aria-hidden
          class="size-5 sm:size-6 shrink-0"
          type={page |> Map.get(:icon_type, "icon-svg")}
          name={page.icon_name}
        />
        <h2 class="leading-none m-0">{page.title}</h2>
      </.link>
    </div>
    """
  end
end
