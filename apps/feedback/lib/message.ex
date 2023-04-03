defmodule Feedback.Message do
  @moduledoc """
  Information for a customer support message.
  """

  # The integration with HEAT only accepts certain values for the message type
  # and subject. Only "Complaint", "Suggestion", "Inquiry" and "Commendation"
  # are supported service options, and each has a list of allowed subjects.
  # Other values will cause HEAT to throw an error and reject the ticket
  @type service_name :: String.t()
  @type service_value :: String.t()
  @type subject_value :: String.t()
  @type service_option_with_subjects :: {service_name(), service_value(), [subject_value()]}
  @service_options_with_subjects [
    {"Complaint", "Complaint",
     [
       "Bus Stop",
       "CharlieCards & Tickets",
       "Employee Complaint",
       "Fare Evasion",
       "Maintenance Complaint",
       "Mobile Ticketing",
       "Parking",
       "Service Complaint",
       "TAlerts/Countdowns/Apps",
       "Other"
     ]},
    {"Comment", "Suggestion",
     [
       "Bus Stop",
       "CharlieCards & Tickets",
       "Fare Policy",
       "Maintenance",
       "MBTA Projects/Programs",
       "Parking",
       "Schedules",
       "Service Inquiry",
       "Website",
       "Other"
     ]},
    {"Question", "Inquiry",
     [
       "CharlieCards & Tickets",
       "Disability ID Cards",
       "Fare Policy",
       "Maintenance",
       "Mobile Ticketing",
       "Parking",
       "Schedules",
       "Senior ID Cards",
       "Service Inquiry",
       "Trip Planner",
       "Website",
       "Other"
     ]},
    {"Compliment", "Commendation",
     [
       "Employee",
       "Maintenance",
       "MBTA Projects/Programs",
       "Service",
       "Other"
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
