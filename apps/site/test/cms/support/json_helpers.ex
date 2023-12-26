defmodule CMS.JsonHelpers do
  @moduledoc false

  alias Poison.Parser

  def parse_json_file("fixtures" <> filename) do
    file_path = [Path.dirname(__ENV__.file), "../fixtures", filename]
    parse_file(file_path)
  end

  def parse_json_file("priv" <> filename) do
    file_path = [Path.dirname(__ENV__.file), "../../priv/cms/", filename]
    parse_file(file_path)
  end

  defp parse_file(file_path) do
    file_path
    |> Path.join()
    |> File.read!()
    |> Parser.parse!()
  end
end
