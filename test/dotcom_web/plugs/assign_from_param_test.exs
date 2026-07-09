defmodule DotcomWeb.Plugs.AssignFromParamTest do
  use DotcomWeb.ConnCase, async: true

  alias DotcomWeb.Plugs.AssignFromParam

  describe "call/2" do
    test "raises error when the param name is missing", %{conn: conn} do
      opts = [fallback_fn: fn -> "fallback value" end]

      assert_raise KeyError, fn ->
        AssignFromParam.call(conn, opts)
      end
    end

    test "raises error when the fallback function is missing", %{conn: conn} do
      opts = [param: "param", validator_fn: fn _ -> {:ok, "validated value"} end]

      assert_raise KeyError, fn ->
        AssignFromParam.call(conn, opts)
      end
    end

    test "assigns fallback value when the given param is not present", %{conn: conn} do
      param_name = param_name()

      opts = [
        param: param_name,
        validator_fn: fn _ -> {:ok, "validated value"} end,
        fallback_fn: fn -> "fallback value" end
      ]

      conn = AssignFromParam.call(conn, opts)
      assigned_value = conn.assigns[String.to_atom(param_name)]
      assert assigned_value == "fallback value"
    end

    test "assigns fallback value when the param is present but invalid", %{conn: conn} do
      param_name = param_name()

      opts = [
        param: param_name,
        validator_fn: fn _ -> {:error, :invalid} end,
        fallback_fn: fn -> "fallback value" end
      ]

      conn = with_query_params(conn, %{param_name => "value"})
      conn = AssignFromParam.call(conn, opts)
      assigned_value = conn.assigns[String.to_atom(param_name)]
      assert assigned_value == "fallback value"
    end

    test "assigns value using the validator_fn when the param is present and valid", %{conn: conn} do
      param_name = param_name()

      opts = [
        param: param_name,
        validator_fn: fn value ->
          {:ok, String.graphemes(value)}
        end,
        fallback_fn: fn -> "fallback value" end
      ]

      param_value = Faker.Pokemon.name()

      conn = with_query_params(conn, %{param_name => param_value})
      conn = AssignFromParam.call(conn, opts)
      assigned_value = conn.assigns[String.to_atom(param_name)]
      {:ok, expected_value} = opts[:validator_fn].(param_value)
      assert assigned_value == expected_value
    end
  end

  defp with_query_params(conn, params) do
    conn
    |> Plug.Conn.fetch_query_params()
    |> Map.update(:query_params, params, &Map.merge(&1, params))
  end

  def param_name, do: Faker.Internet.slug()
end
