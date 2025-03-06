defmodule Mix.Tasks.WriteStopPlaceIds do
  @moduledoc """
  Creates a `Dotcom.StopPlaceIds` module with a single function `stop_place_id/1`.
  The function is a simple one to one mapping of stop ids to Google place ids.
  """

  @shortdoc "Create the `Dotcom.StopPlaceIds` module."

  use Mix.Task

  @file_path "lib/dotcom/stop_place_ids.ex"
  @google_api_key System.get_env("GOOGLE_API_KEY")
  @google_url "https://places.googleapis.com/v1/places:searchNearby"
  @included_types [
    "bus_station",
    "bus_stop",
    "ferry_terminal",
    "subway_station",
    "train_station",
    "transit_station"
  ]

  @impl Mix.Task
  def run(_) do
    write_header()

    write_place_ids()

    write_footer()
  end

  # Given a latitude and longitude, construct a request body for Google.
  # We don't use the name of the location.
  # Rather, we use the latitude and longitude, restrict the types of places returned,
  # order them by distance, and take the first.
  # This means that accuracy is based on the stop latitude and longitude accuracy
  # which should be more accurate than trying to match names.
  defp body(latitude, longitude) do
    %{
      "includedTypes" => @included_types,
      "maxResultCount" => 1,
      "rankPreference" => "DISTANCE",
      "locationRestriction" => %{
        "circle" => %{
          "center" => %{
            "latitude" => latitude,
            "longitude" => longitude
          },
          "radius" => 100.0
        }
      }
    }
    |> :json.encode()
  end

  # Get an individual place id and match it with its stop id.
  defp get_place_id({id, latitude, longitude}) do
    body = body(latitude, longitude)
    headers = headers()

    {:ok, {{_, 200, _}, _, response}} =
      :httpc.request(:post, {@google_url, headers, ~c"application/json", body}, [], [])

    places =
      response
      |> Kernel.to_string()
      |> :json.decode()

    if Map.has_key?(places, "places") do
      {id, Map.get(places, "places") |> List.first() |> Map.get("id")}
    else
      {id, nil}
    end
  end

  # Download and unzip the MBTA GTFS file.
  defp get_stops_file(directory) do
    url = String.to_charlist("https://cdn.mbta.com/MBTA_GTFS.zip")
    path = Path.join([directory, "#{:os.system_time(:millisecond)}.zip"]) |> String.to_charlist()

    {:ok, :saved_to_file} = :httpc.request(:get, {url, []}, [], stream: path)

    :zip.unzip(path, [{:cwd, String.to_charlist(directory)}])
  end

  # Headers for the Google request.
  defp headers() do
    [
      {~c"accept", ~c"application/json"},
      {~c"X-Goog-Api-Key", String.to_charlist(@google_api_key)},
      {~c"X-Goog-FieldMask", ~c"places.id"}
    ]
  end

  # Convert the CSV row to a simple tuple.
  defp row_to_tuple(row) do
    {row["stop_id"], row["stop_lat"], row["stop_lon"]}
  end

  # If the place id is nil, we write out a comment.
  defp stop_place_id({:ok, {stop_id, nil}}) do
    "\t# Could not find stop: #{stop_id}\n"
  end

  # If we have a place id, we write out a function.
  defp stop_place_id({:ok, {stop_id, place_id}}) do
    "\tdef stop_place_id(\"#{stop_id}\"), do: \"#{place_id}\"\n"
  end

  # If we got some kind of error in the process, we inspect it and write nothing.
  defp stop_place_id(result) do
    IO.inspect(result, label: "ERROR GETTING PLACE ID")

    ""
  end

  # Write the module footer.
  defp write_footer() do
    default = "\tdef stop_place_id(_), do: nil\n"
    module_end = "end\n"

    File.write!(@file_path, default <> module_end, [:append])
  end

  # Write the module header.
  # Includes the module name, module doc, function doc, and function spec.
  defp write_header() do
    module_name = "defmodule Dotcom.StopPlaceIds do\n"
    module_doc = "\t@moduledoc \"Generated file linking stop ids to Google place ids.\"\n\n"
    doc = "\t@doc \"Map a stop id to a Google place id.\"\n"
    spec = "\t@spec stop_place_id(Stop.id_t()) :: String.t() | nil\n"

    File.write!(@file_path, module_name <> module_doc <> doc <> spec)
  end

  # Write a function for each stop id linking it to a Google place id.
  defp write_place_ids() do
    directory = System.tmp_dir!()

    {:ok, _} = get_stops_file(directory)
    {:ok, file} = File.open(@file_path, [:append, {:delayed_write, 100, 20}])

    Path.join([directory, "stops.txt"])
    |> File.stream!()
    |> CSV.decode!(headers: true)
    |> Stream.filter(fn row -> row["parent_station"] == "" end)
    |> Stream.map(&row_to_tuple/1)
    |> Task.async_stream(&get_place_id/1)
    |> Stream.map(&stop_place_id/1)
    |> Stream.each(&IO.binwrite(file, &1))
    |> Stream.run()

    File.close(file)
  end
end
