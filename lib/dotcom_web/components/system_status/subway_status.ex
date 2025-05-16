defmodule DotcomWeb.Components.SystemStatus.SubwayStatus do
  @moduledoc """
  A component that renders the given `@statuses` in a table.
  """

  use DotcomWeb, :component

  import DotcomWeb.Components, only: [bordered_container: 1, unstyled_accordion: 1]
  import DotcomWeb.Components.Alerts, only: [embedded_alert: 1]
  import DotcomWeb.Components.SystemStatus.StatusRowHeading, only: [status_row_heading: 1]

  @max_rows 5
  @route_ids ["Red", "Orange", "Green", "Blue"]

  attr :subway_status, :any, required: true

  def homepage_subway_status(assigns) do
    assigns = assigns |> assign(:rows, status_to_rows(assigns.subway_status))

    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <a
          href={~p"/alerts/subway"}
          class="px-xs flex items-center gap-2 mb-sm font-heading font-bold text-gray-dark no-underline"
        >
          <.icon type="icon-svg" name="icon-mode-subway-default" class="shrink-0 h-7 w-7" />
          Subway Status
        </a>
      </:heading>
      <div class="border-b-[1px] border-gray-lightest">
        <a
          :for={row <- @rows}
          href={row.route_info.url}
          class={[
            "flex items-center",
            "hover:bg-brand-primary-lightest cursor-pointer group/row",
            "text-black no-underline font-normal"
          ]}
          data-test="status-row"
        >
          <.heading row={row} />

          <div class="border-t-[1px] border-gray-lightest self-stretch flex items-center">
            <.icon name="chevron-right" class="h-3 w-2 fill-gray-dark ml-3 mr-2 shrink-0" />
          </div>
        </a>
      </div>
    </.bordered_container>
    """
  end

  def alerts_subway_status(assigns) do
    assigns = assigns |> assign(:rows, status_to_alerts_rows(assigns.subway_status))

    ~H"""
    <.bordered_container hide_divider>
      <:heading>
        <div class="mb-sm">
          Current Status
        </div>
      </:heading>
      <div class="border-b-[1px] border-gray-lightest">
        <div :for={row <- @rows} data-test-row-route-info={inspect(row.route_info)}>
          <%= if row.alert do %>
            <.unstyled_accordion
              style={if(row.style.hide_route_pill, do: "--tw-divide-opacity: 0")}
              summary_class="hover:bg-brand-primary-lightest cursor-pointer group/row flex items-center grow text-nowrap"
              chevron_class="fill-gray-dark px-2 border-t-[1px] border-gray-lightest self-stretch flex items-center"
            >
              <:heading>
                <.heading row={row} />
              </:heading>
              <:content>
                <.embedded_alert alert={row.alert} />
              </:content>
            </.unstyled_accordion>
          <% else %>
            <.heading row={row} />
          <% end %>
        </div>
      </div>
    </.bordered_container>
    """
  end

  defp heading(assigns) do
    ~H"""
    <.status_row_heading
      hide_route_pill={@row.style.hide_route_pill}
      status={@row.status_entry.status}
      prefix={@row.status_entry.prefix}
      plural={@row.status_entry.plural}
      route_ids={[@row.route_info.route_id | @row.route_info.branch_ids]}
    />
    """
  end

  defp status_to_rows(subway_status) do
    @route_ids
    |> Enum.map(&{&1, subway_status |> Map.get(&1)})
    |> Enum.flat_map(&rows_for_route/1)
    |> maybe_collapse_rows()
    |> Enum.map(&add_url/1)
  end

  defp status_to_alerts_rows(subway_status) do
    @route_ids
    |> Enum.map(&{&1, subway_status |> Map.get(&1)})
    |> Enum.flat_map(&rows_for_route(&1, include_alert: true))
  end

  defp maybe_collapse_rows(rows) do
    rows
    |> if_too_large(&collapse_rows(:identical_route_info, &1))
    |> if_too_large(&collapse_rows(:disrupted_green_line, &1))
    |> if_too_large(&collapse_rows(:all_green_line, &1))
  end

  defp if_too_large(rows, collapse_fun) when length(rows) > @max_rows, do: collapse_fun.(rows)
  defp if_too_large(rows, _collapse_fun), do: rows

  defp collapse_rows(combine_criterion, [row1, row2 | rest_of_rows])
       when is_atom(combine_criterion) do
    if combine_rows?(combine_criterion, row1, row2) do
      collapse_rows(combine_criterion, [combine_rows(row1, row2) | rest_of_rows])
    else
      [row1 | collapse_rows(combine_criterion, [row2 | rest_of_rows])]
    end
  end

  defp collapse_rows(_combine_criterion, rows), do: rows

  defp combine_rows?(
         :identical_route_info,
         %{route_info: %{route_id: route_id1, branch_ids: branch_ids1}},
         %{route_info: %{route_id: route_id2, branch_ids: branch_ids2}}
       )
       when route_id1 == route_id2 and branch_ids1 == branch_ids2,
       do: true

  defp combine_rows?(
         :disrupted_green_line,
         %{route_info: %{route_id: "Green"}},
         %{route_info: %{route_id: "Green"}, status_entry: %{status: :normal}}
       ),
       do: false

  defp combine_rows?(
         :disrupted_green_line,
         %{route_info: %{route_id: "Green"}},
         %{route_info: %{route_id: "Green"}}
       ),
       do: true

  defp combine_rows?(
         :all_green_line,
         %{route_info: %{route_id: "Green"}},
         %{route_info: %{route_id: "Green"}}
       ),
       do: true

  defp combine_rows?(_criterion, _row1, _row2), do: false

  defp combine_rows(
         %{route_info: %{branch_ids: branch_ids1}} = row1,
         %{route_info: %{branch_ids: branch_ids2}} = _row2
       ) do
    combined_branch_ids =
      if Enum.empty?(branch_ids1) || Enum.empty?(branch_ids2) do
        []
      else
        (branch_ids1 ++ branch_ids2)
        |> Enum.uniq()
        |> Enum.sort()
      end

    row1
    |> Map.put(:status_entry, see_alerts_status())
    |> put_in([:route_info, :branch_ids], combined_branch_ids)
  end

  defp add_url(row) do
    route_id = route_id_from_route_info(row.route_info)
    sub_page = if normal?(row.status_entry), do: "line", else: "alerts"
    row |> put_in([:route_info, :url], ~p"/schedules/#{route_id}/#{sub_page}")
  end

  defp normal?(%{status: :normal}), do: true
  defp normal?(%{}), do: false

  defp route_id_from_route_info(%{branch_ids: [branch_id]}), do: branch_id
  defp route_id_from_route_info(%{route_id: route_id}), do: route_id

  defp rows_for_route({route_id, branches_with_statuses}, opts \\ []) do
    branches_with_statuses
    |> Enum.flat_map(&rows_for_branch_group(&1, opts))
    |> add_route_id(route_id)
  end

  defp rows_for_branch_group(
         %{branch_ids: branch_ids, status_entries: status_entries},
         opts
       ) do
    status_entries
    |> rows_for_status_entries(opts)
    |> add_branch_ids(branch_ids)
  end

  defp rows_for_status_entries(status_entries, opts) do
    show_prefix = show_prefix?(status_entries)

    status_entries
    |> Enum.flat_map(&rows_for_status_entry(&1, show_prefix, opts))
    |> show_first_route_pill()
  end

  defp rows_for_status_entry(%{alerts: []}, _, _) do
    [
      %{
        alert: nil,
        route_info: %{},
        status_entry: %{
          status: :normal,
          plural: false,
          prefix: nil
        },
        style: %{
          hide_route_pill: true
        }
      }
    ]
  end

  defp rows_for_status_entry(%{alerts: alerts} = status_entry, show_prefix, opts) do
    if Keyword.get(opts, :include_alert) do
      prefix = if show_prefix, do: prefix(status_entry), else: nil

      Enum.map(
        alerts,
        fn alert ->
          %{
            alert: alert,
            route_info: %{},
            status_entry: %{
              status: alert.effect,
              plural: false,
              prefix: prefix
            },
            style: %{
              hide_route_pill: true
            }
          }
        end
      )
    else
      status_entry
      |> Map.drop([:alerts])
      |> rows_for_status_entry(show_prefix, opts)
    end
  end

  defp rows_for_status_entry(status_entry, show_prefix, _) do
    %{status: status, multiple: multiple} = status_entry
    prefix = if show_prefix, do: prefix(status_entry), else: nil

    [
      %{
        route_info: %{},
        status_entry: %{
          status: status,
          plural: multiple,
          prefix: prefix
        },
        style: %{
          hide_route_pill: true
        }
      }
    ]
  end

  defp add_branch_ids(rows, branch_ids) do
    rows
    |> Enum.map(fn row -> row |> put_in([:route_info, :branch_ids], branch_ids) end)
  end

  defp add_route_id(rows, route_id) do
    rows
    |> Enum.map(fn row -> row |> put_in([:route_info, :route_id], route_id) end)
  end

  defp show_first_route_pill([first_entry | rest_of_entries]) do
    [
      first_entry |> put_in([:style, :hide_route_pill], false)
      | rest_of_entries
    ]
  end

  defp show_prefix?(status_entries) do
    status_entries |> Enum.any?(&future?/1)
  end

  defp future?(%{time: {:future, _}}), do: true
  defp future?(_), do: false

  defp prefix(%{time: :current}), do: "Now"
  defp prefix(%{time: {:future, time}}), do: Util.narrow_time(time)

  defp see_alerts_status(), do: %{status: :see_alerts, prefix: nil, plural: false}
end
