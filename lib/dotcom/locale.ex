defmodule Dotcom.Locale do
  @moduledoc """
  A locale is a combination of an [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code
  along with its [endonym](https://en.wikipedia.org/wiki/Endonym_and_exonym).
  """

  @enforce_keys [:code, :endonym]

  defstruct [:code, :endonym]
end
