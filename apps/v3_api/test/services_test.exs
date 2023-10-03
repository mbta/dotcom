defmodule V3Api.ServicesTest do
  use ExUnit.Case

  alias V3Api.Services

  @opts ["page[limit]": 1, sort: "id"]

  describe "all/1" do
    test "gets all services" do
      assert %JsonApi{data: [%JsonApi.Item{}]} = Services.all(@opts)
    end
  end

  describe "get/1" do
    test "gets the services by ID" do
      %JsonApi{data: [%JsonApi.Item{} = service]} = Services.get("canonical")
      assert service.id == "canonical"
    end
  end
end
