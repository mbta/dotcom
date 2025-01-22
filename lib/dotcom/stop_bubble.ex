defmodule Dotcom.StopBubble do
  @moduledoc false
  @type renderable_bubble :: :stop | :terminus | :empty
  @type bubble_class :: renderable_bubble | :line | :merge
  @type stop_bubble :: {Routes.Route.id_t(), bubble_class}
end
