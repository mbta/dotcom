defmodule Dotcom.PhoneNumberTest do
  use ExUnit.Case, async: true

  import Dotcom.PhoneNumber

  describe "pretty_format/1" do
    test "works with or without leading 1" do
      assert pretty_format("1-345-456-3456") == "345-456-3456"
      assert pretty_format("345-456-3456") == "345-456-3456"
    end

    test "strips other formatting" do
      assert pretty_format("(345) 456-3456") == "345-456-3456"
      assert pretty_format("345.456.3456") == "345-456-3456"
    end

    test "formats 3 digit numbers" do
      assert pretty_format("311") == "311"
    end

    test "returns the orignal if it can't be formatted" do
      assert pretty_format("0118 999 881 999 119 7253") == "0118 999 881 999 119 7253"
      assert pretty_format("(345) 456-3456 x1000") == "(345) 456-3456 x1000"
      assert pretty_format("222 3200") == "222 3200"
      assert pretty_format("") == ""
      assert pretty_format(nil) == ""
    end
  end

  describe "machine_format/1" do
    test "works with or without leading 1" do
      assert machine_format("1-345-456-3456") == "+1-345-456-3456"
      assert machine_format("345-456-3456") == "+1-345-456-3456"
    end

    test "strips other formatting" do
      assert machine_format("(345) 456-3456") == "+1-345-456-3456"
      assert machine_format("345.456.3456") == "+1-345-456-3456"
    end

    test "formats 3 digit numbers" do
      assert machine_format("311") == "311"
    end

    test "returns nil if it can't be formatted" do
      assert machine_format("0118 999 881 999 119 7253") == nil
      assert machine_format("222 3200") == nil
      assert machine_format("string") == nil
      assert machine_format("") == nil
      assert machine_format(nil) == nil
    end
  end

  describe "aria_format/1" do
    test "works with or without leading 1" do
      assert aria_format("1-345-456-3456") == "3 4 5. 4 5 6. 3 4 5 6"
      assert aria_format("345-456-3456") == "3 4 5. 4 5 6. 3 4 5 6"
    end

    test "strips other formatting" do
      assert aria_format("(345) 456-3456") == "3 4 5. 4 5 6. 3 4 5 6"
      assert aria_format("345.456.3456") == "3 4 5. 4 5 6. 3 4 5 6"
    end

    test "formats 3 digit numbers" do
      assert aria_format("311") == "3 1 1"
    end

    test "returns nil if it can't be formatted" do
      assert aria_format("0118 999 881 999 119 7253") == nil
      assert aria_format("222 3200") == nil
      assert aria_format("") == nil
      assert aria_format(nil) == nil
    end
  end
end
