defmodule Dotcom.Utils.DateTime.Behaviour do
  @moduledoc """
  A behaviour for working with date_times.
  """

  @callback now() :: DateTime.t()

  @callback today() :: Date.t()

  @callback in_range?(
              Dotcom.Utils.DateTime.date_time_range(),
              DateTime.t()
            ) :: boolean
end
