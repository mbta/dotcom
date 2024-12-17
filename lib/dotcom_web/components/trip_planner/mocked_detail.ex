defmodule DotcomWeb.Components.TripPlanner.MockedDetail do
  use DotcomWeb, :component

  alias Routes.Route

  def mocked_detail(assigns) do
    assigns =
      assigns
      |> assign(%{
        bus_transit_leg: %{
          first_stop: %{
            name: "Clarendon Hill Busway",
            time: "1:27PM",
            alerts: [
              %{
                description:
                  "Escalator has been super-borked for ages. We've honestly given up on it.",
                title: "Escalator out of service"
              }
            ]
          },
          last_stop: %{
            name: "Holland St @ Dover St",
            time: "1:33PM",
            alerts: [
              %{
                description:
                  "Due to budget constraints, trash cans have been removed from this area. Please be mindful of raccoons.",
                title: "Excess Garbage"
              }
            ]
          },
          route_alerts: [
            %{
              description: "Delays of up to 20 minutes due to shark attacks.",
              title: "Delay"
            }
          ],
          headsign: "Lechmere",
          stops: [
            "Broadway @ Garrison Ave",
            "Holland St @ Cameron Ave"
          ],
          route: %Route{type: 3, name: "88"}
        },
        walking_leg: %{},
        train_transit_leg: %{
          first_stop: %{
            name: "Davis",
            time: "1:38PM",
            alerts: []
          },
          last_stop: %{
            name: "Park St",
            time: "1:55PM",
            alerts: []
          },
          route_alerts: [],
          headsign: "Braintree",
          stops: [
            "Porter",
            "Harvard",
            "Central",
            "Kendall",
            "Charles/MGH"
          ],
          route: %Route{id: "Red"}
        }
      })

    ~H"""
    <div>
      <.location name="1372 Broadway, Somerville, MA 02144" time="1:22PM" />
      <.walking_leg leg={@walking_leg} />
      <.transit_leg leg={@bus_transit_leg} />
      <.walking_leg leg={@walking_leg} />
      <.transit_leg leg={@train_transit_leg} />
      <.walking_leg leg={@walking_leg} />
      <.location name="10 Park Plaza, Boston, MA 02116" time="2:08PM" />
    </div>
    """
  end

  defp location(assigns) do
    ~H"""
    <div class="bg-gray-bordered-background rounded-lg p-3">
      <.place name={@name} time={@time}>
        <:icon>
          <.icon name="location-dot" class="fill-brand-primary h-5 w-5" />
        </:icon>
      </.place>
    </div>
    """
  end

  defp walking_leg(assigns) do
    ~H"""
    <div class="px-3">
      <div class="flex items-stretch gap-x-2">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-0.5 flex-grow bg-black"]}></div>
        </div>

        <details class="border-y border-x-0 border-gray-lightest my-3 py-3 w-full group">
          <summary class="flex w-full gap-x-3.5">
            <.icon name="person-walking" class="w-4 h-6 fill-black" />
            <div class="flex flex-col text-sm">
              <div class="font-medium">Walk</div>
              <div>3 min, 0.1 mi</div>
            </div>
            <.icon
              name="chevron-down"
              class="ml-auto w-4 h-4 fill=brand-primary group-open:rotate-180"
            />
          </summary>
          Walk to these places
        </details>
      </div>
    </div>
    """
  end

  defp transit_leg(assigns) do
    ~H"""
    <div class="bg-gray-bordered-background rounded-lg p-3">
      <.transit_place show_leg_line route={@leg.route} stop={@leg.first_stop} time="1:27PM" />

      <div class="flex items-stretch gap-x-[0.9375rem]">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div class={["w-1 flex-grow", leg_line_class(@leg.route)]}></div>
        </div>

        <details class="mt-2 w-full group py-3">
          <summary class="flex items-start gap-1.5">
            <.route_symbol route={@leg.route} />
            <div class="flex flex-col">
              <span class="cursor-pointer font-bold">{@leg.headsign}</span>
              <span class="text-sm">Ride the bus <span class="font-semibold">3 stops</span></span>
              <.alert :for={alert <- @leg.route_alerts} alert={alert} />
            </div>
            <.icon
              name="chevron-down"
              class="ml-auto w-4 h-4 fill=brand-primary group-open:rotate-180"
            />
          </summary>
          <ul class="w-full m-0 pl-0 flex flex-col divide-y divide-gray-lightest">
            <li :for={stop_name <- @leg.stops} class="inline-flex items-center gap-x-2 py-2 relative">
              <.icon name="circle" class="h-1.5 w-1.5 absolute -left-7 fill-white" />
              {stop_name}
            </li>
          </ul>
        </details>
      </div>

      <.transit_place route={@leg.route} stop={@leg.last_stop} time="1:33PM" />
    </div>
    """
  end

  attr :show_leg_line, :boolean, default: false

  defp transit_place(assigns) do
    ~H"""
    <div>
      <.place time={@stop.time} name={@stop.name} alerts={@stop.alerts}>
        <:icon>
          <div class="h-5 w-5">
            <.transit_leg_icon route={@route} />
          </div>
          <div :if={@show_leg_line} class={["w-1 flex-grow", leg_line_class(@route)]}></div>
        </:icon>
      </.place>
      <div class="flex items-stretch gap-x-3">
        <div class="flex flex-col items-center">
          <div class="w-5"></div>
          <div :if={@show_leg_line} class={["w-1 flex-grow", leg_line_class(@route)]}></div>
        </div>
        <div>
          <.alert :for={alert <- @stop.alerts} alert={alert} />
        </div>
      </div>
    </div>
    """
  end

  attr :time, :string, required: true
  attr :name, :string, required: true
  slot :icon

  defp place(assigns) do
    ~H"""
    <div class="flex items-stretch gap-x-3">
      <div class="flex flex-col items-center">
        {render_slot(@icon)}
      </div>
      <div class="flex flex-col justify-start">
        <strong class="text-sm">{@name}</strong>
      </div>
      <time class="ml-auto text-right text-sm text-nowrap">{@time}</time>
    </div>
    """
  end

  defp alert(assigns) do
    ~H"""
    <details class="group">
      <summary>
        <.icon name="triangle-exclamation" class="h-3 w-3" />
        <span class="text-sm">
          {@alert.title}
        </span>
        <span class="text-xs btn-link cursor-pointer group-open:hidden">Show Details</span>
        <span class="text-xs btn-link cursor-pointer hidden group-open:inline">
          Hide Details
        </span>
      </summary>
      <div class="bg-white p-2 text-sm">
        {@alert.description}
      </div>
    </details>
    """
  end

  defp transit_leg_icon(assigns) do
    name =
      case Route.vehicle_name(assigns.route) do
        "Bus" -> "icon-stop-default"
        _ -> "icon-circle-t-default"
      end

    assigns = assigns |> assign(:name, name)

    ~H"""
    <.icon type="icon-svg" class="h-5 w-5" name={@name} />
    """
  end

  defp leg_line_class(%Route{} = route) do
    route
    |> Route.to_naive()
    |> Route.icon_atom()
    |> CSSHelpers.atom_to_class()
    |> then(&"bg-#{&1}")
  end
end
