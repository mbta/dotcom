defmodule Mix.Tasks.Layout.Generate do
  use Mix.Task
  use Phoenix.View, root: "lib/site_web/templates"
  require SiteWeb.LayoutView
  require Floki

  @output_folder Application.app_dir(:site, "priv/compiled_header_footer")

  def run(args) do
    {opts, [], []} = OptionParser.parse(args, switches: [output_folder: :string])

    output_folder = Keyword.get(opts, :output_folder, @output_folder)
    template_folder = Path.join(output_folder, "templates")
    files = ["_header.html", "_footer.html"]
    :ok = File.mkdir_p(template_folder)

    :ok = File.mkdir_p!(Path.join(output_folder, "fonts"))
    {:ok, _} = File.cp_r(fonts_path(), Path.join(output_folder, "fonts"))

    {:ok, _} = Application.ensure_all_started(:site)

    {_, 0} = System.cmd("npm", ["install"], cd: assets_path())

    [:ok, :ok] =
      files
      |> Enum.map(&generate_html/1)
      |> Enum.map(&transform_html/1)
      |> Enum.map(&write_to_file(&1, template_folder))

    :ok = Enum.each(files, &beautify_html(&1, template_folder))

    {_, 0} = run_brunch()

    :ok = File.cp(js_file_path(), Path.join(template_folder, "layout.js"))
    :ok = File.cp(css_file_path(), Path.join(template_folder, "layout.css"))
  end

  def generate_html(file_name) do
    assigns = %{
      exclude_dropdowns: true,
      exclude_google_translate: true,
      conn: SiteWeb.Endpoint
    }

    html = Phoenix.View.render_to_string(SiteWeb.LayoutView, file_name, assigns)
    {file_name, html}
  end

  def transform_html({file_name, html}) do
    transformed_html =
      html
      |> Floki.parse()
      |> transform(&rewrite_attr("data-toggle", &1))
      |> transform(&rewrite_attr("class", &1))
      |> Floki.raw_html()

    {file_name, transformed_html}
  end

  def rewrite_attr(attr, {name, attrs}) when is_list(attrs) do
    {rest, attr_rest} = Enum.split_while(attrs, fn {k, _v} -> k !== attr end)

    case attr_rest do
      [] -> {name, attrs}
      [{^attr, val} | final] -> {name, [{attr, do_prefix(val)} | rest ++ final]}
    end
  end

  def transform({name, attrs, rest}, fun) do
    {new_name, new_attrs} = fun.({name, attrs})
    {new_name, new_attrs, Enum.map(rest, &transform(&1, fun))}
  end

  def transform(other, _fun), do: other

  defp do_prefix(attr) do
    prefixed =
      attr
      |> String.split()
      |> Enum.map(fn y -> ["mbta-", y, " "] end)

    num_elements = length(prefixed)

    case num_elements do
      1 ->
        List.delete_at(List.first(prefixed), 2)

      _ ->
        {last, beg} = List.pop_at(prefixed, num_elements - 1)
        [beg | List.delete_at(last, 2)]
    end
  end

  defp write_to_file({file_name, html}, output_folder) do
    output_folder
    |> Path.join(file_name)
    |> File.write(html)
  end

  defp beautify_html(file, path) do
    System.cmd(beautify_file_path(), ["-r", Path.join(path, file)])
  end

  defp run_brunch, do: System.cmd("npm", ["run", "brunch:build:namespaced"])

  def relative_file_path(path) do
    :site
    |> Application.app_dir()
    |> Path.join("../../../..")
    |> Path.join(path)
    |> Path.expand()
  end

  def assets_path(path \\ ""),
    do: relative_file_path("apps/site/assets/namespaced_header_footer/#{path}")

  def beautify_file_path, do: assets_path("node_modules/.bin/js-beautify")

  def js_file_path, do: assets_path("compiled/layout.js")

  def css_file_path, do: assets_path("compiled/layout.css")

  def fonts_path, do: relative_file_path("apps/site/priv/static/fonts")
end
