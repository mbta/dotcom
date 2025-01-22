defmodule MBTA.Api.ServicesTest do
  use ExUnit.Case, async: false

  import Mox

  alias MBTA.Api.Mock
  alias MBTA.Api.Services

  setup :set_mox_global
  setup :verify_on_exit!

  test "all/0 returns a list of services" do
    # Setup
    expect(Mock, :get_json, fn url, _ ->
      assert url == "/services/"

      []
    end)

    # Exercise
    services = Services.all()

    # Verify
    assert services == []
  end

  test "get/1 returns a service" do
    # Setup
    id = Faker.Internet.slug()

    expect(Mock, :get_json, fn url, _ ->
      assert url == "/services/#{id}"

      %{}
    end)

    # Exercise
    service = Services.get(id)

    # Verify
    assert service == %{}
  end
end
