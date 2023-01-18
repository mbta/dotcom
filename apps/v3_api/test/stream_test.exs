defmodule V3Api.StreamTest do
  use ExUnit.Case, async: false
  alias Plug.Conn

  describe "build_options" do
    test "includes api key" do
      opts = V3Api.Stream.build_options(path: "/vehicles")
      assert Keyword.get(opts, :url) == "https://api-dev-green.mbtace.com/vehicles"
      assert <<_::binary>> = Keyword.get(opts, :api_key)
    end
  end

  describe "start_link" do
    test "starts a genserver that sends events" do
      assert {:ok, sses} =
               [
                 name: __MODULE__.SSES,
                 path: "/vehicles",
                 params: [
                   "fields[vehicle]": "direction_id,current_status,longitude,latitude,bearing",
                   include: "stop,trip"
                 ]
               ]
               |> V3Api.Stream.build_options()
               |> ServerSentEventStage.start_link()

      assert {:ok, pid} = V3Api.Stream.start_link(name: __MODULE__, subscribe_to: sses)

      assert [%V3Api.Stream.Event{}] =
               [pid]
               |> GenStage.stream()
               |> Enum.take(1)
    end

    test "handles api events" do
      bypass = Bypass.open()

      Bypass.expect(bypass, fn conn ->
        conn = Conn.send_chunked(conn, 200)

        data = %{
          "attributes" => [],
          "type" => "vehicle",
          "id" => "vehicle"
        }

        Conn.chunk(conn, "event: reset\ndata: #{Poison.encode!([data])}\n\n")
        Conn.chunk(conn, "event: update\ndata: #{Poison.encode!(data)}\n\n")
        Conn.chunk(conn, "event: add\ndata: #{Poison.encode!(data)}\n\n")
        Conn.chunk(conn, "event: remove\ndata: #{Poison.encode!(data)}\n\n")
        conn
      end)

      assert {:ok, sses} =
               [
                 base_url: "http://localhost:#{bypass.port}",
                 path: "/vehicles",
                 headers: []
               ]
               |> V3Api.Stream.build_options()
               |> ServerSentEventStage.start_link()

      assert {:ok, pid} = V3Api.Stream.start_link(name: __MODULE__, subscribe_to: sses)

      stream = GenStage.stream([pid])

      assert [
               %V3Api.Stream.Event{event: :reset},
               %V3Api.Stream.Event{event: :update},
               %V3Api.Stream.Event{event: :add},
               %V3Api.Stream.Event{event: :remove}
             ] = Enum.take(stream, 4)
    end
  end
end
