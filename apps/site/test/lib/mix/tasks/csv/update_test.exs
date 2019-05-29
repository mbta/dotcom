defmodule Csv.Update.ZonesTest do
  @moduledoc false
  use ExUnit.Case, async: true
  alias Mix.Tasks.Csv.Update.Zones
  alias Mix.Tasks.FileWrapper
  import Mock

  describe "run/1" do
    test "mix runs the csv and generates expected output" do
      with_mock FileWrapper,
        read_file: fn _file -> "place-brntn,2\r\n" end,
        write_file: fn _name, final -> final end do
        Zones.run([])

        assert_called(
          FileWrapper.write_file(
            Application.app_dir(:zones, "priv/crzones.csv"),
            "place-brntn,2\r\n38671,2\r\n70105,2\r\nBraintree,2\r\nBraintree-01,2\r\nBraintree-02,2\r\n"
          )
        )
      end
    end
  end
end
