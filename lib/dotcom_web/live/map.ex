defmodule DotcomWeb.Live.Map do
  use DotcomWeb, :live_view

  @map_config  Application.compile_env(:mbta_metro, :map)

  @impl Phoenix.LiveView
  def mount(_, session, socket) do
    IO.inspect(session, label: "session")
    {:ok,
     socket
     |> assign(:map_config, @map_config)}
  end

  @impl Phoenix.LiveView
  def render(assigns) do
    ~H"""
    <p>The live view</p>
    """
  end

	# def render(assigns) do
	# ~H"""
 #  	<.live_component
 #      module={MbtaMetro.Live.Map}
 #      id="trip-planner-map"
 #      class={
 #        [
 #          "md:sticky md:top-4",
 #          "h-64 md:h-[32rem] w-full"
 #        ]
 #        |> Enum.join(" ")
 #      }
 #      config={@map_config}
 #    />
	# """
	# end
end
