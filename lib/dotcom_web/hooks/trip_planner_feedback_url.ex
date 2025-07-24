defmodule DotcomWeb.Hooks.TripPlannerFeedbackURL do
  @moduledoc """
  On param changes, note the current URL and rewrite the link
  to a feedback form for the Trip Planner. This special form link will
  prefill the URL form field with the current URL.
  """

  import Phoenix.Component, only: [assign: 3]
  import Phoenix.LiveView, only: [attach_hook: 4]

  def on_mount(:default, _params, _session, mount_socket) do
    {:cont,
     attach_hook(mount_socket, :save_feedback_url, :handle_params, fn _, current_url, socket ->
       feedback_url =
         current_url
         |> URI.encode()
         |> then(
           &~s(https://forms.office.com/Pages/ResponsePage.aspx?id=meVYdQbwH0iXF7GJ5nMIYsm1bzzboDVDusuLwrFp_ltUMUxFVUs2Q0I2QkpPTFYxTENHV0YzWUlMSC4u&r9a0f34a2fd6c4f90b6e0b51ed3da7dd5=#{&1})
         )

       {:cont, assign(socket, :trip_planner_feedback_url, feedback_url)}
     end)}
  end
end
