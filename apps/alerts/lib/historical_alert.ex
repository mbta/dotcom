defmodule Alerts.HistoricalAlert do
  @moduledoc """
  Module for representation of a historical alert, capturing an alert from the
  past with some metadata
  """
  alias Alerts.Alert

  defstruct id: "",
            alert: nil,
            municipality: nil,
            routes: [],
            stops: []

  @type t :: %Alerts.HistoricalAlert{
          id: Alert.id_t(),
          alert: Alert.t(),
          municipality: String.t() | nil,
          routes: [String.t()],
          stops: [String.t()]
        }

  @type entity_key :: :route | :stop

  @spec from_alert(%Alert{}) :: t()
  def from_alert(alert) when not is_nil(alert) do
    %__MODULE__{
      id: alert.id,
      alert: alert,
      municipality: Alert.municipality(alert),
      routes: get_entity_lists(alert, :route),
      stops: get_entity_lists(alert, :stop)
    }
  end

  @spec get_entity_lists(%Alert{}, entity_key) :: [String.t()]
  defp get_entity_lists(alert, key) do
    Alert.get_entity(alert, key)
    |> MapSet.delete(nil)
    |> MapSet.to_list()
    |> Enum.map(&get_name_or_id(&1, key))
  end

  @spec get_name_or_id(String.t(), entity_key) :: String.t()
  defp get_name_or_id(id, key) do
    module =
      case key do
        :route -> Routes.Repo
        :stop -> Stops.Repo
      end

    case apply(module, :get, [id]) do
      %{name: name} when not is_nil(name) -> name
      _ -> id
    end
  end
end
