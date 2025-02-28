defmodule DotcomWeb.Live.SystemStatus do
  @moduledoc """
  A temporary LiveView for showing off the system status widget until we
  put it into the homepage (and elsewhere).
  """

  use DotcomWeb, :live_view

  import Dotcom.Routes, only: [subway_route_ids: 0]
  import DotcomWeb.Components.PlannedDisruptions
  import DotcomWeb.Components.RouteSymbols
  import DotcomWeb.Components.SystemStatus.StatusLabel
  import DotcomWeb.Components.SystemStatus.SubwayStatus

  alias Dotcom.Alerts.Disruptions
  alias Dotcom.SystemStatus

  @date_time_module Application.compile_env!(:dotcom, :date_time_module)

  def render(assigns) do
    now = @date_time_module.now()

    live_alerts =
      subway_route_ids()
      |> Alerts.Repo.by_route_ids(now)
      |> Enum.filter(&SystemStatus.status_alert?(&1, now))

    assigns =
      assigns
      |> assign(:alerts, live_alerts)
      |> assign(:examples, alerts_examples())
      |> assign(:now, now)

    ~H"""
    <h1>Live Data</h1>
    <.example_table alerts={@alerts} now={@now} />

    <h1>Examples</h1>
    <div :for={example <- @examples} class="mb-4">
      <.example_table alerts={example.alerts} now={@now} />
    </div>

    <h1>Misc Components</h1>
    <h2>Status Labels</h2>
    <div class="flex flex-col gap-2">
      <.status_label status={:normal} />
      <.status_label status={:shuttle} />
      <.status_label status={:shuttle} plural />
      <.status_label status={:shuttle} prefix="8:30pm" />
      <.status_label status={:shuttle} prefix="Wed Feb 12 - Fri Feb 14" />
      <.status_label status={:station_closure} />
      <.status_label status={:delay} />
    </div>

    <h2>Route Pills</h2>
    <%= for ids <- [
      ["Blue"],
      ["Green"],
      ["Orange"],
      ["Red"],
      ["Mattapan"],
      ["Red", "Mattapan"],
      ["Orange", "Mattapan"],
      ["Green-E", "Green-B", "Green-D"],
      ["Fake News"],
      ["Green-B", "Green-C", "Green-D", "Green-E"]
    ] do %>
      <div class="flex gap-sm p-2 items-center hover:bg-slate-600 hover:text-white cursor-pointer group/row">
        <.subway_route_pill route_ids={ids} class="group-hover/row:ring-slate-600" /> {inspect(ids)}
      </div>
    <% end %>
    <hr id="planned-disruptions" />
    <.disruptions disruptions={Disruptions.Subway.future_disruptions()} />
    """
  end

  defp example_table(assigns) do
    subway_status =
      SystemStatus.Subway.subway_status(assigns.alerts, assigns.now)

    assigns = assign(assigns, :subway_status, subway_status)

    ~H"""
    <table class="w-full">
      <tr>
        <th class="bg-slate-700 text-white p-2 text-lg">Homepage component</th>
        <th class="bg-slate-700 text-white p-2 text-lg">Alerts page component</th>
        <th class="bg-slate-700 text-white p-2 text-lg">Alerts data</th>
      </tr>
      <tr>
        <td class="bg-slate-600 p-2 w-1/3 align-top">
          <.homepage_subway_status subway_status={@subway_status} />
        </td>
        <td class="bg-slate-600 p-2 w-1/3 align-top">
          <.alerts_subway_status subway_status={@subway_status} />
        </td>
        <td class="bg-slate-600 p-2 w-1/3 align-top">
          {Phoenix.View.render_many(@alerts, DotcomWeb.AlertView, "_item.html", date_time: @now)}
        </td>
      </tr>
    </table>
    """
  end

  defp alerts_examples() do
    [
      %{alerts: []},
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :suspension,
            header: "Northbound Orange Line trains are suspended due to flooding",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Orange"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.now() |> Timex.set(hour: 20, minute: 30), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Southbound Orange Line trains will be delayed due to flooding at 8:30pm",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Orange"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Northbound Blue line trains are delayed due to an escaped whale from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Southbound Blue line trains are delayed due to an escaped otter from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :shuttle,
            header:
              "Mattapan trains are replaced with shuttles that are just driving on the tracks",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Mattapan"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Copley Station is closed due to an overabundance of books",
            informed_entity:
              Alerts.InformedEntitySet.new(
                GreenLine.branch_ids()
                |> Enum.map(&%Alerts.InformedEntity{route: &1})
              )
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Green line B branch is delayed due to protests at BU",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-B"}])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Green line B branch is delayed due to protests at BU",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-B"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Copley Station is closed due to an over-abundance of books",
            informed_entity:
              Alerts.InformedEntitySet.new(
                GreenLine.branch_ids()
                |> Enum.map(&%Alerts.InformedEntity{route: &1})
              )
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Green line B branch is delayed due to protests on Comm Ave",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-B"}])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :suspension,
            header: "Northbound Orange Line trains are suspended due to flooding",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Orange"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Southbound Orange Line trains are delayed due to flooding",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Orange"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :shuttle,
            header:
              "Mattapan trains are replaced with shuttles that are just driving on the tracks",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Mattapan"}])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header: "Green line B branch is delayed due to protests at BU",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-B"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Riverside station is closed due to a red line train on the tracks",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-D"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Alewife station is closed due to a green line train on the tracks",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Red"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :suspension,
            header:
              "Northbound Blue line trains are suspended due to an escaped whale from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Southbound Blue line trains are delayed due to an escaped otter from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :suspension,
            header:
              "Northbound Blue line trains are suspended due to an escaped whale from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Southbound Blue line trains are delayed due to an escaped otter from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Heath St station is closed due to an escaped shark from the aquarium",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-E"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Delays at Hynes Convention Center due to a gathering of escaped sea creatures",
            informed_entity:
              Alerts.InformedEntitySet.new([
                %Alerts.InformedEntity{route: "Green-B"},
                %Alerts.InformedEntity{route: "Green-C"},
                %Alerts.InformedEntity{route: "Green-D"}
              ])
          }
        ]
      },
      %{
        alerts: [
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :suspension,
            header:
              "Northbound Blue line trains are suspended due to an escaped whale from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Southbound Blue line trains are delayed due to an escaped otter from the aquarium",
            informed_entity: Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Blue"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header:
              "Cleveland Circle station is closed due to an escaped shark from the aquarium",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-C"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :station_closure,
            header: "Reservoir station is closed due to an escaped shark from the aquarium",
            informed_entity:
              Alerts.InformedEntitySet.new([%Alerts.InformedEntity{route: "Green-D"}])
          },
          %Alerts.Alert{
            active_period: [
              {Timex.beginning_of_day(Timex.now()), Timex.end_of_day(Timex.now())}
            ],
            effect: :delay,
            header:
              "Green line is experiencing delays due to a gathering of escaped sea creatures",
            informed_entity:
              Alerts.InformedEntitySet.new([
                %Alerts.InformedEntity{route: "Green-B"},
                %Alerts.InformedEntity{route: "Green-C"},
                %Alerts.InformedEntity{route: "Green-D"},
                %Alerts.InformedEntity{route: "Green-E"}
              ])
          }
        ]
      }
    ]
  end
end
