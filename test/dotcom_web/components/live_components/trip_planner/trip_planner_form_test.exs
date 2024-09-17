defmodule DotcomWeb.Components.LiveComponents.TripPlannerFormTest do
  use ExUnit.Case, async: true

  import Phoenix.LiveViewTest
  alias DotcomWeb.Components.LiveComponents.TripPlannerForm

  test "renders the needed inputs" do
    html =
      render_component(TripPlannerForm, %{
        id: "my_form",
        form_name: "my_form"
      })

    assert html =~
             ~s(<div class="c-search-bar__autocomplete" data-placeholder="Enter a location" data-config="trip-planner">)

    assert html =~ ~s(name="input_form[from])
    assert html =~ ~s(name="input_form[to])
    assert html =~ ~s(name="input_form[datetime_type])
    assert html =~ ~s(name="input_form[wheelchair])
    assert html =~ ~s(name="input_form[modes])
  end
end
