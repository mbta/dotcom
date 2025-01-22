defmodule Dotcom.Logster.SafeStringFormatterTest do
  @moduledoc false
  use ExUnit.Case, async: true

  import Dotcom.Logster.SafeStringFormatter

  describe "format/1" do
    test "does not crash on invalid binary data" do
      non_utf8_binary = <<226>>
      params = [field: %{"path" => [non_utf8_binary]}]
      rendered = format(params)

      assert is_binary(IO.iodata_to_binary(rendered))
    end

    test "formats many types of values" do
      params = [
        binary: "bin",
        float: 12.3456,
        atom: :atom,
        integer: 123,
        map: %{"a" => "b"}
      ]

      expected = ~s(binary=bin float=12.346 atom=atom integer=123 map={"a":"b"})
      assert IO.iodata_to_binary(format(params)) == expected
    end
  end
end
