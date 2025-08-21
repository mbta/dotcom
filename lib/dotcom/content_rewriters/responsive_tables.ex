defmodule Dotcom.ContentRewriters.ResponsiveTables do
  @moduledoc """

  Expects a table like this:

  <table>
    This is the caption
    <thead>
      <tr>
        <th scope="col">Zone</th>
        <th scope="col">One-Way</th>
        <th scope="col">Reduced One-Way</th>
        <th scope="col">Monthly Pass</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1A</td>
        <td>$2.20</td>
        <td>$1.75</td>
        <td>$80</td>
      </tr>
      <tr>
        <td>2</td>
        <td>$4.00</td>
        <td>$2.00</td>
        <td>$150</td>
      </tr>
    </tbody>
  </table>

  And turns it into this:

  <table class="responsive-table">
    <caption>This is the caption</caption>
    <thead>
      <tr>
        <th scope="col">Zone</th>
        <th scope="col">One-Way</th>
        <th scope="col">Reduced One-Way</th>
        <th scope="col">Monthly Pass</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Zone</th>
        <td>Zone 1A</td>
        <th>One-Way</th>
        <td>$2.25</td>
        <th>Reduced One-Way</th>
        <td>$1.10</td>
        <th>Monthly Pass</th>
        <td>$84.50</td>
      </tr>
      <tr>
        <th>Zone</th>
        <td>Zone 1</td>
        <th>One-Way</th>
        <td>$6.25</td>
        <th>Reduced One-Way</th>
        <td>$3.10</td>
        <th>Monthly Pass</th>
        <td>$200.25</td>
      </tr>
    </tbody>
  </table>
  """

  @doc """
  Transforms the table as necessary to be responsive. If the table is not in
  the expected form, the table is simply returned empty. The intention is that
  an improperly formatted table (indicating error in the use of the Drupal tool)
  should be immediately noticeable to the content creator.

  The table allows a bit of flexibility in handling the "caption". This is because
  the CMS sends the caption as <caption>...</caption>. However, HtmlSanitizeEx.html5 does
  not recognize the <caption> tag and removes it. I believe this is a bug since <caption>
  is a valid HTML5 tag. As such, it seems likely in the future the bug will be fixed
  and the tag may no longer be stripped.
  """
  def rewrite_table({"table", _attrs, _children} = table_element) do
    caption = table_caption(table_element)
    {thead, tbody} = table_sections(table_element)

    headers =
      thead
      |> Floki.find("tr th")
      |> Enum.map(fn {_, _, header} -> {"th", [], [Floki.text(header)]} end)

    trs =
      tbody
      |> Floki.find("tr")
      |> Enum.map(fn {"tr", _, tds} -> {"tr", [], Util.interleave(headers, tds)} end)

    {"table", [{"class", "c-media__element responsive-table"}],
     [
       {"caption", [], [caption]},
       thead,
       {"tbody", [], trs}
     ]}
  end

  defp table_caption({"table", _attrs, [caption | _]}) when is_binary(caption),
    do: String.trim(caption)

  defp table_caption({"table", _attrs, [{"caption", _, caption} | _]}), do: Floki.text(caption)
  defp table_caption(_), do: ""

  defp table_sections({"table", _attrs, children}) do
    thead = Enum.find(children, &match?({"thead", _, _}, &1))
    tbody = Enum.find(children, &match?({"tbody", _, _}, &1))

    if thead && tbody do
      {thead, tbody}
    else
      default_empty_table()
    end
  end

  defp default_empty_table, do: {{"thead", [], []}, {"tbody", [], []}}
end
