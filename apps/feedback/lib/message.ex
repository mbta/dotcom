defmodule Feedback.Message do
  @moduledoc """
  Information for a customer support message.
  """

  # The integration with HEAT only accepts certain values for the message type
  # Only "Complaint", "Suggestion", "Inquiry" and "Commendation" are supported.
  # Other values will cause HEAT to throw an error and reject the ticket
  @service_options [
    {"Complaint", "Complaint"},
    {"Comment", "Suggestion"},
    {"Question", "Inquiry"},
    {"Compliment", "Commendation"}
  ]

  @enforce_keys [:comments, :service, :no_request_response]
  defstruct [
    :email,
    :phone,
    :first_name,
    :last_name,
    :comments,
    :service,
    :no_request_response,
    :photos
  ]

  @type t :: %__MODULE__{
          email: String.t() | nil,
          phone: String.t() | nil,
          first_name: String.t(),
          last_name: String.t(),
          comments: String.t(),
          service: String.t(),
          no_request_response: boolean,
          photos: [Plug.Upload.t()] | nil
        }

  def service_options do
    @service_options
  end

  def valid_service?(value) do
    value in Enum.map(service_options(), &elem(&1, 1))
  end
end
