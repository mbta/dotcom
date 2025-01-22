defmodule Dotcom.ContentRewriterTest do
  use DotcomWeb.ConnCase, async: false

  import Dotcom.ContentRewriter
  import DotcomWeb.PartialView.SvgIconWithCircle, only: [svg_icon_with_circle: 1]
  import Mock
  import Phoenix.HTML, only: [raw: 1, safe_to_string: 1]

  alias Dotcom.ContentRewriters.ResponsiveTables
  alias DotcomWeb.PartialView.SvgIconWithCircle

  describe "rewrite" do
    test "it returns non-table content unchanged", %{conn: conn} do
      original = raw("<div><span>Nothing to see here.</span></div>")
      assert rewrite(original, conn) == original
    end

    test "it dispatches to the table rewriter if a table is present", %{conn: conn} do
      with_mock ResponsiveTables, rewrite_table: fn _ -> {"table", [], []} end do
        "<div><span>Foo</span><table>Foo</table></div>"
        |> raw()
        |> rewrite(conn)

        assert called(ResponsiveTables.rewrite_table({"table", [], ["Foo"]}))
      end
    end

    test "it handles a plain string", %{conn: conn} do
      original = raw("I'm a string")
      assert rewrite(original, conn) == original
    end

    test "the different rewriters work well together", %{conn: conn} do
      rewritten =
        ~s(
        <div>
          Test 1 {{ fa "test" }}, Test 2 {{ fa "test-two" }}
          <table>
            The caption
            <thead>
              <tr>
                <th>Head 1</th>
                <th>Head 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cell 1 {{ fa "cell" }}</td>
                <td>Cell 2 {{ unknown }}</td>
              </tr>
              <tr>
                <td>Cell 3 {{ mbta-circle-icon "bus" }}</td>
                <td>Cell 4</td>
              </tr>
            </tbody>
          </table>
        </div>
        )
        |> raw()
        |> rewrite(conn)

      expected = ~s(
        <div>
          Test 1 <i aria-hidden="true" class=" notranslate fa fa-test "></i>, Test 2 <i aria-hidden="true" class=" notranslate fa fa-test-two "></i>
          <figure class="c-media c-media--table">
            <div class="c-media__content">
              <table class="c-media__element responsive-table">
                <caption>The caption</caption>
                <thead>
                  <tr>
                    <th>Head 1</th>
                    <th>Head 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Head 1</th>
                    <td>Cell 1 <i aria-hidden="true" class=" notranslate fa fa-cell "></i></td>
                    <th>Head 2</th>
                    <td>Cell 2 {{ unknown }} </td>
                  </tr>
                  <tr>
                    <th>Head 1</th>
                    <td>Cell 3 #{svg_bus()}</td>
                    <th>Head 2</th>
                    <td>Cell 4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </figure>
        </div>
        )

      assert remove_whitespace(safe_to_string(rewritten)) == remove_whitespace(expected)
    end

    test "strips dimension attributes from images", %{conn: conn} do
      assert ~s(<img src="/image.png" alt="an image" width="600" height="400"/>)
             |> raw()
             |> rewrite(conn) ==
               {:safe, ~s(<img class="img-fluid" src="/image.png" alt="an image"/>)}
    end

    test "adds img-fluid to images that don't already have a class", %{conn: conn} do
      assert ~s(<img src="/image.png" alt="an image" />)
             |> raw()
             |> rewrite(conn) ==
               {:safe, ~s(<img class="img-fluid" src="/image.png" alt="an image"/>)}
    end

    test "adds img-fluid to images that do already have a class", %{conn: conn} do
      assert ~s(<img src="/image.png" alt="an image" class="existing-class" />)
             |> raw()
             |> rewrite(conn) ==
               {:safe, ~s(<img class="existing-class img-fluid" src="/image.png" alt="an image"/>)}
    end

    test "strips non-button elements from a paragraph with one .btn element and wraps it in a div",
         %{conn: conn} do
      assert ~s(<p><a class="btn btn-primary" href="/page">Button 1</a>&nbsp; </p>)
             |> raw()
             |> rewrite(conn) ==
               {:safe, ~s(<div class="c-inline-buttons"><a class="btn btn-primary" href="/page">Button 1</a></div>)}
    end

    test "strips non-button elements from a paragraph with two or more .btn elements and wraps them in a div",
         %{conn: conn} do
      assert ~s(<p data-paragraph-order="1" class="rainbow"><a class="btn btn-primary" href="/page1">Button 1</a>&nbsp;<a class="btn btn-secondary" href="/page2">Button 2</a></p>)
             |> raw()
             |> rewrite(conn) ==
               {:safe,
                ~s(<div class="c-inline-buttons"><a class="btn btn-primary" href="/page1">Button 1</a><a class="btn btn-secondary" href="/page2">Button 2</a></div>)}
    end

    test "replaces liquid object tags", %{conn: conn} do
      input = ~s(<p>Before <a href="#">{{ icon:subway-green }} link</a> after</p>)

      {:safe, output} = input |> raw() |> rewrite(conn)

      assert output =~
               ~r/^<p>Before <a href=\"#\"><span data-toggle=\"tooltip\" title=\"Green Line\">/

      assert output =~ ~r/<span class=\"notranslate c-svg__icon-green-line-small\"><svg/
      assert output =~ ~r/<\/svg><\/span><\/span> link<\/a> after<\/p>$/
    end

    test "generates small icons inside of ul and ol elements", %{conn: conn} do
      ul_input = ~s(<ul><li>Before <a href="#">{{ icon:subway-green }} link</a> after</li></ul>)
      ol_input = ~s(<ol><li>Before <a href="#">{{ icon:subway-green }} link</a> after</li></ol>)

      {:safe, ul_output} = ul_input |> raw() |> rewrite(conn)
      {:safe, ol_output} = ol_input |> raw() |> rewrite(conn)

      assert ul_output =~ ~r/c-svg__icon-green-line-small/
      assert ol_output =~ ~r/c-svg__icon-green-line-small/
    end

    test "wraps supported iframes as embedded media structures and sets aspect class for a supported source",
         %{conn: conn} do
      rewritten =
        ~s(<figure class="c-media c-media--embed c-media--wide">) <>
          ~s(<div class="c-media__content">) <>
          ~s(<div class="c-media__element c-media__element--fixed-aspect c-media__element--aspect-wide">) <>
          ~s(<iframe class="c-media__embed" src="https://www.youtu.be/abcd1234"></iframe></div></div></figure>)

      assert rewritten ==
               ~s(<iframe src="https://www.youtu.be/abcd1234"></iframe>)
               |> raw()
               |> rewrite(conn)
               |> safe_to_string()
    end

    test "adds wrapper and iframe classes to non-media-supported iframes", %{conn: conn} do
      assert ~s(<iframe class="something" src="https://www.anything.com"></iframe>)
             |> raw()
             |> rewrite(conn) ==
               {:safe,
                ~s(<div class="iframe-container"><iframe class="something iframe" src="https://www.anything.com"></iframe></div>)}
    end

    test "removes incompatible CMS media embed and replaces with empty div", %{conn: conn} do
      rewritten =
        ~s(<figure class="embedded-entity align-right">
          <div><div class="media media--type-image media--view-mode-quarter"><div class="media-content">
          <img alt="My Image Alt Text" class="image-style-max-650x650"
          src="/sites/default/files/styles/max_650x650/public/2018-01/hingham-ferry-dock-repair.png?itok=YwrRrgrG"
          typeof="foaf:Image" height="488" width="650"></div></div></div>
          <figcaption>Right aligned third</figcaption></figure>)
        |> raw()
        |> rewrite(conn)
        |> safe_to_string()

      assert rewritten == ~s(<div class="incompatible-media"></div>)
    end

    test "rebuilds CMS media embed: third-size image (deprecated: uses -half) | w/caption | aligned right | no link",
         %{conn: conn} do
      rewritten =
        ~s(<figure class="embedded-entity align-right">
          <div><div class="media media--type-image media--view-mode-third"><div class="media-content">
          <img alt="My Image Alt Text" class="image-style-max-650x650"
          src="/sites/default/files/styles/max_650x650/public/2018-01/hingham-ferry-dock-repair.png?itok=YwrRrgrG"
          typeof="foaf:Image" height="488" width="650"></div></div></div>
          <figcaption>Right aligned third</figcaption></figure>)
        |> raw()
        |> rewrite(conn)
        |> safe_to_string()

      assert rewritten =~
               ~s(<figure class="c-media c-media--image c-media--half c-media--align-right c-media--with-caption"><div class="c-media__content">)

      assert rewritten =~
               ~s(<img class="image-style-max-650x650 c-media__element img-fluid" alt="My Image Alt Text")

      assert rewritten =~
               ~s(src="/sites/default/files/styles/max_650x650/public/2018-01/hingham-ferry-dock-repair.png?itok=YwrRrgrG")

      assert rewritten =~
               ~s(<figcaption class="c-media__caption">Right aligned third</figcaption></div></figure>)
    end

    test "rebuilds CMS media embed: full-size image | w/o caption | no alignment | linked", %{
      conn: conn
    } do
      rewritten =
        ~s(<div class="embedded-entity"><a class="media-link"
          href="/projects/wollaston-station-improvements" target="_blank">
          <div class="media media--type-image media--view-mode-full"><div class="media-content">
          <img src="/sites/default/files/styles/max_2600x2600/public/2018-01/hingham-ferry-dock-repair.png?itok=NWs0V_7W"
          alt="My Image Alt Text" typeof="foaf:Image" class="image-style-max-2600x2600" height="756" width="1008"></div></div></a></div>)
        |> raw()
        |> rewrite(conn)
        |> safe_to_string()

      assert rewritten =~
               ~s(<figure class="c-media c-media--image c-media--wide"><div class="c-media__content">)

      assert rewritten =~
               ~s(<a class="c-media__link" href="/projects/wollaston-station-improvements" target="_blank">)

      assert rewritten =~ ~s(<img class="image-style-max-2600x2600 c-media__element img-fluid")

      assert rewritten =~
               ~s(src="/sites/default/files/styles/max_2600x2600/public/2018-01/hingham-ferry-dock-repair.png?itok=NWs0V_7W" alt="My Image Alt Text")

      refute rewritten =~ ~s(<figcaption)
    end
  end

  defp remove_whitespace(str), do: String.replace(str, ~r/[ \n]/, "")

  defp svg_bus do
    %SvgIconWithCircle{icon: :bus, size: :small}
    |> svg_icon_with_circle()
    |> safe_to_string()
  end
end
