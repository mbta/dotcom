defmodule Dotcom.StopPlaceIds do
	@moduledoc "Generated file linking stop ids to Google place ids."

	@doc "Map a stop id to a Google place id."
	@spec stop_place_id(Stop.id_t()) :: String.t() | nil
	def stop_place_id("1"), do: "ChIJTUMeBjt644kR1Dsuni7KgH0"
	def stop_place_id("10"), do: "ChIJGdvzT0F644kR_bz2iUbdVpw"
	def stop_place_id("10000"), do: "ChIJmzbu3pxw44kRV0dzyb_s2P8"
	def stop_place_id(_), do: nil
end
