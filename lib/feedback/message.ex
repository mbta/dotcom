defmodule Feedback.Message do
  @moduledoc """
  Information for a customer support message.
  """

  use Dotcom.Gettext.Sigils

  # The integration with HEAT only accepts certain values for the message type
  # and subject. Only "Complaint", "Suggestion", "Inquiry" and "Commendation"
  # are supported service options, and each has a list of allowed subjects.
  # Other values will cause HEAT to throw an error and reject the ticket
  @type service_name :: String.t()
  @type service_value :: String.t()
  @type subject_value :: String.t()
  @type service_option_with_subjects :: {service_name(), service_value(), [subject_value()]}
  @service_options_with_subjects [
    {~t"Complaint", "Complaint",
     [
       ~t"Bus Stop",
       ~t"CharlieCards & Tickets",
       ~t"Employee Complaint",
       ~t"Fare Evasion",
       ~t"Maintenance Complaint",
       ~t"Mobile Ticketing",
       ~t"Parking",
       ~t"Service Complaint",
       ~t"TAlerts/Countdowns/Apps",
       ~t"Other"
     ]},
    {~t"Comment", "Suggestion",
     [
       ~t"Bus Stop",
       ~t"CharlieCards & Tickets",
       ~t"Fare Policy",
       ~t"Maintenance",
       ~t"MBTA Projects/Programs",
       ~t"Parking",
       ~t"Schedules",
       ~t"Service Inquiry",
       ~t"Website",
       ~t"Other"
     ]},
    {~t"Question", "Inquiry",
     [
       ~t"CharlieCards & Tickets",
       ~t"Disability ID Cards",
       ~t"Fare Policy",
       ~t"Maintenance",
       ~t"Mobile Ticketing",
       ~t"Parking",
       ~t"Schedules",
       ~t"Senior ID Cards",
       ~t"Service Inquiry",
       ~t"Trip Planner",
       ~t"Website",
       ~t"Other"
     ]},
    {~t"Compliment", "Commendation",
     [
       ~t"Employee",
       ~t"Maintenance",
       ~t"MBTA Projects/Programs",
       ~t"Service",
       ~t"Other"
     ]}
  ]

  @enforce_keys [:comments, :service, :no_request_response]
  defstruct [
    :email,
    :phone,
    :first_name,
    :last_name,
    :comments,
    :service,
    :subject,
    :incident_date_time,
    :no_request_response,
    :ada_complaint,
    :photos,
    :ticket_number,
    :mode,
    :line,
    :vehicle
  ]

  @type t :: %__MODULE__{
          email: String.t() | nil,
          phone: String.t() | nil,
          first_name: String.t(),
          last_name: String.t(),
          comments: String.t(),
          service: String.t(),
          subject: String.t(),
          no_request_response: boolean,
          ada_complaint: boolean,
          incident_date_time: DateTime.t(),
          photos: [Plug.Upload.t()] | nil,
          ticket_number: String.t() | nil,
          mode: String.t() | nil,
          line: String.t() | nil,
          vehicle: String.t() | nil
        }

  @spec service_options() :: [service_option_with_subjects()]
  def service_options do
    @service_options_with_subjects
  end

  @spec valid_service?(service_value()) :: boolean()
  def valid_service?(value) do
    value in Enum.map(service_options(), &elem(&1, 1))
  end

  @spec valid_subject_for_service?(subject_value(), service_value()) :: boolean()
  def valid_subject_for_service?(subject_value, service_value) do
    case service(service_value) do
      nil ->
        false

      service ->
        subject_value in subjects(service)
    end
  end

  @spec service(service_value()) :: service_option_with_subjects() | nil
  defp service(value) do
    Enum.find(service_options(), &(elem(&1, 1) == value))
  end

  @spec subjects(service_option_with_subjects()) :: [subject_value()]
  defp subjects(service), do: elem(service, 2)
end
