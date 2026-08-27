defmodule Util.Behaviour do
  @moduledoc """
  Behaviour for Util time functions that need to be mocked in tests.
  """

  @callback now() :: DateTime.t()
  @callback service_date(DateTime.t()) :: Date.t()
end
