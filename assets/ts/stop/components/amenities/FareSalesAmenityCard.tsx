import React from "react";
import { Stop } from "../../../__v3api";
import Loading from "../../../components/Loading";
import { faresIcon } from "../../../helpers/icon";
import { FetchState, FetchStatus } from "../../../helpers/use-fetch";
import useFetch from "../../../hooks/useFetch";
import AmenityCard, {
  AmenityImage,
  AmenityLink,
  AmenityModal
} from "./AmenityCard";

const FareRetailLocations = (stop: Stop): JSX.Element => (
  <>
    <h2 className="h3 u-mb-8">Fare Retail Locations</h2>
    <p className="u-mt-0">
      This stop does not have fare vending machines, but you can purchase fares
      at a{" "}
      <a
        href={`/fares/retail-sales-locations?location[address]=${stop.address}&location[latitude]=${stop.latitude}&location[longitude]=${stop.longitude}`}
      >
        nearby retail location
      </a>{" "}
      or pay with cash on any bus.
    </p>
  </>
);

const FareVendingMachines = (): JSX.Element => (
  <>
    <h2 className="h3 u-mb-8">Fare Vending Machines</h2>
    <AmenityImage
      src="https://cdn.mbta.com/sites/default/files/styles/max_2600x2600/public/media/2021-11/Fare-Transformation-new-fvms-Nov2021.jpg"
      altText="MBTA fare vending machines"
    />
    <p className="u-mt-0 u-mb-0">At fare vending machines, you can:</p>
    <ul>
      <li>Purchase a CharlieCard or reload an existing one</li>
      <li>Purchase CharlieTickets</li>
    </ul>
    <p className="u-mt-0 u-mb-0">You can pay for your fare with:</p>
    <ul>
      <li>Apple Pay</li>
      <li>Google Pay</li>
      <li>Samsung Pay</li>
      <li>Credit/debit cards</li>
      <li>EBT card</li>
      <li>Cash</li>
    </ul>
  </>
);

const fareTable = (tableData: [string, string][]): React.ReactElement => (
  <>
    <h2 id="fare-types" className="h3">
      Fare Types
    </h2>
    <table aria-labelledby="fare-types" className="fare-sales-table">
      <thead>
        <tr>
          <th scope="col">Trip Type</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(([name, price]) => {
          return (
            <tr key={name}>
              <td>{name}</td>
              <td>{price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </>
);

const renderFareTable = ({
  status,
  data
}: FetchState<[string, string][]>): React.ReactElement | null => {
  switch (status) {
    case FetchStatus.Loading:
      return <Loading />;
    default:
      if (data && data.length > 0) return fareTable(data);
      return null;
  }
};

const FareSalesAmenityCard = ({ stop }: { stop: Stop }): JSX.Element => {
  const icon = faresIcon("c-svg__icon");
  const hasFareVendingMachine = stop["has_fare_machine?"];
  const faresData = useFetch<[string, string][]>(
    `/api/fares/one-way?stop_id=${stop.id}`
  );

  return (
    <AmenityCard
      headerText="Fare Options"
      icon={icon}
      modalContent={
        <AmenityModal headerText={`Fare Options at ${stop.name}`}>
          {renderFareTable(faresData)}
          {hasFareVendingMachine
            ? FareVendingMachines()
            : FareRetailLocations(stop)}
          <AmenityLink url="/fares" text="Learn more about fares" />
          <AmenityLink
            url="/fares/reduced"
            text="Learn more about reduced fares and eligibility"
          />
        </AmenityModal>
      }
    >
      {hasFareVendingMachine
        ? "Purchase fares at fare vending machines."
        : "Purchase fares at nearby retail sales locations."}
    </AmenityCard>
  );
};

export default FareSalesAmenityCard;
