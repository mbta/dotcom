defmodule Fares.Summary do
  @moduledoc """

  Represents a summarization of fares to display on the index page.

  * name: the name of the fare. Something like "Subway One-Way" or "Monthly Pass"
  * modes: the list of mode atoms this fare is valid on
  * fares: a list of tuples: {"media name", "price value"}
  * url: a specific url to link the summary to, if desired. otherwise falls back to heuristics.

  `name` and `fares` should already be rendered for display.
  """
  @type t :: %__MODULE__{
          name: String.t(),
          duration: Fares.Fare.duration(),
          modes: [Routes.Route.route_type()],
          fares: [{String.t(), String.t() | iolist}],
          url: String.t() | nil
        }

  defstruct name: "",
            duration: :single_trip,
            modes: [],
            fares: [],
            url: nil

  def price_range(%__MODULE__{fares: [{_label, range} | _]}) do
    case range do
      # Don't output range if equal:
      [amount, _, amount] -> amount
      _ -> IO.iodata_to_binary(range)
    end
  end
end
