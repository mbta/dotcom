defmodule Zones.Zone do
  @moduledoc """
  Represents a commuter rail zone
  """

  @type t :: String.t()

  @doc """
  Returns whether or not this is a "combo" zone.
  A combo zone uses one fare between the terminus stop, and another between all other stops.

  iex> Zones.Zone.combo_zone?("1A-1")
  true
  iex> Zones.Zone.combo_zone?("1A-2")
  true
  iex> Zones.Zone.combo_zone?("1A")
  false
  iex> Zones.Zone.combo_zone?("2")
  false
  """
  @spec combo_zone?(t()) :: boolean()
  def combo_zone?(zone), do: String.contains?(zone, "-")

  @doc """
  Returns the zone designation between the stop and the terminus.
  Intended to help with combo zones, but safe if given a non-combo zone.

  iex> Zones.Zone.terminus_zone("1A-1")
  "1A"
  iex> Zones.Zone.terminus_zone("1A-2")
  "1A"
  iex> Zones.Zone.terminus_zone("1A")
  "1A"
  """
  @spec terminus_zone(t()) :: t()
  def terminus_zone(zone) do
    if combo_zone?(zone) do
      zone
      |> String.split("-")
      |> List.first()
    else
      zone
    end
  end

  @doc """
  Returns the zone designation between the stop and other non-terminus stops.
  Intended to help with combo zones, but safe if given a non-combo zone.

  iex> Zones.Zone.general_zone("1A-1")
  "1"
  iex> Zones.Zone.general_zone("1A-2")
  "2"
  iex> Zones.Zone.general_zone("1A")
  "1A"
  """
  @spec general_zone(t()) :: t()
  def general_zone(zone) do
    if combo_zone?(zone) do
      zone
      |> String.split("-")
      |> List.last()
    else
      zone
    end
  end
end
