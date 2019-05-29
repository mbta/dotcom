defmodule Backstop.Report.CleanTest do
  use ExUnit.Case
  alias Mix.Tasks.Backstop.Report.Clean
  import ExUnit.CaptureLog, only: [capture_log: 1]

  describe "run/1" do
    test "cleans all test folders" do
      parent_dir = System.tmp_dir!() |> Path.join("backstop")
      folder = Path.join(parent_dir, "clean_test")
      assert File.mkdir_p(folder) == :ok

      log =
        capture_log(fn ->
          assert Clean.run("") == :ok
        end)

      assert log =~ folder
      assert parent_dir |> File.ls!() |> Enum.filter(&File.dir?/1) == []
    end
  end
end
