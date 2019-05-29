defmodule Layout.GenerateTest do
  @moduledoc false
  use ExUnit.Case, async: true
  alias Mix.Tasks.Layout.Generate
  import Mock

  describe "run/1" do
    test "mix runs the task and the generated template doesn't change" do
      output_folder = System.tmp_dir!() |> Path.join("layout-generate")

      on_exit(fn ->
        _ = File.rm_rf(output_folder)
      end)

      :ok = File.mkdir_p(output_folder)
      assert File.ls(output_folder) == {:ok, []}

      :ok = Generate.run(["--output-folder=#{output_folder}"])

      assert {:ok, files} = File.ls(Path.join(output_folder, "templates"))
      assert Enum.member?(files, "_header.html")
      assert Enum.member?(files, "_footer.html")
      assert Enum.member?(files, "layout.js")
      assert Enum.member?(files, "layout.css")

      assert {:ok, font_files} = File.ls(Path.join(output_folder, "fonts"))
      assert length(font_files) == 17

      path = Generate.beautify_file_path()
      assert path =~ "apps/site/assets/namespaced_header_footer/node_modules/.bin/js-beautify"
      assert File.exists?(path)
    end

    test "js_file_path points to the correct JS file" do
      path = Generate.js_file_path()
      assert path =~ "apps/site/assets/namespaced_header_footer/compiled/layout.js"
    end

    test "css_file_path points to the correct css file" do
      path = Generate.css_file_path()
      assert path =~ "apps/site/assets/namespaced_header_footer/compiled/layout.css"
    end

    test "assets_path points to the correct assets path" do
      path = Generate.assets_path()
      assert path =~ "apps/site/assets"
      assert File.exists?(path)
    end
  end

  describe "generate_html/1" do
    test "generates the expected html from a template file" do
      with_mock Phoenix.View, render_to_string: fn _, _, _ -> "<div><%= test =></div>" end do
        expected = {"test", "<div><%= test =></div>"}
        actual = Generate.generate_html("test")
        assert actual == expected
      end
    end

    test "renders _header.html" do
      assert {"_header.html", html} = Generate.generate_html("_header.html")
      assert {"header", _, _} = Floki.parse(html)
    end

    test "renders _footer.html" do
      assert {"_footer.html", html} = Generate.generate_html("_footer.html")
      assert {"footer", _, _} = Floki.parse(html)
    end
  end

  describe "transform_html/1" do
    test "transforms html to include mbta prefix in class" do
      expected = {"test", "<div class=\"mbta-test\"></div>"}
      actual = Generate.transform_html({"test", "<div class=\"test\"></div>"})
      assert actual == expected
    end

    test "transforms html to include mbta prefix in data-toggle" do
      expected = {"test", "<div data-toggle=\"mbta-test\">Content</div>"}
      actual = Generate.transform_html({"test", "<div data-toggle=\"test\">Content</div>"})
      assert actual == expected
    end

    test "transforms nested html to include mbta prefix" do
      expected =
        {"test",
         "<body><div class=\"mbta-test\"><a class=\"mbta-nav-bar-logo\" data-toggle=\"mbta-toggle\" href=\"/\">Logo</a></div></body>"}

      actual =
        Generate.transform_html(
          {"test",
           "<body><div class=\"test\"><a class=\"nav-bar-logo\" data-toggle=\"toggle\" href=\"/\">Logo</a></div></body>"}
        )

      assert actual == expected
    end
  end
end
