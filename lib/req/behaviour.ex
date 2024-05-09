defmodule Req.Behaviour do
  @moduledoc """
  Defines a behaviour for Req.
  """

  @type url() :: URI.t() | String.t()

  @callback new(options :: keyword()) :: Req.Request.t()
  @callback get(url() | keyword() | Req.Request.t(), options :: keyword()) ::
              {:ok, Req.Response.t()} | {:error, Exception.t()}
end
