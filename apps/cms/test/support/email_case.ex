defmodule CMS.EmailCase do
  @moduledoc """
  This module defines the test case to be used by
  tests that require sending emails.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      import CMS.EmailHelpers
    end
  end

  setup do
    CMS.EmailHelpers.clear_sent_emails()
    :ok
  end
end
