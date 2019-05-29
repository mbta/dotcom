defmodule SiteWeb.StopView.Parking do
  @moduledoc """
  Parking display functions
  """
  alias Site.PhoneNumber
  alias Stops.Stop.ParkingLot
  alias Stops.Stop.ParkingLot.{Manager}

  @spec parking_lot(ParkingLot.t()) :: map
  def parking_lot(lot) do
    %{lot | manager: manager(lot.manager)}
  end

  @spec manager(Manager.t() | nil) :: Manager.t()
  def manager(%Manager{name: _name, url: _url, contact: _contact, phone: phone} = manager) do
    %{manager | phone: format_phone(phone)}
  end

  def manager(nil), do: nil

  @spec format_phone(String.t() | nil) :: String.t() | nil
  def format_phone(nil), do: nil

  def format_phone(number) do
    pretty_formatted = PhoneNumber.pretty_format(number)

    case PhoneNumber.machine_format(number) do
      nil ->
        pretty_formatted

      machine_formatted ->
        "tel:#{machine_formatted}"
    end
  end
end
