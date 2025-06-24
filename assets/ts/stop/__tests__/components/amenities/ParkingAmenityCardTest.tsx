import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ParkingAmenityCard from "../../../components/amenities/ParkingAmenityCard";
import { Alert, ParkingLot, Stop } from "../../../../__v3api";

const testStop = {
  name: "Test Stop 1",
  parking_lots: [] as ParkingLot[]
} as Stop;

const testLots = [
  {
    id: "test1",
    name: "Test Lot 1",
    capacity: {
      accessible: 123,
      total: 543,
      overnight: "Available"
    },
    payment: {
      daily_rate: "$5",
      monthly_rate: "$300",
      methods: ["Mobile App"],
      mobile_app: {
        url: "Test URL",
        id: "1234"
      }
    },
    manager: {
      name: "Keolis",
      contact: "support page",
      phone: "866-234-7275",
      url: "https://mbta.com"
    }
  },
  {
    id: "test2",
    name: "Test Lot 2",
    capacity: {
      accessible: 0,
      total: 44,
      overnight: "Not available"
    },
    payment: {
      daily_rate: "Free",
      monthly_rate: "$100",
      methods: ["Invoice"]
    },
    latitude: 42.0,
    longitude: -70.123
  }
] as ParkingLot[];

const noPaymentLot = {
  name: "No Payment Lot",
  capacity: null,
  payment: null
} as ParkingLot;

const past = new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(); // 1 day ago
const future = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 1 day in the future

const closedAlerts = [
  {
    active_period: [[past, future]],
    effect: "parking_closure",
    informed_entity: {
      facility: ["test1"]
    }
  },
  {
    active_period: [[past, future]],
    effect: "parking_closure",
    informed_entity: {
      facility: ["test2"]
    }
  }
] as Alert[];

describe("ParkingAmenityCard", () => {
  it("should render the title and description", () => {
    render(
      <ParkingAmenityCard
        stop={{ ...testStop, parking_lots: testLots }}
        alertsForParking={[]}
      />
    );
    expect(screen.getByText("Parking")).toBeDefined();
    expect(
      screen.getByText("View daily rates and facility information.")
    ).toBeInTheDocument();
  });

  it("should render a modal on click", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: [{} as ParkingLot] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Parking at Test Stop 1")).toBeInTheDocument();
  });

  it("should list each parking lot", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Test Lot 1")).toBeInTheDocument();
    expect(screen.getByText("Test Lot 2")).toBeInTheDocument();
  });

  it("should list each lots daily, and monthly cost", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("$5")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();

    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("should hide costs if there are none", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: [noPaymentLot] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));

    expect(screen.queryByText(/Daily:/)).toBeNull();
    expect(screen.queryByText(/Monthly:/)).toBeNull();
    expect(screen.queryByText(/Overnight:/)).toBeNull();
  });

  it("should list each parking lots overnight status", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Not available")).toBeInTheDocument();
  });

  it("should list each parking lots capacity", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("543 total parking spots")).toBeInTheDocument();
    expect(screen.getByText("123 accessible spots")).toBeInTheDocument();

    expect(screen.getByText("44 total parking spots")).toBeInTheDocument();
    expect(screen.getByText("0 accessible spots")).toBeInTheDocument();
  });

  it("should hide the Facility Information if there is no cpacity", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: [noPaymentLot] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));

    expect(screen.queryByText("Facility Information")).toBeNull();
  });

  it("should only list payment methods if each lot supports it", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    const paymentMethods = screen.queryAllByText("Payment Methods");
    const payByPhoneArray = screen.queryAllByText(/PayByPhone/);
    const invoiceArray = screen.getAllByText(/invoice/);
    expect(paymentMethods.length).toBe(2);
    expect(payByPhoneArray.length).toBe(2);
    expect(invoiceArray.length).toBe(1);
    expect(payByPhoneArray[0]).toBeInTheDocument();
    expect(invoiceArray[0]).toBeInTheDocument();
    expect(screen.getByText(/location #1234/)).toBeInTheDocument();
  });

  it("should hide the payment methods if there are non supported", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: [noPaymentLot] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));

    expect(screen.queryByText("Payment Methods")).toBeNull();
  });

  it("should only show a location link if the parking lot has a latitude and longitude", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    const directionLinks = screen.getAllByText(/Get directions/);
    expect(directionLinks.length).toBe(1);
    expect(directionLinks[0]).toBeInTheDocument();
  });

  it("should show alerts in the modal", async () => {
    const alerts = [
      {
        id: "1",
        description: "Test Alert",
        header: "This is a Test Alert",
        effect: "test",
        lifecycle: "new"
      }
    ] as Alert[];
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(
      <ParkingAmenityCard stop={localTestStop} alertsForParking={alerts} />
    );
    await user.click(screen.getByRole("button"));

    expect(screen.getByText(/Test Alert/)).toBeInTheDocument();
  });

  it("should not launch the modal if there is no modal content", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: [] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.queryByText(/Parking at/)).toBeNull();
  });

  it("should display all parking is temporarily closed if all lots are closed", () => {
    const localTestStop = { ...testStop, parking_lots: [...testLots] };
    render(
      <ParkingAmenityCard
        stop={localTestStop}
        alertsForParking={closedAlerts}
      />
    );
    expect(screen.getByText("Temporarily closed")).toBeInTheDocument();
  });

  it("should say if there are no parking lots available at station", () => {
    const localTestStop = { ...testStop, parking_lots: [] };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    expect(
      screen.getByText("This station does not have parking.")
    ).toBeInTheDocument();
    expect(screen.getByText("Not available")).toBeInTheDocument();
  });

  it("should render manager info", async () => {
    const user = userEvent.setup();
    const localTestStop = { ...testStop, parking_lots: testLots };
    render(<ParkingAmenityCard stop={localTestStop} alertsForParking={[]} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText(/Keolis/)).toBeInTheDocument();
    const contactArray = screen.getAllByText(/866-234-7275/);
    expect(contactArray.length).toBeGreaterThan(0);
    expect(screen.getByText(/support page/)).toBeInTheDocument();
  });
});
