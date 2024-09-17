defmodule Dotcom.TripPlan.PersonalDetail do
  @moduledoc """
  Additional information for legs which are taken on personal transportation
  """
  @derive Jason.Encoder
  defstruct distance: 0.0,
            steps: []

  @type t :: %__MODULE__{
          distance: float,
          steps: [__MODULE__.Step.t()]
        }
end

defmodule Dotcom.TripPlan.PersonalDetail.Step do
  @moduledoc """
  A turn-by-turn direction
  """
  @derive Jason.Encoder
  defstruct distance: 0.0,
            relative_direction: :depart,
            absolute_direction: :north,
            street_name: ""

  @type t :: %__MODULE__{
          distance: float,
          relative_direction: relative_direction,
          absolute_direction: absolute_direction | nil
        }
  @type relative_direction ::
          :depart
          | :slightly_left
          | :left
          | :hard_left
          | :slightly_right
          | :right
          | :hard_right
          | :continue
          | :circle_clockwise
          | :circle_counterclockwise
          | :elevator
          | :uturn_left
          | :uturn_right
          | :enter_station
          | :exit_station
          | :follow_signs

  @type absolute_direction ::
          :north
          | :northeast
          | :east
          | :southeast
          | :south
          | :southwest
          | :west
          | :northwest

  @spec human_relative_direction(relative_direction) :: binary
  def human_relative_direction(:depart), do: "Depart"
  def human_relative_direction(:slightly_left), do: "Slightly left"
  def human_relative_direction(:left), do: "Left"
  def human_relative_direction(:hard_left), do: "Hard left"
  def human_relative_direction(:slightly_right), do: "Slightly right"
  def human_relative_direction(:right), do: "Right"
  def human_relative_direction(:hard_right), do: "Hard right"
  def human_relative_direction(:continue), do: "Continue"
  def human_relative_direction(:circle_clockwise), do: "Enter the traffic circle"
  def human_relative_direction(:circle_counterclockwise), do: "Enter the traffic circle"
  def human_relative_direction(:elevator), do: "Take the elevator"
  def human_relative_direction(:uturn_left), do: "Make a U-turn"
  def human_relative_direction(:uturn_right), do: "Make a U-turn"
  def human_relative_direction(:enter_station), do: "Enter the station"
  def human_relative_direction(:exit_station), do: "Exit the station"
  def human_relative_direction(:follow_signs), do: "Follow signs"

  @spec human_relative_preposition(relative_direction) :: binary
  def human_relative_preposition(:follow_signs), do: "for"
  def human_relative_preposition(:enter_station), do: "through"
  def human_relative_preposition(:exit_station), do: "towards"
  def human_relative_preposition(_), do: "onto"
end
