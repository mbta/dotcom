defmodule Dotcom.SentryTest do
  use ExUnit.Case, async: true

  describe "before_send/1" do
    test "ignores not found errors" do
      event = %Sentry.Event{original_exception: %DotcomWeb.NotFoundError{}}

      assert Dotcom.Sentry.before_send(event) == nil
    end

    test "keeps other errors" do
      event = %Sentry.Event{original_exception: RuntimeError.exception("unexpected")}

      assert Dotcom.Sentry.before_send(event) == event
    end
  end
end
