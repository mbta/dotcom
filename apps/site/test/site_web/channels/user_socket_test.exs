defmodule SiteWeb.UserSocketTest do
  use SiteWeb.ChannelCase

  setup do
    %{socket: socket(%{})}
  end

  describe "connect/2" do
    test "returns socket", %{socket: socket} do
      assert {:ok, ^socket} = SiteWeb.UserSocket.connect(%{}, socket)
    end
  end
end
