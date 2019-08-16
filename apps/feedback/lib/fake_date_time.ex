defmodule Feedback.FakeDateTime do
  @moduledoc "Mock DateTime module for testing"

  def utc_now do
    # This timestamp is July 8 2019, 08:04:03 UTC
    {:ok, test_time} = DateTime.from_unix(1_562_573_043)
    test_time
  end
end
