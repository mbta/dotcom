defmodule DotcomWeb.Plugs.CommonFaresTest do
  use DotcomWeb.ConnCase, async: true

  import DotcomWeb.Plugs.CommonFares

  alias Fares.Summary

  @opts init([])

  describe "init/1" do
    test "returns 4 summaries: subway, bus, subway monthly, CR" do
      assert [
               %Summary{
                 duration: :single_trip,
                 modes: [:subway | _]
               },
               %Summary{
                 duration: :single_trip,
                 modes: [:bus | _]
               },
               %Summary{
                 duration: :month,
                 modes: [:subway | _]
               },
               %Summary{
                 duration: :single_trip,
                 modes: [:commuter_rail | _]
               }
             ] = @opts
    end
  end

  describe "call/2" do
    test "assigns `common_fare_summaries`", %{conn: conn} do
      conn = call(conn, @opts)
      assert conn.assigns.common_fare_summaries == @opts
    end
  end
end
