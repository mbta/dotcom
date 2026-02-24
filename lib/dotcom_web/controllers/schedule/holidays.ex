defmodule DotcomWeb.Schedule.Holidays do
  @moduledoc """
  Gets the next few holidays
  """

  import Plug.Conn

  alias DotcomWeb.ViewHelpers

  def assign_next_holidays(%Plug.Conn{assigns: %{date: date}} = conn, _) do
    holidays =
      date
      |> Holiday.Repo.following()
      |> Enum.take(3)
      |> Enum.map(fn holiday ->
        Map.update!(holiday, :date, fn date -> ViewHelpers.format_full_date(date) end)
      end)

    assign(conn, :holidays, holidays)
  end

  def assign_next_holidays(conn, _), do: conn
end
