defmodule Dotcom.Playground.UpcomingDeparturesManager do
  def subscribe(params) do
    dbg("SUBSCRIBE")
    dbg(params)
    dbg(self())
  end

  def unsubscribe() do
    dbg("UNSUBSCRIBE")
    dbg(self())
  end
end
