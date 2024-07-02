defmodule Alerts.InformedEntityTest do
  use ExUnit.Case, async: true

  alias Alerts.InformedEntity

  describe "activities/0" do
    test "returns a list" do
      assert is_list(InformedEntity.activities())
    end
  end
end
