defmodule LocationServiceTest do
  use ExUnit.Case, async: true

  import LocationService
  import Mox
  import Test.Support.Factories.AwsClient

  setup :verify_on_exit!

  setup do
    cache = Application.get_env(:dotcom, :cache)
    cache.flush()

    :ok
  end

  describe "geocode/1" do
    test "can handle a response with results" do
      address = Faker.Address.street_address()

      expect(AwsClient.Mock, :search_place_index_for_text, fn _, input ->
        assert input["Text"] == address
        response = build(:search_place_index_for_text_response)
        {:ok, response, %{}}
      end)

      assert {:ok, [%LocationService.Address{} | _]} = geocode(address)
    end

    test "can handle a response with error" do
      expect(AwsClient.Mock, :search_place_index_for_text, fn _, _ ->
        {:error, "Some error message"}
      end)

      assert {:error, :internal_error} = Faker.Address.street_address() |> geocode()
    end
  end

  describe "reverse_geocode/2" do
    test "can parse a response with results" do
      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()

      expect(AwsClient.Mock, :search_place_index_for_position, fn _, input ->
        assert input["Position"] == [longitude, latitude]
        response = build(:search_place_index_for_position_response)
        {:ok, response, %{}}
      end)

      assert {:ok, [%LocationService.Address{} | _]} = reverse_geocode(latitude, longitude)
    end

    test "can handle a response with error" do
      expect(AwsClient.Mock, :search_place_index_for_position, fn _, _ ->
        {:error, "Some error message"}
      end)

      latitude = Faker.Address.latitude()
      longitude = Faker.Address.longitude()
      assert {:error, :internal_error} = reverse_geocode(latitude, longitude)
    end
  end

  describe "autocomplete/2" do
    test "can parse a response with results" do
      text = Faker.Company.name()
      response = build(:search_place_index_for_suggestions_response)
      expected_place_ids = response["Results"] |> Enum.map(& &1["PlaceId"])

      expect(AwsClient.Mock, :search_place_index_for_suggestions, fn _, input ->
        assert input["Text"] == text
        response = put_in(response["Summary"]["Text"], text)
        {:ok, response, %{}}
      end)

      expect(AwsClient.Mock, :get_place, length(expected_place_ids), fn _, place_id ->
        assert place_id in expected_place_ids
        response = %{"Place" => build(:place)}
        {:ok, response, %{}}
      end)

      suggestions = autocomplete(text, 2)
      assert {:ok, [%LocationService.Address{} | _]} = suggestions
    end

    test "can handle a response with error" do
      expect(AwsClient.Mock, :search_place_index_for_suggestions, fn _, _ ->
        {:error, "Some error message"}
      end)

      text = Faker.Company.name()
      assert {:error, :internal_error} = autocomplete(text, 2)
    end

    test "rejects invalid queries and result limits without calling AWS" do
      deny(AwsClient.Mock, :search_place_index_for_suggestions, 2)

      assert {:error, :invalid_arguments} = autocomplete("", 1)
      assert {:error, :invalid_arguments} = autocomplete(String.duplicate("a", 201), 1)
      assert {:error, :invalid_arguments} = autocomplete("south", 0)
      assert {:error, :invalid_arguments} = autocomplete("south", -1)
      assert {:error, :invalid_arguments} = autocomplete("south", 11)
      assert true == LocationService.valid_autocomplete_request?(String.duplicate("a", 200), 10)
      assert false == LocationService.valid_autocomplete_request?(nil, 1)
      assert false == LocationService.valid_autocomplete_request?("south", "5")
    end

    test "retries a transient goaway error and returns a later success" do
      attempts = start_supervised!({Agent, fn -> 0 end})

      expect(AwsClient.Mock, :search_place_index_for_suggestions, 2, fn _, _ ->
        Agent.get_and_update(attempts, fn
          0 -> {{:error, {:goaway, :no_error}}, 1}
          1 -> {{:ok, %{"Results" => [], "Summary" => %{"Text" => "south"}}, %{}}, 2}
        end)
      end)

      assert {:ok, []} = autocomplete("south goaway retry", 2)
    end

    test "retries a transient AWS server error and returns a later success" do
      attempts = start_supervised!({Agent, fn -> 0 end})

      expect(AwsClient.Mock, :search_place_index_for_suggestions, 2, fn _, _ ->
        Agent.get_and_update(attempts, fn
          0 ->
            {{:error, {:unexpected_response, %{status_code: 500, body: "Internal server error"}}},
             1}

          1 ->
            {{:ok, %{"Results" => [], "Summary" => %{"Text" => "south"}}, %{}}, 2}
        end)
      end)

      assert {:ok, []} = autocomplete("south server retry", 2)
    end

    test "retries closed connections at most twice" do
      expect(AwsClient.Mock, :search_place_index_for_suggestions, 3, fn _, _ ->
        {:error, :closed}
      end)

      assert {:error, :internal_error} = autocomplete("south closed retry", 2)
    end

    test "maps AWS validation errors to invalid arguments without retrying" do
      expect(AwsClient.Mock, :search_place_index_for_suggestions, fn _, _ ->
        {:error,
         {:unexpected_response,
          %{
            status_code: 400,
            body: "ValidationException",
            headers: [{"x-amzn-errortype", "ValidationException"}]
          }}}
      end)

      assert {:error, :invalid_arguments} = autocomplete("south validation", 2)
    end

    test "treats an unclassified AWS 400 response as an upstream failure" do
      expect(AwsClient.Mock, :search_place_index_for_suggestions, fn _, _ ->
        {:error, {:unexpected_response, %{status_code: 400, headers: []}}}
      end)

      assert {:error, :internal_error} = autocomplete("south bad request", 2)
    end

    test "retries get-place connection failures while resolving suggestions" do
      text = "123 Main St, Boston, MA, 02110, USA"

      response = %{
        "Results" => [%{"PlaceId" => "place-1", "Text" => text}],
        "Summary" => %{"Text" => text}
      }

      expect(AwsClient.Mock, :search_place_index_for_suggestions, fn _, _ ->
        {:ok, response, %{}}
      end)

      attempts = start_supervised!({Agent, fn -> 0 end})

      expect(AwsClient.Mock, :get_place, 2, fn _, "place-1" ->
        Agent.get_and_update(attempts, fn
          0 -> {{:error, :closed}, 1}
          1 -> {{:ok, %{"Place" => build(:place)}, %{}}, 2}
        end)
      end)

      assert {:ok, [%LocationService.Address{}]} = autocomplete(text, 1)
    end
  end
end
