defmodule AwsClient.Behaviour do
  @moduledoc """
  The behaviour for interacting with the AWS client
  """
  @callback search_place_index_for_position(
              AWS.Client.t(),
              String.t(),
              AWS.Location.search_place_index_for_position_request(),
              list()
            ) ::
              {:ok, AWS.Location.search_place_index_for_position_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_position_errors()}

  @callback search_place_index_for_suggestions(
              AWS.Client.t(),
              String.t(),
              AWS.Location.search_place_index_for_suggestions_request(),
              list()
            ) ::
              {:ok, AWS.Location.search_place_index_for_suggestions_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_suggestions_errors()}

  @callback search_place_index_for_text(
              AWS.Client.t(),
              String.t(),
              AWS.Location.search_place_index_for_text_request(),
              list()
            ) ::
              {:ok, AWS.Location.search_place_index_for_text_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.Location.search_place_index_for_text_errors()}

  @behaviour __MODULE__

  @impl __MODULE__
  def search_place_index_for_position(client, index_name, input, options) do
    AWS.Location.search_place_index_for_position(client, index_name, input, options)
  end

  @impl __MODULE__
  def search_place_index_for_suggestions(client, index_name, input, options) do
    AWS.Location.search_place_index_for_suggestions(client, index_name, input, options)
  end

  @impl __MODULE__
  def search_place_index_for_text(client, index_name, input, options) do
    AWS.Location.search_place_index_for_text(client, index_name, input, options)
  end
end
