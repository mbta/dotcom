defmodule Test.Support.Factories.AwsClient do
  @moduledoc """
  Module for generating outputs to the functions in AwsClient.Behaviour
  """
  use ExMachina

  def search_place_index_for_position_response_factory do
    %{
      "Results" => build_list(4, :search_for_position_result),
      "Summary" => %{
        "DataSource" => ["Esri"],
        "MaxResults" => Faker.random_between(1, 15),
        "Position" => position()
      }
    }
  end

  def search_place_index_for_suggestions_response_factory do
    %{
      "Results" => build_list(4, :search_for_suggestions_result),
      "Summary" => %{
        "DataSource" => ["Esri"]
      }
    }
  end

  def search_place_index_for_text_response_factory do
    %{
      "Results" => build_list(4, :search_for_text_result),
      "Summary" => %{
        "DataSource" => ["Esri"]
      }
    }
  end

  def place_factory do
    place = %{
      "AddressNumber" => Faker.random_between(1, 999),
      "Country" => "USA",
      "Geometry" => build(:geometry),
      "Municipality" => Faker.Address.city(),
      "PostalCode" => Faker.Address.zip_code(),
      "Region" => Faker.Address.state(),
      "Street" => Faker.Address.street_name()
    }

    state_abbr = Faker.Util.pick(["MA", "NH", "RI"])

    Map.put(
      place,
      "Label",
      "#{place["AddressNumber"]} #{place["Street"]}, #{place["Municipality"]}, #{state_abbr}, #{place["PostalCode"]} USA"
    )
  end

  defp position do
    [Faker.Address.longitude(), Faker.Address.latitude()]
  end

  def geometry_factory do
    %{"Point" => position()}
  end

  def search_for_position_result_factory do
    %{
      "Distance" => float_number(),
      "Place" => build(:place),
      "PlaceId" => place_id()
    }
  end

  def search_for_suggestions_result_factory do
    %{
      "Categories" => [],
      "PlaceId" => place_id(),
      "Text" =>
        "#{Faker.Address.street_address()}, #{Faker.Util.pick(["MA", "NH", "RI"])}, #{Faker.Address.zip_code()}, USA"
    }
  end

  def search_for_text_result_factory do
    %{
      "Distance" => float_number(),
      "Place" => build(:place),
      "PlaceId" => place_id(),
      "Relevance" => float_number()
    }
  end

  defp float_number, do: Faker.random_uniform() * Faker.random_between(1, 15)
  defp place_id, do: Faker.Lorem.characters()
end
