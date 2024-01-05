defmodule Dotcom.ReactWorkerTest do
  use ExUnit.Case, async: true

  alias Dotcom.React.Worker

  describe "start_link/0" do
    test "starts the process" do
      assert {:ok, _} = Worker.start_link()
    end
  end

  describe "init/1" do
    test "initialize the process" do
      assert {:ok, %{port: _}} = Worker.init(nil)
    end
  end
end
