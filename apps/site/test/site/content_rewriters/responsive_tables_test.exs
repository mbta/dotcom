defmodule Site.ContentRewriters.ResponsiveTablesTest do
  use ExUnit.Case

  import Site.ContentRewriters.ResponsiveTables

  describe "rewrite_table" do
    test "works with a full table" do
      rewritten =
        """
          <table>
            This is the caption
            #{thead()}
            #{tbody()}
          </table>
        """
        |> Floki.parse()
        |> rewrite_table

      assert rewritten ==
               {"table", [{"class", "c-media__element responsive-table"}],
                [
                  {"caption", [], ["This is the caption"]},
                  {"thead", [],
                   [
                     {"tr", [],
                      [
                        {"th", [{"scope", "col"}], ["Col1"]},
                        {"th", [{"scope", "col"}], ["Col2"]}
                      ]}
                   ]},
                  {"tbody", [],
                   [
                     {"tr", [],
                      [
                        {"th", [], ["Col1"]},
                        {"td", [], ["Cell1"]},
                        {"th", [], ["Col2"]},
                        {"td", [], ["Cell2"]}
                      ]},
                     {"tr", [],
                      [
                        {"th", [], ["Col1"]},
                        {"td", [], ["Cell3"]},
                        {"th", [], ["Col2"]},
                        {"td", [], ["Cell4"]}
                      ]}
                   ]}
                ]}
    end

    test "finds caption when it's a tag" do
      assert Floki.parse("<table><caption>Caption in a tag</caption></table>") ==
               {"table", [], [{"caption", [], ["Caption in a tag"]}]}

      rewritten =
        """
          <table>
            <caption>Caption in tag</caption>
            #{thead()}
            #{tbody()}
          </table>
        """
        |> Floki.parse()
        |> rewrite_table()

      assert [{"caption", [], ["Caption in tag"]}] = Floki.find(rewritten, "caption")
    end

    test "finds caption when it is not in a tag" do
      assert Floki.parse("<table>Caption outside of a tag</table>") ==
               {"table", [], ["Caption outside of a tag"]}

      assert """
               <table>
                 Caption outside of a tag
                 #{thead()}
                 #{tbody()}
               </table>
             """
             |> Floki.parse()
             |> rewrite_table()
             |> Floki.find("caption") == [{"caption", [], ["Caption outside of a tag"]}]
    end

    test "gracefully handles an invalid table" do
      rewritten =
        "<table></table>"
        |> Floki.parse()
        |> rewrite_table

      assert rewritten == {
               "table",
               [{"class", "c-media__element responsive-table"}],
               [
                 {"caption", [], [""]},
                 {"thead", [], []},
                 {"tbody", [], []}
               ]
             }
    end
  end

  def thead do
    """
      <thead>
        <tr>
          <th scope="col">Col1</th>
          <th scope="col">Col2</th>
        </tr>
      </thead>
    """
  end

  def tbody do
    """
      <tbody>
        <tr>
          <td>Cell1</td>
          <td>Cell2</td>
        </tr>
        <tr>
          <td>Cell3</td>
          <td>Cell4</td>
        </tr>
      </tbody>
    """
  end
end
