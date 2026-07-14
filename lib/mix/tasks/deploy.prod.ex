defmodule Mix.Tasks.Deploy.Prod do
  @moduledoc """
  Open the Github Releases page that triggers a production deploy
  """
  use Mix.Task

  @shortdoc "Open the Github Releases page that allows us to trigger a production deploy"
  @spec run([binary]) :: any
  def run(_) do
    # This is necessary in order to call
    # `Dotcom.Utils.DateTime.today/0` below.
    Application.ensure_all_started(:tzdata)

    %{"previous_date" => previous_date, "previous_count" => previous_count} =
      latest_tag() |> parse_previous_date_and_count()

    today = today_formatted()
    count = new_count_formatted(previous_count, same_day?: previous_date == today)

    new_release = "#{today}.#{count}"

    System.cmd("open", [
      "https://github.com/mbta/dotcom/releases/new?tag=#{new_release}"
    ])
  end

  # Left-pads a numerical count to a length of 2 -
  # e.g. format_count(2) == "02".
  defp format_count(count) do
    count
    |> Integer.to_string()
    |> String.pad_leading(2, "0")
  end

  # Fetches the latest tag using `git describe` (which returns a
  # description of the form `<latest_tag>-<other_stuff>`... with
  # `-<other_stuff>` trimmed off by `--abbrev=0`).
  defp latest_tag() do
    System.cmd("git", ["fetch"])

    System.cmd("git", ["describe", "origin/main", "--tags", "--abbrev=0"])
    |> then(fn {tag, 0} -> tag end)
    |> String.trim()
  end

  # Increments and left-pads the previous count to a length of 2 if
  # the previous release was on the same day. Returns "01" if the
  # previous release was on a different day.
  defp new_count_formatted(previous_count, same_day?: true),
    do: format_count(parse_int!(previous_count) + 1)

  defp new_count_formatted(_previous_count, same_day?: false), do: "01"

  # A simpler string-to-int parse function to go straight from (e.g.)
  # "02" -> 2.
  defp parse_int!(str) do
    str
    |> Integer.parse()
    |> then(fn {previous_count, ""} -> previous_count end)
  end

  # Splits a release tag of `YYYY.MM.DD.NN` (where `NN` is the count -
  # "01" for the first release of a given day, "02" for the next, etc)
  # into the date and the count. e.g. "2020.01.02.03" will get split
  # into "2020.01.02" and "03".
  defp parse_previous_date_and_count(tag) do
    Regex.named_captures(~r/(?<previous_date>.*)\.(?<previous_count>\d\d)/, tag)
  end

  # Formats a date according to our release tag pattern of
  # `YYYY.MM.DD`
  defp today_formatted() do
    Dotcom.Utils.DateTime.today()
    |> Date.to_string()
    |> String.replace("-", ".")
  end
end
