defmodule DotcomWeb.Components.TripPlanner.InputFormTest do
  @moduledoc false
  use ExUnit.Case

  import Phoenix.LiveViewTest
  import DotcomWeb.Components.TripPlanner.InputForm

  alias Dotcom.TripPlan.InputForm

  describe "location_search_box/1" do
    test "uses AlgoliaAutocomplete hook" do
      output =
        render_component(&location_search_box/1, %{
          field: location_form_field(),
          name: Faker.App.name()
        })

      assert output =~ "phx-hook=\"AlgoliaAutocomplete\""
    end

    test "shows field label" do
      from_or_to = Faker.Util.pick(["From", "To"])

      output =
        render_component(&location_search_box/1, %{
          field: location_form_field(from_or_to),
          name: Faker.App.name()
        })

      assert output =~ "#{from_or_to}</legend>"
    end

    test "shows default placeholder" do
      output =
        render_component(&location_search_box/1, %{
          field: location_form_field(),
          name: Faker.App.name()
        })

      assert output =~ "Enter a location"
    end

    test "shows custom placeholder" do
      placeholder = Faker.Food.ingredient()

      output =
        render_component(&location_search_box/1, %{
          field: location_form_field(),
          name: Faker.App.name(),
          placeholder: placeholder
        })

      assert output =~ placeholder
    end
  end

  defp location_form_field(from_or_to \\ "To") do
    lat = Faker.Address.latitude()
    lon = Faker.Address.longitude()
    downcased = String.downcase(from_or_to)

    changeset =
      InputForm.changeset(%{
        [downcased] => %{
          "latitude" => "#{lat}",
          "longitude" => "#{lon}",
          "name" => Faker.Cat.breed(),
          "stop_id" => ""
        }
      })

    Phoenix.Component.to_form(changeset)[String.to_atom(downcased)]
  end
end
