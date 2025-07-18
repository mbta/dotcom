defmodule DotcomWeb.Components.TripPlanner.Results do
  @moduledoc """
  The section of the trip planner page that shows the map and
  the summary or details panel
  """

  use DotcomWeb, :component

  import DotcomWeb.Components.TripPlanner.{ItineraryDetail, ItinerarySummary}

  alias OpenTripPlannerClient.ItineraryGroup
  alias OpenTripPlannerClient.Schema.Itinerary

  def results(assigns) do
    ~H"""
    <section
      id="trip-planner-results"
      class={[
        "w-full",
        @class
      ]}
    >
      <div
        :if={Enum.count(@results.itinerary_groups) > 0 && @results.itinerary_group_selection}
        class="h-min w-full mb-3.5"
        data-test={"results:itinerary_group:selected:#{@results.itinerary_group_selection}"}
      >
        <button type="button" phx-click="reset_itinerary_group" class="btn-link">
          <span class="flex flex-row items-center">
            <.icon class="fill-brand-primary h-4 mr-2" name="chevron-left" />
            <span class="font-medium">View All Options</span>
          </span>
        </button>
      </div>
      <div class="w-full">
        <.itinerary_panel results={@results} accessible_grouping?={@accessible_grouping?} />
      </div>
    </section>
    """
  end

  defp itinerary_panel(%{results: %{loading?: true}} = assigns) do
    ~H"""
    <div class="flex justify-center mt-4">
      <.spinner aria_label="Waiting for results" />
    </div>
    """
  end

  # When an itinerary group is selected, show a list of group summaries, each
  # optionally displaying a tag and description of alternate times
  defp itinerary_panel(
         %{accessible_grouping?: false, results: %{itinerary_group_selection: nil}} = assigns
       ) do
    ~H"""
    <.itinerary_groups indexed_groups={Enum.with_index(@results.itinerary_groups)} />
    """
  end

  defp itinerary_panel(
         %{accessible_grouping?: true, results: %{itinerary_group_selection: nil}} = assigns
       ) do
    %{
      accessible: accessible_groups,
      inaccessible: inaccessible_groups,
      unavailable: unavailable_groups
    } =
      assigns.results.itinerary_groups
      |> Enum.with_index()
      |> Enum.group_by(fn {group, _} ->
        cond do
          !group.available? ->
            :unavailable

          group
          |> ItineraryGroup.representative_itinerary()
          |> Itinerary.accessible?() ->
            :accessible

          true ->
            :inaccessible
        end
      end)
      |> Enum.into(%{accessible: [], inaccessible: [], unavailable: []})

    assigns =
      assign(assigns, %{
        accessible_groups: accessible_groups,
        accessible_count: Enum.count(accessible_groups),
        inaccessible_groups: inaccessible_groups,
        inaccessible_count: Enum.count(inaccessible_groups),
        unavailable_groups: unavailable_groups,
        unavailable_count: Enum.count(unavailable_groups)
      })

    ~H"""
    <%= if @unavailable_count > 0 do %>
      <.group_header text={"#{@unavailable_count} Unavailable #{Inflex.inflect("Route", @unavailable_count)}"} />
      <.itinerary_groups indexed_groups={@unavailable_groups} class="mb-md" show_accessible />
    <% end %>
    <%= if @accessible_count > 0 do %>
      <.group_header text={"#{@accessible_count} Accessible #{Inflex.inflect("Route", @accessible_count)}"} />
      <.itinerary_groups indexed_groups={@accessible_groups} show_accessible />
    <% end %>
    <%= if @inaccessible_count > 0 do %>
      <.group_header text={"#{@inaccessible_count} Inaccessible #{Inflex.inflect("Route", @inaccessible_count)}"} />
      <.itinerary_groups indexed_groups={@inaccessible_groups} show_accessible />
    <% end %>
    """
  end

  # When an itinerary group is selected, show a summary & details for the
  # default selected itinerary from that group, along with buttons for selecting
  # from all available times in the group
  defp itinerary_panel(assigns) do
    itinerary_group =
      Enum.at(assigns.results.itinerary_groups, assigns.results.itinerary_group_selection)

    itinerary = itinerary_group.itineraries |> Enum.at(assigns.results.itinerary_selection)

    assigns = %{
      all_times: ItineraryGroup.all_times(itinerary_group),
      itinerary: itinerary,
      itinerary_selection: assigns.results.itinerary_selection,
      show_accessible?: assigns.accessible_grouping?,
      time_label: if(itinerary_group.time_key == :end, do: "Arrive by", else: "Depart at")
    }

    ~H"""
    <div data-test={"itinerary_detail:selected:#{@itinerary_selection}"}>
      <.itinerary_summary itinerary={@itinerary} show_accessible={@show_accessible?} />
      <div :if={Enum.count(@all_times) > 1}>
        <hr class="border-gray-lighter" />
        <p class="text-sm mb-2 mt-3">{@time_label}</p>
        <div id="itinerary-detail-departure-times" class="flex flex-wrap gap-2">
          <.button
            :for={{time, index} <- Enum.with_index(@all_times)}
            type="button"
            class={if(@itinerary_selection == index, do: "bg-brand-primary-lightest")}
            size="small"
            variant="secondary"
            phx-click="select_itinerary"
            phx-value-index={index}
            data-test={"itinerary_detail:#{index}"}
          >
            {Util.kitchen_downcase_time(time)}
          </.button>
        </div>
      </div>
      <.itinerary_detail itinerary={@itinerary} />
    </div>
    """
  end

  attr :indexed_groups, :list, required: true, doc: "Indexed list of `%ItineraryGroup{}`"
  attr :show_accessible, :boolean, default: false
  attr :class, :string, default: ""

  defp itinerary_groups(assigns) do
    assigns =
      assign(assigns, %{
        summarized_groups: Enum.map(assigns.indexed_groups, &summarize_indexed_group/1)
      })

    ~H"""
    <div class={@class}>
      <div class="flex flex-col gap-4">
        <.itinerary_group
          :for={{group, index} <- @summarized_groups}
          group={group}
          index={index}
          show_accessible={@show_accessible}
        />
      </div>
    </div>
    """
  end

  defp itinerary_group(%{group: %{available?: false}} = assigns) do
    ~H"""
    <div
      class="border border-solid border-gray-lighter"
      data-test={"results:itinerary_group:#{@index}"}
    >
      <div class="flex gap-2 items-center whitespace-nowrap bg-gray-lightest px-3 py-2 w-full">
        <.icon name="triangle-exclamation" class="h-4.5 w-4.5" />
        <span class="leading-none font-medium font-heading text-sm text-black">
          Temporarily Unavailable
        </span>
        <span class="leading-none underline text-sm ml-auto">
          <a href="/alerts" target="_blank">View Alerts</a>
        </span>
      </div>
      <div class="opacity-50 p-4">
        <.itinerary_summary
          summarized_legs={@group.summary}
          itinerary={@group.representative_itinerary}
          show_accessible={@show_accessible}
        />
      </div>
    </div>
    """
  end

  defp itinerary_group(assigns) do
    ~H"""
    <div
      class="border border-solid border-gray-lighter p-4 cursor-pointer"
      phx-click="select_itinerary_group"
      phx-value-index={@index}
      data-test={"results:itinerary_group:#{@index}"}
    >
      <div
        :if={@group.tag}
        class="whitespace-nowrap leading-none font-bold font-heading text-sm uppercase bg-brand-primary-darkest text-white px-3 py-2 mb-3 -ml-4 -mt-4 rounded-br-lg w-min"
      >
        {Phoenix.Naming.humanize(@group.tag)}
      </div>
      <.itinerary_summary
        summarized_legs={@group.summary}
        itinerary={@group.representative_itinerary}
        show_accessible={@show_accessible}
      />
      <div class="flex justify-end items-center">
        <div :if={@group.alternatives_text} class="grow text-sm text-grey-dark">
          {@group.alternatives_text}
        </div>
        <button
          class="btn-link font-semibold underline"
          phx-click="select_itinerary_group"
          phx-value-index={@index}
        >
          Details
        </button>
      </div>
    </div>
    """
  end

  defp summarize_indexed_group({group, index}) do
    itinerary = ItineraryGroup.representative_itinerary(group)

    summarized_group = %{
      accessible?: Itinerary.accessible?(itinerary),
      alternatives_text: ItineraryGroup.alternatives_text(group),
      available?: group.available?,
      tag: itinerary[:tag],
      representative_itinerary: itinerary,
      summary: group.summary
    }

    {summarized_group, index}
  end

  attr(:text, :string, required: true)

  defp group_header(assigns) do
    ~H"""
    <h2 class="h5 mt-lg first-of-type:mt-0 mb-md font-inter">
      {@text}
    </h2>
    """
  end
end
