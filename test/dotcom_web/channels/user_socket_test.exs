defmodule DotcomWeb.UserSocketTest do
  use DotcomWeb.ChannelCase

  setup do
    %{socket: socket(%{})}
  end

  describe "connect/2" do
    test "returns socket", %{socket: socket} do
      assert {:ok, ^socket} = DotcomWeb.UserSocket.connect(%{}, socket)
    end
  end
end
