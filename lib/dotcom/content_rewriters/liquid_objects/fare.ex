defmodule Dotcom.ContentRewriters.LiquidObjects.Fare do
  @moduledoc """

  This module converts a string-based set of fare filters to a proper keyword list request
  intended for Fares.Repo.all/1, and parses the price of the final result into a string.

  IMPORTANT: Any atom changes in the Fares.Fare module need to also be made here, and should
  likewise be updated in the Content team's online legend for fare replacement usage here:
  https://docs.google.com/spreadsheets/d/18DGY0es_12xy54oDE9lDTJwATx4jhodWkND7MuY7R6E?pli=1#gid=1197832395

  """

  alias Fares.{Fare, Format, Repo, Summary}

  # Fares.Fare related type specs
  @type required_key :: :reduced | :duration
  @type optional_key :: :name | :mode | :includes_media
  @type placeholder_key :: :zone_type | :zone_id
  @type summary_mode :: :commuter_rail | :bus_subway | :ferry
  @type the_ride :: :ada_ride | :premium_ride
  @type zone_type :: :zone | :interzone

  @type fare_key :: optional_key | required_key | placeholder_key

  @type fare_name ::
          :commuter_ferry_logan
          | :commuter_ferry
          | :ferry_cross_harbor
          | :ferry_inner_harbor
          | :ferry_east_boston
          | :ferry_lynn
          | :ferry_winthrop
          | :foxboro
          | :express_bus
          | :local_bus
          | :subway

  @type fare_value ::
          fare_name
          | the_ride
          | summary_mode
          | zone_type
          | Fare.media()
          | Fare.reduced()
          | Fare.duration()

  @type fares_or_summaries :: [Summary.t()] | Summary.t() | [Fare.t()] | Fare.t()
  @type repo_arg :: {fare_key, fare_value}

  @type request_error :: {:error, {:invalid | :empty | :incomplete | :unmatched, String.t()}}
  @type request_tuple :: {:ok, [repo_arg]} | {:ok, {summary_mode, [repo_arg]}}

  @default_args [reduced: nil, duration: :single_trip]
  # These are the route types that are compatible for fare ranges
  @summary_atoms [:commuter_rail, :bus_subway, :ferry]

  @fare_summary [
    "commuter_rail",
    "bus_subway",
    "ferry"
  ]

  @fare_name [
    "commuter_ferry_logan",
    "commuter_ferry",
    "ferry_cross_harbor",
    "ferry_inner_harbor",
    "ferry_east_boston",
    "ferry_lynn",
    "ferry_winthrop",
    "foxboro",
    "express_bus",
    "local_bus",
    "subway"
  ]

  @fare_ride [
    "ada_ride",
    "premium_ride"
  ]

  @fare_media [
    "cash",
    "charlie_card",
    "charlie_ticket",
    "commuter_ticket",
    "contactless_payment",
    "mticket",
    "paper_ferry",
    "special_event"
  ]

  @fare_reduced [
    "senior_disabled",
    "student",
    "reduced"
  ]

  @fare_duration [
    "day",
    "week",
    "weekend",
    "month",
    "single_trip",
    "round_trip"
  ]

  @zone_type [
    "interzone",
    "zone"
  ]

  @zone_id ["1A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  def fare_request(string) do
    string
    |> String.split(":", trim: true)
    |> parse_tokens()
    |> compose_args()
    |> request_fares()
    |> process_results()
  end

  def fare_object_request(string) do
    tokens =
      string
      |> String.split(":", trim: true)
      |> parse_tokens()

    case tokens do
      {:ok, _} ->
        tokens
        |> compose_args()
        |> request_fares()
        |> List.first()

      _ ->
        %Fare{
          name: :invalid,
          mode: :subway,
          duration: :invalid
        }
    end
  end

  defp parse_tokens(new), do: parse_tokens(new, [], [])

  defp parse_tokens(_, _, [token]) do
    {:error, {:invalid, token}}
  end

  defp parse_tokens([], filters, _) do
    {:ok, filters}
  end

  defp parse_tokens([string | remaining_strings], good, bad) do
    {valid, invalid} = parse_token(string, good, bad)
    parse_tokens(remaining_strings, valid, invalid)
  end

  defp parse_token(value, good, bad) when value in @fare_summary do
    {filter_insert(good, mode: value), bad}
  end

  defp parse_token(value, good, bad) when value in ["inner_express_bus", "outer_express_bus"] do
    {filter_insert(good, name: "express_bus"), bad}
  end

  defp parse_token(value, good, bad) when value in @fare_name do
    {filter_insert(good, name: value), bad}
  end

  defp parse_token(value, good, bad) when value in @fare_ride do
    {filter_insert(good, name: value), bad}
  end

  defp parse_token(value, good, bad) when value in @fare_media do
    {filter_insert(good, includes_media: value), bad}
  end

  defp parse_token(value, good, bad) when value in @fare_reduced do
    {filter_insert(good, reduced: (value == "reduced" && "any") || value), bad}
  end

  defp parse_token(value, good, bad) when value in @fare_duration do
    {filter_insert(good, duration: value), bad}
  end

  defp parse_token(value, good, bad) when value in @zone_type do
    {filter_insert(good, zone_type: value), bad}
  end

  defp parse_token(value, good, bad) when value in @zone_id do
    {[{:zone_id, value} | good], bad}
  end

  defp parse_token(value, good, bad) do
    {good, [value | bad]}
  end

  defp compose_args({:ok, []}) do
    {:error, {:empty, "no input"}}
  end

  defp compose_args({:ok, args}) do
    case Enum.into(args, %{}) do
      # CR zone args need to be converted to a :name Tuple from their temporary placeholders
      %{zone_type: type, zone_id: id} ->
        zone_request =
          args
          |> Keyword.put(:name, {type, id})
          |> Keyword.drop([:zone_type, :zone_id])

        {:ok, zone_request}

      # Prevent both :mode and :name keys from being sent to Repo.all (never matches fare)
      %{name: _} ->
        {:ok, Keyword.delete(args, :mode)}

      # When using a :mode, the summarize/3 function requires an explicit :mode argument
      %{mode: mode} ->
        {:ok, {mode, args}}

      # If there is neither a :mode nor a :name key/value, we cannot perform the request
      _ ->
        {:error, {:incomplete, "missing mode/name"}}
    end
  end

  defp compose_args(invalid_error) do
    invalid_error
  end

  defp request_fares({:ok, {mode, args}}) when mode in @summary_atoms do
    args
    |> get_fares()
    |> Format.summarize(mode)
  end

  defp request_fares({:ok, args}) do
    get_fares(args)
  end

  defp request_fares(error) do
    error
  end

  defp process_results([]) do
    {:error, {:unmatched, "no results"}}
  end

  defp process_results([first_result | _]) do
    process_results(first_result)
  end

  defp process_results(%Fares.Fare{} = fare) do
    {:ok, Format.price(fare)}
  end

  defp process_results(%Fares.Summary{} = summary) do
    {:ok, Summary.price_range(summary)}
  end

  defp process_results(error) do
    error
  end

  # Helpers

  # Adds the valid key/val into our arg list, after first
  # converting the value into a proper, known Fare atom.
  defp filter_insert(old_args, new_args) do
    Enum.reduce(new_args, old_args, fn {k, v}, args ->
      Keyword.put(args, k, String.to_atom(v))
    end)
  end

  # Fill in any missing/required arguments with the default,
  # then call Fares.Repo.all/1 to get matching fares.
  defp get_fares(args) do
    @default_args
    |> Keyword.merge(args)
    |> Repo.all()
  end
end
