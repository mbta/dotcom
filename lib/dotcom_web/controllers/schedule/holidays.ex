defmodule DotcomWeb.ScheduleController.Holidays do
  @moduledoc false
  @behaviour Plug

  import Plug.Conn, only: [assign: 3]

  alias DotcomWeb.ViewHelpers

  @impl true
  def init(opts) do
    Keyword.put(opts || [], :holiday_limit, 3)
  end

  @impl true
  def call(%Plug.Conn{assigns: %{date: date}} = conn, opts) do
    holidays =
      date
      |> Holiday.Repo.following()
      |> Enum.take(opts[:holiday_limit])
      |> Enum.map(fn holiday ->
        Map.update!(holiday, :date, fn date -> ViewHelpers.format_full_date(date) end)
      end)

    assign(conn, :holidays, holidays)
  end

  def call(conn, _opts) do
    conn
  end
end
