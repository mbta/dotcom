defmodule Alerts.TestExAws do
  @moduledoc """
  Implementation of ExAws which is used in tests, providing mocked
  functionality.
  """
  alias Alerts.{Alert, HistoricalAlert}

  def put_object(_bucket, path, _object) do
    alert_id = String.split(path, "/") |> List.last()
    alert_id
  end

  def list_objects(_bucket, _opts) do
    [%{key: "one"}, %{key: "two"}, %{key: "three"}]
  end

  def stream!(data), do: data

  def get_object(_bucket, id, _opts) do
    id
  end

  def request(id) when id in ["one", "two"] do
    {:ok,
     %{
       body: binary_alert(id),
       status_code: 200
     }}
  end

  def request(_other_id) do
    {:error, "some_problem"}
  end

  def binary_alert(id) do
    Alert.new(id: id)
    |> HistoricalAlert.from_alert()
    |> :erlang.term_to_binary([:compressed])
  end
end
