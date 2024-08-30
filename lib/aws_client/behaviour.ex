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

  @type bucket_name :: String.t()
  @type bucket_prefix :: String.t()
  @type bucket_object_key :: String.t()
  @callback get_object(bucket_name(), bucket_prefix()) ::
              {:ok, AWS.S3.get_object_output(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.S3.get_object_errors()}
  @callback put_object(bucket_name(), bucket_object_key(), AWS.S3.put_object_request()) ::
              {:ok, AWS.S3.put_object_output(), any()}
              | {:error, {:unexpected_response, any()}}
  @callback list_objects(bucket_name(), bucket_object_key()) ::
              {:ok, AWS.S3.list_objects_output(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.S3.list_objects_errors()}

  @callback send_raw_email(AWS.SES.send_raw_email_request()) ::
              {:ok, AWS.SES.send_raw_email_response(), any()}
              | {:error, {:unexpected_response, any()}}
              | {:error, AWS.SES.send_raw_email_errors()}

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

  @impl __MODULE__
  def list_objects(bucket, prefix),
    do: AWS.S3.list_objects(client(), bucket, nil, nil, nil, nil, prefix, nil, nil, nil)

  @impl __MODULE__
  def get_object(bucket, object_key),
    do: AWS.S3.get_object(client(), bucket, object_key)

  @impl __MODULE__
  def put_object(bucket, object_key, contents),
    do: AWS.S3.put_object(client(), bucket, object_key, contents)

  @impl __MODULE__
  def send_raw_email(message), do: AWS.SES.send_raw_email(client(), message)

  defp(client, do: AWS.Client.create())
end
