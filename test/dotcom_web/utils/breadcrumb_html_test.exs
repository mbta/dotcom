defmodule DotcomWeb.Utils.BreadcrumbHTMLTest do
  use ExUnit.Case, async: true
  import DotcomWeb.Utils.BreadcrumbHTML
  alias Plug.Conn

  setup do
    {:ok, conn: %Conn{}}
  end

  describe "title_breadcrumbs/1" do
    test "returns the text for the last two CMS breadcrumbs, in reverse order, separated by pipes",
         %{conn: conn} do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
        %DotcomWeb.Utils.Breadcrumb{text: "Second", url: "/second"},
        %DotcomWeb.Utils.Breadcrumb{text: "Third", url: "/second/third"}
      ]

      conn = Conn.assign(conn, :breadcrumbs, breadcrumbs)

      breadcrumbs = conn |> title_breadcrumbs |> IO.iodata_to_binary()
      assert breadcrumbs =~ "Third | Second | MBTA"
    end

    test "returns the text for the last two static breadcrumbs, in reverse order, separated by pipes",
         %{conn: conn} do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "First", url: "/first"},
        %DotcomWeb.Utils.Breadcrumb{text: "Second", url: "/first/second"}
      ]

      conn = Conn.assign(conn, :breadcrumbs, breadcrumbs)

      breadcrumbs = conn |> title_breadcrumbs |> IO.iodata_to_binary()
      assert breadcrumbs =~ "Second | First | MBTA"
    end

    test "replaces Home text with MBTA abbreviation", %{conn: conn} do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
        %DotcomWeb.Utils.Breadcrumb{text: "First", url: "/first"}
      ]

      conn = Conn.assign(conn, :breadcrumbs, breadcrumbs)

      breadcrumbs = conn |> title_breadcrumbs |> IO.iodata_to_binary()
      assert breadcrumbs == "First | MBTA"
    end

    test "returns the MBTA's full name when breadcrumbs are empty", %{conn: conn} do
      conn = Conn.assign(conn, :breadcrumbs, [])
      breadcrumbs = conn |> title_breadcrumbs |> IO.iodata_to_binary()
      assert breadcrumbs == "MBTA - Massachusetts Bay Transportation Authority"
    end

    test "returns the MBTA's full name when the breadcrumbs key is not found", %{conn: conn} do
      breadcrumbs = conn |> title_breadcrumbs |> IO.iodata_to_binary()
      assert breadcrumbs == "MBTA - Massachusetts Bay Transportation Authority"
    end
  end

  describe "breadcrumb_trail/1" do
    test "generates safe html for breadcrumbs", %{conn: conn} do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
        %DotcomWeb.Utils.Breadcrumb{text: "Second", url: ""}
      ]

      conn = Conn.assign(conn, :breadcrumbs, breadcrumbs)

      assert breadcrumb_trail(conn) ==
               {:safe,
                ~s(<span>) <>
                  ~s(<a href="/">Home</a>) <>
                  ~s(<i class="fa fa-angle-right" aria-hidden="true"></i>) <>
                  ~s(</span>) <> ~s(Second)}
    end

    test "adds a link to the root path if one is not provided", %{conn: conn} do
      breadcrumbs = [%DotcomWeb.Utils.Breadcrumb{text: "Not Home", url: "/not-home"}]
      conn = Conn.assign(conn, :breadcrumbs, breadcrumbs)

      result = breadcrumb_trail(conn)

      assert Phoenix.HTML.safe_to_string(result) =~
               ~s(<span>) <>
                 ~s(<a href="/">Home</a>) <>
                 ~s(<i class="fa fa-angle-right" aria-hidden="true"></i>) <> ~s(</span>)
    end

    test "when the breadcrumbs are empty", %{conn: conn} do
      conn = Conn.assign(conn, :breadcrumbs, [])
      assert breadcrumb_trail(conn) == {:safe, ""}
    end

    test "when the breadcrumbs key is not found", %{conn: conn} do
      assert breadcrumb_trail(conn) == {:safe, ""}
    end
  end

  describe "build_html/1" do
    test "returns html for a breadcrumb" do
      breadcrumbs = [%DotcomWeb.Utils.Breadcrumb{text: "home", url: "sample"}]

      assert build_html(breadcrumbs) == [
               ~s(<a href="sample">home</a>)
             ]
    end

    test "separates each breadcrumb with an icon" do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
        %DotcomWeb.Utils.Breadcrumb{text: "Second", url: ""}
      ]

      [first_crumb, second_crumb] = build_html(breadcrumbs)

      assert first_crumb ==
               ~s(<span>) <>
                 ~s(<a href="/">Home</a>) <>
                 ~s(<i class="fa fa-angle-right" aria-hidden="true"></i>) <> ~s(</span>)

      assert second_crumb == "Second"
    end

    test "includes a 'collapse on mobile' class for breadcrumbs except the last two" do
      breadcrumbs = [
        %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
        %DotcomWeb.Utils.Breadcrumb{text: "Second", url: "/second"},
        %DotcomWeb.Utils.Breadcrumb{text: "Third", url: "/third"}
      ]

      [first_crumb, second_crumb, third_crumb] = build_html(breadcrumbs)

      assert first_crumb ==
               ~s(<span class="focusable-sm-down">) <>
                 ~s(<a href="/">Home</a>) <>
                 ~s(<i class="fa fa-angle-right" aria-hidden="true"></i>) <> ~s(</span>)

      refute Regex.match?(~r/focusable-sm-down/, second_crumb)
      refute Regex.match?(~r/focusable-sm-down/, third_crumb)
    end
  end

  describe "maybe_add_home_breadcrumb/1" do
    test "adds a link to the home path if one does not exist" do
      assert maybe_add_home_breadcrumb([]) == [
               %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"}
             ]
    end

    test "does not add a link to the home path if one already exists" do
      breadcrumb = %DotcomWeb.Utils.Breadcrumb{url: "/foo", text: "foo"}

      assert maybe_add_home_breadcrumb([breadcrumb]) == [
               %DotcomWeb.Utils.Breadcrumb{text: "Home", url: "/"},
               breadcrumb
             ]
    end
  end
end
