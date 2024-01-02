defmodule SiteWeb.Plugs.LineSuspensions do
  @moduledoc """
    assigns line_suspensions map based on hard-coded values into @suspensions
    Could potentially add more detail e.g. which stops are served by shuttle,
    which alternative modes are available, etc.
  """

  @suspensions %{"Orange" => [~N[2022-08-19T21:00:00], ~N[2022-09-19T04:55:00]]}

  @behaviour Plug
  import Plug.Conn, only: [assign: 3]

  @impl true
  def init([]), do: [suspensions_fn: &__MODULE__.get_suspensions/0]

  @impl true
  def call(conn, suspensions_fn: suspensions_fn) do
    now = Map.get(conn.assigns, :date_time)

    unless now do
      raise RuntimeError, message: "Please use this Plug after assigning :date_time"
      conn
    else
      current_suspensions =
        Enum.filter(
          suspensions_fn.(),
          &is_active_suspension?(now, elem(&1, 1))
        )

      if !Enum.empty?(current_suspensions) do
        assign(conn, :line_suspensions, current_suspensions |> Enum.map(&Tuple.to_list(&1)))
      else
        conn
      end
    end
  end

  def get_suspensions, do: @suspensions

  defp is_active_suspension?(now, date_range) do
    [start_date, end_date] =
      Enum.map(date_range, &Util.convert_using_timezone(&1, "America/New_York"))

    Timex.between?(now, start_date, end_date)
  end
end
