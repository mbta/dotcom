defmodule Site.Components.Inputs.InputLocation do
  @moduledoc """
  Component for using Google's current location API
  """

  defstruct name: :location,
            name_index: :address,
            id: "location-input",
            address: "",
            address_error: "",
            placeholder: "Enter a location",
            submit: true,
            required: true,
            input_class: "",
            button_class: "",
            submit_coordinates: false,
            latitude: "",
            longitude: "",
            aria_label: ""

  @type t :: %__MODULE__{
          name: atom,
          name_index: atom,
          id: String.t(),
          address: String.t(),
          address_error: String.t(),
          placeholder: String.t(),
          submit: boolean,
          required: boolean,
          input_class: String.t(),
          button_class: String.t(),
          submit_coordinates: boolean,
          latitude: String.t(),
          longitude: String.t(),
          aria_label: String.t()
        }
end
