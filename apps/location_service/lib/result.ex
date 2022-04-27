defmodule LocationService.Result do
  @moduledoc "Functions for parsing and logging results from any location data service"

  require Logger

  @doc """
  Ingest results from any location service and
  - decode JSON
  - process results
  - log results or errors
  """
  @spec handle_response({:ok | :error, any}, any) :: LocationService.result()
  def handle_response({:ok, %{status_code: 200, body: body}}, input) do
    Jason.decode(body)
    |> handle_response(input)
  end

  def handle_response({:ok, %{status_code: code, body: body}}, input) do
    Jason.decode(body)
    |> internal_error(input, %{status_code: code, message: "Unexpected HTTP code"})
  end

  def handle_response({:ok, %{status_code: code}}, input) do
    internal_error(nil, input, %{status_code: code, message: "Unexpected HTTP code"})
  end

  # AWS format of returned results
  def handle_response({:ok, %{"Results" => results}}, input), do: parse_results(input, results)

  # Responses from the GoogleMaps module are already JSON-decoded at this point
  def handle_response({:ok, %{"status" => "OK", "results" => results}}, input) do
    parse_results(input, results)
  end

  def handle_response({:ok, %{"status" => "ZERO_RESULTS"}}, input) do
    internal_error(:zero_results, input)
  end

  def handle_response({:ok, %{"status" => code}}, input) do
    internal_error(nil, input, %{status_code: code, message: "API error"})
  end

  def handle_response({:error, error}, input), do: internal_error(error, input)

  defp parse_results(input, []) do
    internal_error(:zero_results, input)
  end

  defp parse_results(input, results) do
    results =
      results
      |> Enum.map(fn
        # AWS suggestions
        %{"Text" => address} ->
          %LocationService.Suggestion{
            address: address,
            highlighted_spans:
              LocationService.Utils.get_highlighted_spans(%{
                search: input[:search],
                text: address
              })
          }

        # AWS format
        %{"Place" => %{"Label" => label, "Geometry" => %{"Point" => [lon, lat]}}} ->
          %LocationService.Address{
            formatted: label,
            latitude: lat,
            longitude: lon
          }

        # Google format
        %{
          "geometry" => %{"location" => %{"lat" => lat, "lng" => lng}},
          "formatted_address" => address
        } ->
          %LocationService.Address{
            formatted: address,
            latitude: lat,
            longitude: lng
          }
      end)

    _ = Logger.info(fn -> "#{__MODULE__} input=#{inspect(input)} result=#{inspect(results)}" end)
    {:ok, results}
  end

  def internal_error(error, input, extra \\ %{})

  def internal_error(:zero_results, input, extra) do
    _ =
      Logger.info(fn ->
        "#{__MODULE__} input=#{inspect(input)} result=ZERO_RESULTS #{extra_messages(extra)}"
      end)

    {:error, :zero_results}
  end

  def internal_error(error, input, extra) do
    case error do
      %Jason.DecodeError{} ->
        _ =
          Logger.warn(fn ->
            "#{__MODULE__} input=#{inspect(input)} error=\"Error parsing to JSON\" #{
              extra_messages(extra)
            }"
          end)

      nil ->
        _ =
          Logger.warn(fn ->
            "#{__MODULE__} input=#{inspect(input)} error=\"API error\" #{extra_messages(extra)}"
          end)

      _ ->
        _ =
          Logger.warn(fn ->
            "#{__MODULE__} input=#{inspect(input)} error=#{inspect(error)} #{
              extra_messages(extra)
            }"
          end)
    end

    {:error, :internal_error}
  end

  defp extra_messages(extra),
    do: Map.to_list(extra) |> Enum.map_join(" ", &"#{to_string(elem(&1, 0))}=#{elem(&1, 1)}")
end
