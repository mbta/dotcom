defmodule DotcomWeb.Components.TripPlannerFormTest do
  @moduledoc false
  use ExUnit.Case
  import Phoenix.LiveViewTest
  import DotcomWeb.Components.TripPlannerForm

  describe "input_form" do
    test "renders the needed inputs" do
      html =
        render_component(&input_form/1, %{
          id: "my_form"
        })

      assert html =~ ~s(<form action="/preview/trip-planner")

      assert html =~
               ~s(<div class="c-search-bar__autocomplete" data-placeholder="Enter a location" data-config="trip-planner">)

      assert html =~ ~s(name="plan[from])
      assert html =~ ~s(name="plan[to])
    end

    test "doesn't assign a form action if a submit handler provided" do
      html =
        render_component(&input_form/1, %{
          id: "my_form",
          phx_submit_handler: "something"
        })

      refute html =~ ~s(<form action="/preview/trip-planner")
    end

    test "listens for form validations" do
      pid = self()

      _ =
        render_component(&input_form/1, %{
          id: "my_form",
          do_validation: true,
          on_validated_pid: pid
        })

      assert_receive {:updated_form, nil}
    end

    test "gets form validations" do
      pid = self()

      from_lon = Faker.Address.longitude()
      from_lat = Faker.Address.latitude()

      from_params = %{
        "longitude" => from_lon,
        "latitude" => from_lat
      }

      to_lon = Faker.Address.longitude()
      to_lat = Faker.Address.latitude()

      to_params = %{
        "longitude" => to_lon,
        "latitude" => to_lat
      }

      _ =
        render_component(&input_form/1, %{
          id: "my_form",
          do_validation: true,
          on_validated_pid: pid,
          params: %{
            "from" => from_params,
            "to" => to_params
          }
        })

      assert_receive {:updated_form, data}

      assert %Dotcom.TripPlan.InputForm{
               from: %Dotcom.TripPlan.InputForm.Location{
                 latitude: ^from_lat,
                 longitude: ^from_lon
               },
               to: %Dotcom.TripPlan.InputForm.Location{
                 latitude: ^to_lat,
                 longitude: ^to_lon
               }
             } = data
    end
  end
end
