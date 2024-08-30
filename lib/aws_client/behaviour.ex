defmodule AwsClient.Behaviour do
  @moduledoc """
  The behaviour for interacting with the AWS client
  """
  @callback search_place_index_for_position(
              String.t(),
              AWS.Location.search_place_index_for_position_request()
            ) ::
              {:ok, AWS.Location.search_place_index_for_position_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_position_errors()}

  @callback search_place_index_for_suggestions(
              String.t(),
              AWS.Location.search_place_index_for_suggestions_request()
            ) ::
              {:ok, AWS.Location.search_place_index_for_suggestions_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_suggestions_errors()}

  @callback search_place_index_for_text(
              String.t(),
              AWS.Location.search_place_index_for_text_request()
            ) ::
              {:ok, AWS.Location.search_place_index_for_text_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_text_errors()}

  @behaviour __MODULE__

  @impl __MODULE__
  def search_place_index_for_position(index_name, input) do
    AWS.Location.search_place_index_for_position(client(), index_name, input)
  end

  @impl __MODULE__
  def search_place_index_for_suggestions(index_name, input) do
    AWS.Location.search_place_index_for_suggestions(client(), index_name, input)
  end

  @impl __MODULE__
  def search_place_index_for_text(index_name, input) do
    AWS.Location.search_place_index_for_text(client(), index_name, input)
  end

  defp client, do: AWS.Client.create()
end
