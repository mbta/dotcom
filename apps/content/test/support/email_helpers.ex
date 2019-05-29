defmodule Content.EmailHelpers do
  @file_path Application.get_env(:content, :mailgun)[:test_file_path]

  def clear_sent_emails do
    File.rm(@file_path)
  end

  def email_sent_with_subject(subject) do
    email("subject") == subject
  end

  def email(key) do
    email = open_email()
    Map.get(email, key)
  end

  defp open_email do
    case File.read(@file_path) do
      {:ok, email} -> Poison.decode!(email)
      {:error, _} -> %{}
    end
  end

  def email_sent? do
    File.exists?(@file_path)
  end
end
