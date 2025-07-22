defmodule DotcomWeb.PaginationHelpersTest do
  use ExUnit.Case, async: true
  import DotcomWeb.PaginationHelpers

  @pagination %Dotcom.ResponsivePagination{
    current: 5,
    mobile_range: [4, 5, 6],
    next: 6,
    prefix: [1, "…"],
    previous: 4,
    range: [3, 4, 5, 6, 7],
    suffix: ["…", 10]
  }

  @link_context %{form: "search", path: "/search", params: %{"[a]" => "1", "[b][c]" => "2"}}

  @result "_responsive_pagination.html"
          |> render(pagination: @pagination, link_context: @link_context)
          |> Phoenix.HTML.safe_to_string()

  describe "render/2" do
    test "link built correctly" do
      expected_link = "search?offset=5"
      @result =~ expected_link
    end

    test "some pages were collapsed" do
      @result =~ ~s(<li class="pagination-collapsed hidden-sm-down">…</li>)
    end

    test "an active page was set" do
      @result =~ ~s(<li class="pagination-num active ">)
    end

    test "mobile links were hidden" do
      @result =~ ~s(<li class="pagination-num  hidden-sm-down">)
    end

    test "there are next and previous links" do
      @result =~ ~s(Next <i aria-hidden="true" class="fa fa-caret-right "></i>)
      @result =~ ~s(<i aria-hidden="true" class="fa fa-caret-left "></i> Previous</a>)
    end

    test "empty when there is not data to paginate" do
      actual =
        "_responsive_pagination.html"
        |> render(pagination: %Dotcom.ResponsivePagination{}, link_context: @link_context)
        |> Phoenix.HTML.safe_to_string()

      assert actual =~ "\n"
    end
  end
end
