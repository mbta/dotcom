defmodule CustomerSupportViewTest do
  use ExUnit.Case, async: true

  import DotcomWeb.CustomerSupportView

  describe "show_error_message/1" do
    test "is true when there are errors and the form is shown" do
      conn = %{assigns: %{show_form: true, errors: [:contact]}}

      assert show_error_message(conn)
    end

    test "is false when there are no errors" do
      conn = %{assigns: %{show_form: true, errors: []}}

      refute show_error_message(conn)
    end

    test "is false when the form is not shown" do
      conn = %{assigns: %{show_form: false, errors: [:error]}}

      refute show_error_message(conn)
    end
  end
end
