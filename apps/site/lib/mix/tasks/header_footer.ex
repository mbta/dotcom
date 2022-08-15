defmodule Mix.Tasks.Export.HeaderFooter do
  @moduledoc """

  mix export.header_footer

  Exports the HTML, CSS, JavaScript, fonts, and images needed to render the website header and footer as a .zip file. List of files (hashes subject to change):

  - fonts/
      (all font files)
  - images/
      (images)
  - favicon.ico
  - footer.html
  - head.html
  - header.b2fee8c6f272e94d70dd.js
  - header.b2fee8c6f272e94d70dd.js.map
  - header.html
  - scripts.html
  - styles.105dc30b074592c46ad9.css
  - styles.105dc30b074592c46ad9.css.map
  - styles.1d0bb3f99e53cb784f6b.min.css
  - styles.1d0bb3f99e53cb784f6b.min.css.map

  Depends on these files and configuration:
  - apps/site/assets/export-headerfooter.ts
  - apps/site/assets/css/export-headerfooter.scss
  - apps/site/assets/webpack.config.export-headerfooter.js
  """
  use Mix.Task

  @css_prefix "mbta__dotcomchrome__"

  @impl Mix.Task
  def run(_) do
    # needed for HTTPoison to work
    _ = Application.ensure_all_started(:hackney)

    response =
      case HTTPoison.get("http://localhost:4001", hackney: []) do
        {:ok, response} ->
          response

        _ ->
          {:ok, response} = HTTPoison.get("https://www.mbta.com/", hackney: [])
          response
      end

    get_mbta_tree(response)
    :ok = webpack([])
    make_zip()
  end

  defp make_zip do
    path = "export/"
    files = create_files_list(path)
    Application.ensure_all_started(:timex)
    ts = Timex.now() |> DateTime.to_iso8601()
    zip_file_path = "headerfooter-#{ts}.zip"
    :zip.create(to_charlist(zip_file_path), files)
    IO.puts("#{IO.ANSI.magenta()}zip file generated at #{zip_file_path}.")
    {:ok, _files} = File.rm_rf("export")
  end

  defp create_files_list(path) do
    # thanks https://stackoverflow.com/a/44734142
    create_files_list(File.ls!(path), path)
  end

  defp create_files_list(paths, path) do
    create_files_list(paths, path, path)
  end

  defp create_files_list(paths, path, base_path) do
    Enum.reduce(paths, [], fn filename, acc ->
      filename_path = Path.join(path, filename)

      if File.dir?(filename_path) do
        acc ++ create_files_list(File.ls!(filename_path), filename_path, base_path)
      else
        filenm =
          if base_path,
            do: String.replace_leading(filename_path, base_path, ""),
            else: filename_path

        [{String.to_charlist(filenm), File.read!(filename_path)} | acc]
      end
    end)
  end

  defp get_mbta_tree(response) do
    200 = response.status_code
    {:ok, tree} = Floki.parse_document(response.body)

    html =
      tree
      |> Floki.find(".m-menu--cover, .header--new, .m-footer")
      |> update_links()
      |> remove_search_bar()
      |> remove_language_selector()
      |> edit_classnames()

    IO.puts("#{IO.ANSI.yellow()}writing HTML")

    header_html =
      Floki.find(html, ".#{@css_prefix}m-menu--cover, .#{@css_prefix}header--new")
      |> Floki.raw_html(encode: true, pretty: false)

    footer_html =
      Floki.find(html, ".#{@css_prefix}m-footer") |> Floki.raw_html(encode: true, pretty: false)

    File.mkdir_p("export")
    :ok = File.write("export/header.html", header_html)
    :ok = File.write("export/footer.html", footer_html)

    IO.puts("#{IO.ANSI.green()}done.")
  end

  # Make relative links absolute.
  # Standard links open within the same window and include rel="noreferrer"
  defp handle_internal_link(link) do
    IO.puts(" * updating relative link")

    [link]
    |> Floki.attr("a", "href", fn href -> "https://www.mbta.com" <> href end)
    |> Floki.attr("a", "rel", fn _ -> "noopener" end)
  end

  # External links should have target='_blank' and rel='noopener noreferrer'
  defp handle_external_link(link) do
    IO.puts(" * modifying external link")

    [link]
    |> Floki.attr("a", "rel", fn _ -> "noopener noreferrer" end)
    |> Floki.attr("a", "target", fn _ -> "_blank" end)
  end

  defp process_link(link) do
    case Floki.attribute(link, "href") do
      ["/" <> _page] -> handle_internal_link(link)
      ["https://" <> _url] -> handle_external_link(link)
      ["http://" <> _url] -> handle_external_link(link)
      _ -> [link]
    end
    |> List.first()
  end

  defp update_links(tree) do
    IO.puts("#{IO.ANSI.blue()}traversing all links")

    Floki.traverse_and_update(tree, fn
      {"a", _attrs, _children} = link -> process_link(link)
      other -> other
    end)
  end

  defp remove_search_bar(html_tree) do
    IO.puts("#{IO.ANSI.magenta()}removing search bar")
    Floki.find_and_update(html_tree, ".search-wrapper > div", fn _ -> :delete end)
  end

  defp remove_language_selector(html_tree) do
    IO.puts("#{IO.ANSI.magenta()}removing Google Translate stuff")

    Floki.find_and_update(html_tree, "#m-menu__language", fn _ -> :delete end)
    |> Floki.find_and_update("#google_translate_element", fn _ -> :delete end)
    |> Floki.find_and_update("#custom-language-menu-mobile", fn _ -> :delete end)
    |> Floki.find_and_update("#custom-language-button-mobile", fn _ -> :delete end)
    |> Floki.find_and_update("script", fn _ -> :delete end)
  end

  defp edit_classnames(html_tree) do
    IO.puts("#{IO.ANSI.magenta()}appending prefix to class names")

    Floki.traverse_and_update(html_tree, fn
      {tag, attrs, children} when is_list(attrs) ->
        updated_attrs =
          Enum.map(attrs, fn
            {"class", class_names} ->
              IO.inspect(class_names, label: "\tediting classes on <#{tag}>")

              updated_class_names =
                String.split(class_names)
                |> Enum.map(&"#{@css_prefix}#{&1}")
                |> Enum.join(" ")

              {"class", updated_class_names}

            other ->
              other
          end)

        {tag, updated_attrs, children}

      node ->
        node
    end)
  end

  defp webpack(_args) do
    IO.puts(" * starting webpack")

    {message, status} =
      System.cmd(
        "npx",
        [
          "webpack",
          "--config",
          "webpack.config.export-headerfooter.js",
          "--output-path",
          "../../../export"
        ],
        cd: "apps/site/assets"
      )

    IO.puts(" * evaluating webpack result")

    case status do
      0 ->
        IO.puts(" * webpack did ok")
        :ok

      _ ->
        IO.puts(message)
        IO.puts(" * webpack did not ok")
        :error
    end
  end
end
