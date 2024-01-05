defmodule DotcomWeb.Stop.ParkingViewTest do
  @moduledoc false
  use ExUnit.Case, async: true
  import DotcomWeb.StopView.Parking
  alias Stops.Stop.ParkingLot

  @lot %ParkingLot{
    name: "Parking Lot",
    address: "123 Parking Lot Ave.",
    capacity: %ParkingLot.Capacity{
      total: 24,
      accessible: 2,
      overnight: "Available",
      type: "Garage"
    },
    payment: %ParkingLot.Payment{
      methods: ["Pay by Phone", "Credit/Debit Card"],
      mobile_app: %ParkingLot.Payment.MobileApp{
        name: "ParkingApp",
        id: "1515",
        url: "www.mobileapp.com"
      },
      daily_rate: "$10",
      monthly_rate: "$444"
    },
    utilization: %ParkingLot.Utilization{
      typical: 10,
      arrive_before: "06:00 AM"
    },
    manager: %ParkingLot.Manager{
      name: "Operator",
      contact: "ParkingLotContact",
      phone: "a phone number",
      url: "manager url"
    },
    note: "Special instructions about parking"
  }

  describe "parking_lot/1" do
    test "includes phone number in machine format for a hyperlink, if formatable" do
      manager = @lot.manager
      lot_with_phone = %{@lot | manager: %{manager | phone: "9789879999"}}
      assert parking_lot(lot_with_phone).manager.phone == "tel:+1-978-987-9999"
    end

    test "returns the phone number if not machine formattable" do
      assert parking_lot(@lot).manager.phone == "a phone number"
    end
  end
end
