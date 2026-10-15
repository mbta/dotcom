defmodule Dotcom.SentryTest do
  use ExUnit.Case, async: true

  describe "before_send/1 for CSRF errors" do
    test "excludes invalid CSRF tokens" do
      event = Sentry.Event.create_event(exception: %Plug.CSRFProtection.InvalidCSRFTokenError{})

      assert Dotcom.Sentry.before_send(event) == nil
    end

    test "retains unexpected exceptions and events without exceptions" do
      for event <- [
            Sentry.Event.create_event(exception: %RuntimeError{message: "unexpected"}),
            Sentry.Event.create_event(message: "no exception")
          ] do
        assert Dotcom.Sentry.before_send(event) == event
      end
    end
  end
end
