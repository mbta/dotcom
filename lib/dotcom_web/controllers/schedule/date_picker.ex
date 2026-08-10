defmodule DotcomWeb.ScheduleController.DatePicker do
  use Plug.Builder

  import UrlHelpers, only: [update_url: 2]

  alias Plug.Conn

  @schedules_repo Application.compile_env!(:dotcom, :repo_modules)[:schedules]

  plug(:assign_date_select)
  plug(:build_calendar)

  @spec assign_date_select(Conn.t(), []) :: Conn.t()
  def assign_date_select(conn, []) do
    assign(conn, :date_select, show_datepicker?(conn))
  end

  @doc "If the date selector is open, build the calendar"
  @spec build_calendar(Conn.t(), []) :: Conn.t()
  def build_calendar(%Conn{assigns: %{date: date}} = conn, []) do
    case shifted_date(conn) do
      {:ok, {shift, shifted_date}} ->
        holidays = Holiday.Repo.holidays_in_month(shifted_date)

        calendar =
          BuildCalendar.build(
            date,
            Util.service_date(),
            holidays,
            &update_url(conn, &1),
            shift: shift,
            end_date: @schedules_repo.end_of_rating()
          )

        assign(conn, :calendar, calendar)

      {:error, _} ->
        DotcomWeb.ControllerHelpers.redirect_sans_param(conn, "shift")
    end
  end

  @spec show_datepicker?(Conn.t()) :: boolean
  defp show_datepicker?(%Conn{query_params: %{"date_select" => "true"}}), do: true
  defp show_datepicker?(%Conn{}), do: false

  # avoid shifting to an invalid date
  @spec shifted_date(Conn.t()) :: {:ok, {integer, Date.t()}} | {:error, term()}
  defp shifted_date(%Conn{assigns: %{date: date}, query_params: %{"shift" => str}}) do
    with {:ok, shift} <- parsed_shift(str),
         {:ok, shifted_date} <- valid_shifted_date(date, shift) do
      {:ok, {shift, shifted_date}}
    end
  end

  defp shifted_date(conn), do: {:ok, {0, conn.assigns.date}}

  defp parsed_shift(str) do
    case Integer.parse(str) do
      {integer, ""} -> {:ok, integer}
      _ -> {:error, :invalid_shift}
    end
  end

  defp valid_shifted_date(date, month_shift) do
    shifted_date = Date.shift(date, month: month_shift)

    if Timex.is_valid?(shifted_date) do
      {:ok, shifted_date}
    else
      {:error, :invalid_date}
    end
  end
end
