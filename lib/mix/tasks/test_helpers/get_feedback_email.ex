defmodule Mix.Tasks.TestHelpers.FeedbackEmail do
  @moduledoc ~S"""
  Gets test email. Used by Cypress scripts.
  #Usage
  ```
     mix test_helpers.feedback_email
  ```
  """
  use Mix.Task

  @impl Mix.Task
  def run(_) do
    email_or_error =
      case File.read(Application.get_env(:dotcom, :test_mail_file)) do
        {:ok, email} -> email
        {:error, error} -> error
      end

    IO.puts(email_or_error)
  end
end
