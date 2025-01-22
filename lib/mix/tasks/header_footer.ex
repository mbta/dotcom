if Mix.env() in [:dev, :test] do
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
    - assets/export-headerfooter.ts
    - assets/css/export-headerfooter.scss
    - assets/webpack.config.export-headerfooter.js
    """
    use Mix.Task
    use Wallaby.DSL

    @css_prefix "mbta__dotcomchrome__"
    @languages [
      {"en", "English"},
      {"es", "Spanish"},
      {"zh-CN", "Chinese (Simplified)"},
      {"pt", "Portuguese"}
    ]

    @impl Mix.Task
    def run(_) do
      IO.puts("#{IO.ANSI.magenta()}Starting Wallaby.")
      {:ok, _} = Application.ensure_all_started(:wallaby)

      tasks =
        Enum.map(@languages, fn {lang_code, lang_name} ->
          Task.async(fn ->
            IO.puts("#{IO.ANSI.cyan()}Starting #{lang_name}")
            make_markup(lang_code)
            IO.puts("#{IO.ANSI.cyan()}Ending #{lang_name}")
          end)
        end)

      _ = Task.await_many(tasks, :infinity)

      IO.puts("#{IO.ANSI.magenta()}Done running everything.")

      :ok = webpack([])
      make_zip()
    end

    defp click_lang(_, "en"), do: nil

    defp click_lang(dropdown, lang_code) do
      dropdown
      |> click(:middle)
      |> find(Query.css("option[data-lang='#{lang_code}']"), fn option ->
        Element.click(option)
        # Translations take so long...
        :timer.sleep(90_000)
      end)
    end

    defp make_markup(lang_code) do
      session = new_session()

      html =
        session
        |> visit("https://dev.mbtace.com/menu")
        |> find(
          Query.css("header .custom-language-selector"),
          &click_lang(&1, lang_code)
        )
        |> page_source()

      {:ok, html_tree} = Floki.parse_document(html)

      :ok =
        write_mbta_file({:header, lang_code, Floki.find(html_tree, ".m-menu--cover, .header--new")})

      :ok =
        write_mbta_file({:footer, lang_code, Floki.find(html_tree, ".m-footer__outer-background")})

      close_session(session)
    end

    defp new_session do
      {:ok, session} =
        Wallaby.start_session(
          readiness_timeout: 60_000,
          capabilities: %{
            chromeOptions: %{
              args: [
                "--no-sandbox",
                "window-size=1280,800",
                "--headless"
              ]
            },
            javascriptEnabled: true,
            nativeEvents: true,
            detach: true
          }
        )

      session
    end

    defp close_session(session) do
      Wallaby.end_session(session)
    end

    defp make_zip do
      path = "export/"
      files = create_files_list(path)
      Application.ensure_all_started(:timex)
      ts = DateTime.to_iso8601(DateTime.utc_now())
      zip_file_path = "headerfooter-#{ts}.zip"
      :zip.create(to_charlist(zip_file_path), files)
      IO.puts("#{IO.ANSI.magenta()}zip file generated at #{zip_file_path}.")
      {:ok, _files} = File.rm_rf("export")
    end

    defp strip_base_path(nil, filename_path), do: filename_path

    defp strip_base_path(base_path, filename_path) do
      String.replace_leading(filename_path, base_path, "")
    end

    defp append_file_and_filename(filename_path, base_path, acc) do
      filename = strip_base_path(base_path, filename_path)
      [{String.to_charlist(filename), File.read!(filename_path)} | acc]
    end

    defp files_list_reducer(filename, path, base_path, acc) do
      filename_path = Path.join(path, filename)

      if File.dir?(filename_path),
        do: acc ++ create_files_list(File.ls!(filename_path), filename_path, base_path),
        else: append_file_and_filename(filename_path, base_path, acc)
    end

    defp create_files_list(path) do
      # thanks https://stackoverflow.com/a/44734142
      create_files_list(File.ls!(path), path)
    end

    defp create_files_list(paths, path) do
      create_files_list(paths, path, path)
    end

    defp create_files_list(paths, path, base_path) do
      Enum.reduce(paths, [], &files_list_reducer(&1, path, base_path, &2))
    end

    defp write_mbta_file({header_or_footer, lang_code, markup}) do
      html =
        markup
        |> update_links()
        |> remove_search_bar()
        |> remove_language_selector()
        |> edit_classnames()
        |> Floki.raw_html(encode: true, pretty: false)

      IO.puts("#{IO.ANSI.yellow()}writing #{header_or_footer} HTML (#{lang_code})")

      :ok = File.mkdir_p("export")
      filename_suffix = if lang_code == "en", do: "", else: "-#{String.downcase(lang_code)}"
      File.write("export/#{header_or_footer}#{filename_suffix}.html", html)
    end

    # Make relative links absolute.
    # Standard links open within the same window and include rel="noreferrer"
    defp handle_internal_link(link) do
      # IO.puts(" * updating relative link")

      [link]
      |> Floki.attr("a", "href", fn href -> "https://www.mbta.com" <> href end)
      |> Floki.attr("a", "rel", fn _ -> "noopener" end)
    end

    # External links should have target='_blank' and rel='noopener noreferrer'
    defp handle_external_link(link) do
      # IO.puts(" * modifying external link")

      [link]
      |> Floki.attr("a", "rel", fn _ -> "noopener noreferrer" end)
      |> Floki.attr("a", "target", fn _ -> "_blank" end)
    end

    defp process_link(link) do
      case_result =
        case Floki.attribute(link, "href") do
          ["/" <> _page] -> handle_internal_link(link)
          ["https://" <> _url] -> handle_external_link(link)
          ["http://" <> _url] -> handle_external_link(link)
          _ -> [link]
        end

      List.first(case_result)
    end

    defp update_links(tree) do
      # IO.puts("#{IO.ANSI.blue()}traversing all links")

      Floki.traverse_and_update(tree, fn
        {"a", _attrs, _children} = link -> process_link(link)
        other -> other
      end)
    end

    defp remove_search_bar(html_tree) do
      # IO.puts("#{IO.ANSI.magenta()}removing search bar")
      html_tree
      |> Floki.find_and_update(".search-wrapper > div", fn _ -> :delete end)
      |> Floki.find_and_update("#navmenu m-menu__search", fn _ -> :delete end)
      |> Floki.find_and_update("#search-header-mobile__announcer", fn _ -> :delete end)
      |> Floki.find_and_update("#search-header-mobile__input-autocomplete-results", fn _ ->
        :delete
      end)
      |> Floki.find_and_update("[id^=search]", fn _ -> :delete end)
    end

    defp remove_language_selector(html_tree) do
      # IO.puts("#{IO.ANSI.magenta()}removing Google Translate stuff")

      html_tree
      |> Floki.find_and_update(".m-menu__language", fn _ -> :delete end)
      |> Floki.find_and_update("#google_translate_element", fn _ -> :delete end)
      |> Floki.find_and_update("#custom-language-menu-mobile", fn _ -> :delete end)
      |> Floki.find_and_update("#custom-language-button-mobile", fn _ -> :delete end)
      |> Floki.find_and_update("script", fn _ -> :delete end)
    end

    defp edit_classnames(html_tree) do
      # IO.puts("#{IO.ANSI.magenta()}appending prefix to class names")

      Floki.traverse_and_update(html_tree, fn
        {tag, attrs, children} when is_list(attrs) ->
          updated_attrs =
            Enum.map(attrs, fn
              {"class", class_names} ->
                updated_class_names =
                  class_names
                  |> String.split()
                  |> Enum.map_join(" ", &"#{@css_prefix}#{&1}")

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
          cd: "assets"
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
end
