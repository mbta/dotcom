defmodule StripTitle do
  def strip_titles() do
    for path <-
          "./priv/static/icon-svg/*.svg"
          |> Path.wildcard() do
      contents =
        path
        |> File.read!()
        |> String.replace(~r/<title>.*<\/title>/is, "")

      File.write(path, contents)
    end
  end
end
