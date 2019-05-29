defmodule V3Api.ApplicationTest do
  use ExUnit.Case

  describe "start/2" do
    test "can start the application" do
      Application.stop(:v3_api)
      assert :ok = Application.start(:v3_api)
    end
  end
end
