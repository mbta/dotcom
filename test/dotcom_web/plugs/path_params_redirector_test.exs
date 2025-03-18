defmodule DotcomWeb.Plugs.PathParamsRedirectorTest do
  use DotcomWeb.ConnCase, async: true

  import Phoenix.ConnTest, only: [redirected_to: 2]

  alias DotcomWeb.Plugs.PathParamsRedirector

  describe "init/1" do
    test "passes along the redirect path when 'to' is defined" do
      opts = [to: Faker.Internet.domain_word()]
      assert PathParamsRedirector.init(opts) == opts
    end

    test "an exception is raised when 'to' is not defined" do
      assert_raise RuntimeError, ~r(Missing required to: option in redirect), fn ->
        PathParamsRedirector.init([])
      end
    end
  end

  describe "call/2" do
    test "keeps path params", %{
      conn: conn
    } do
      to = Faker.Internet.domain_word()
      path_param1 = Faker.Internet.domain_word()
      path_param2 = Faker.Internet.domain_word()

      conn = %{conn | path_params: %{"path_params" => [path_param1, path_param2]}}

      conn = PathParamsRedirector.call(conn, to: "/#{to}")

      assert redirected_to(conn, :moved_permanently) == "/#{to}/#{path_param1}/#{path_param2}"
    end

    test "works when there are no path params",
         %{
           conn: conn
         } do
      to = Faker.Internet.domain_word()

      conn = PathParamsRedirector.call(conn, to: "/#{to}")

      assert redirected_to(conn, :moved_permanently) == "/#{to}"
    end

    test "keeps query string", %{conn: conn} do
      to = Faker.Internet.domain_word()
      query_string = "#{Faker.Internet.domain_word()}=#{Faker.Internet.domain_word()}"

      conn = %{conn | query_string: query_string}

      conn = PathParamsRedirector.call(conn, to: "/#{to}")
      assert redirected_to(conn, :moved_permanently) == "/#{to}?#{query_string}"
    end
  end
end
