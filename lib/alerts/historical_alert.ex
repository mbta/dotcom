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

  @routes_repo Application.compile_env!(:dotcom, :repo_modules)[:routes]
  @stops_repo Application.compile_env!(:dotcom, :repo_modules)[:stops]

  def from_alert(alert) when not is_nil(alert) do
    %__MODULE__{
      id: alert.id,
      alert: alert,
      municipality: Alert.municipality(alert),
      routes: get_entity_lists(alert, :route),
      stops: get_entity_lists(alert, :stop)
    }
  end

  defp get_entity_lists(alert, key) do
    Alert.get_entity(alert, key)
    |> MapSet.delete(nil)
    |> Enum.map(&get_name(&1, key))
  end

  defp get_name(id, key) do
    module =
      case key do
        :route -> @routes_repo
        :stop -> @stops_repo
      end

    case module.get(id) do
      %{name: name} when not is_nil(name) -> name
      _ -> id
    end
  end
end
