defmodule Dotcom.UpcomingDepartures do
  @moduledoc """
  This module serves as an entrypoint for other parts of Dotcom to
  get information about realtime upcoming departures.
  """

  def upcoming_departures(args) do
    __MODULE__.Processor.upcoming_departures(args)
  end

  def trip_details(args) do
    __MODULE__.Processor.trip_details(args)
  end
end
