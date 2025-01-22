defmodule Alerts.Banner do
  @moduledoc false
  alias Alerts.Alert
  alias Alerts.InformedEntitySet

  defstruct id: "",
            title: "",
            url: nil,
            url_parsed_out_of_title: false,
            effect: :unknown,
            severity: 5,
            informed_entity_set: %InformedEntitySet{}

  @type individual_route_type :: 1..10
  @type route_type_list :: [individual_route_type]
  @type route_type :: individual_route_type | route_type_list

  @type t :: %__MODULE__{
          id: String.t(),
          title: String.t(),
          url: String.t() | nil,
          url_parsed_out_of_title: boolean(),
          effect: Alert.effect(),
          severity: Alert.severity(),
          informed_entity_set: InformedEntitySet.t()
        }
end
