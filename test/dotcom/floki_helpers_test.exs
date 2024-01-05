defmodule Dotcom.FlokiHelpersTest do
  use ExUnit.Case, async: true

  import Dotcom.FlokiHelpers

  setup do
    {:ok, html} =
      Floki.parse_fragment("""
        <div><span class="highlight">Hello, this is some text</span></div>
        <div>
          <ul>
            <li>One</li>
            <li>Two</li>
          </ul>
        </div>
      """)

    %{html: html}
  end

  describe "traverse" do
    test "if function returns nil it returns all nodes unchanged", %{html: html} do
      expected = traverse(html, fn _ -> nil end)

      assert expected == [
               {"div", [], [{"span", [{"class", "highlight"}], ["Hello, this is some text"]}]},
               {"div", [],
                [
                  {"ul", [],
                   [
                     {"li", [], ["One"]},
                     {"li", [], ["Two"]}
                   ]}
                ]}
             ]
    end

    test "visitor function can replace text", %{html: html} do
      expected =
        traverse(html, fn node ->
          case node do
            "One" -> "Neo"
            _ -> nil
          end
        end)

      assert expected == [
               {"div", [], [{"span", [{"class", "highlight"}], ["Hello, this is some text"]}]},
               {"div", [],
                [
                  {"ul", [],
                   [
                     {"li", [], ["Neo"]},
                     {"li", [], ["Two"]}
                   ]}
                ]}
             ]
    end

    test "visitor function can replace subtree", %{html: html} do
      expected =
        traverse(html, fn node ->
          case node do
            {"ul", _, _} -> {"div", [], ["Not anymore!"]}
            _ -> nil
          end
        end)

      assert expected == [
               {"div", [], [{"span", [{"class", "highlight"}], ["Hello, this is some text"]}]},
               {"div", [],
                [
                  {"div", [], ["Not anymore!"]}
                ]}
             ]
    end
  end

  describe "remove_class/2" do
    test "classes are removed without affecting other attributes or existing classess" do
      element =
        {"div", [{"href", "#anchor"}, {"class", "class-to-remove good-one"}], ["Text content"]}

      assert {"div", [{"class", "good-one"} | _], _} = remove_class(element, "class-to-remove")

      assert {"div", [{"class", "class-to-remove good-one"} | _], _} =
               remove_class(element, "class-does-not-exist")
    end
  end
end
