defmodule MBTA.Api.ServicesTest do
  use ExUnit.Case

  alias MBTA.Api.Services

  @opts ["page[limit]": 1, sort: "id"]

  describe "all/1" do
    test "gets all services (for a given filter)" do
      assert %JsonApi{data: [%JsonApi.Item{}]} = Services.all(Keyword.put(@opts, :route, "Red"))
    end
  end

  describe "get/1" do
    test "gets the services by ID" do
      %JsonApi{data: [%JsonApi.Item{} = service]} = Services.get("canonical")
      assert service.id == "canonical"
    end
  end
end
