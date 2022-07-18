import React, { ReactElement } from "react";
import ExpandableBlock from "../../../components/ExpandableBlock";
import { Stop, ParkingLot } from "../../../__v3api";
import { Dispatch } from "../../state";

const renderUtilization = (
  lot: ParkingLot
): ReactElement<HTMLElement> | null => {
  if (lot.utilization && lot.capacity) {
    const {
      name,
      capacity: { total },
      // eslint-disable-next-line camelcase
      utilization: { typical, arrive_before }
    } = lot;
    if (typical && total) {
      let message;
      // eslint-disable-next-line camelcase
      if (arrive_before) {
        // eslint-disable-next-line camelcase
        message = `Parking spots at ${name} fill up quickly. We recommend arriving before ${arrive_before}.`;
      } else {
        message = `Parking at ${name} is generally available throughout the weekday.`;
      }
      return <p id="parking-utilization">{message}</p>;
    }
  }
  return null;
};

const renderCapacity = (lot: ParkingLot): ReactElement<HTMLElement> => {
  if (lot.capacity) {
    const { total, accessible, overnight, type } = lot.capacity;
    return (
      <div id="parking-capacity">
        <div className="u-small-caps">Capacity</div>
        <ul className="list-unstyled">
          <li>
            <strong>Total parking spaces: </strong>
            {total}
          </li>
          <li>
            <strong>Accessible spaces: </strong>
            {accessible}
          </li>
          <li>
            <strong>Overnight Parking: </strong>
            {overnight}
          </li>
          <li>
            <strong>Type: </strong>
            {type}
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div id="parking-capacity">
      No MBTA parking. Street or private parking may exist.
    </div>
  );
};

export const maybeAddLinkPrefix = (url: string): string =>
  url.includes("http://") || url.includes("https://") ? url : `https://${url}`;

const renderMobileApp = (
  // @ts-ignore eslint-disable-next-line camelcase
  mobile: ParkingLot["payment"]["mobile_app"]
): ReactElement<HTMLElement> | null => {
  if (mobile) {
    const mobileId = mobile.id ? ` #${mobile.id}` : "";
    const { url } = mobile;
    return (
      <li id="parking-mobile-app">
        <strong>Mobile app: </strong>
        {url ? (
          <a href={maybeAddLinkPrefix(url)}>{mobile.name}</a>
        ) : (
          mobile.name
        )}
        {mobileId}
      </li>
    );
  }
  return null;
};

const renderPayment = (lot: ParkingLot): ReactElement<HTMLElement> => {
  if (lot.payment) {
    const {
      methods,
      mobile_app: mobileApp,
      daily_rate: dailyRate,
      monthly_rate: monthlyRate
    } = lot.payment;

    return (
      <div id="parking-payment">
        <div className="u-small-caps">Payment</div>
        <ul className="list-unstyled">
          {methods.length ? (
            <li>
              <strong>Payment Methods: </strong>
              {methods.join(", ")}
            </li>
          ) : null}
          {renderMobileApp(mobileApp)}
          <li>
            <strong>Daily fee: </strong>
            {dailyRate}
          </li>
          {monthlyRate ? (
            <li>
              <strong>Monthly pass: </strong>
              {monthlyRate}
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
  return <div id="parking-payment">No payment information available</div>;
};

const renderManager = (lot: ParkingLot): ReactElement<HTMLElement> => {
  if (lot.manager) {
    const {
      manager: { name, url, contact, phone }
    } = lot;
    return (
      <div id="parking-manager">
        <div className="u-small-caps">Management</div>
        <ul className="list-unstyled">
          <li>
            <strong>Managed by: </strong>
            {name}
          </li>
          <li>
            <strong>Contact: </strong>
            {contact && url ? <a href={url}>{`${contact}`}</a> : contact}
          </li>
          {phone ? (
            <li>
              <strong>Contact phone: </strong>
              {phone.includes("tel") ? (
                <a href={phone}>{phone.split("tel:+")[1]}</a>
              ) : (
                phone
              )}
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
  return <em id="parking-manager">No contact information available</em>;
};

const renderNote = (lot: ParkingLot): ReactElement<HTMLElement> | null => {
  if (lot.note) {
    return (
      <div className="callout" id="parking-note">
        <strong>Note: </strong>
        {lot.note}
      </div>
    );
  }
  return null;
};

const Lot = ({ lot }: { lot: ParkingLot }): ReactElement<HTMLElement> => (
  <div>
    <h4>{lot.name}</h4>
    <p>
      <a
        href={`https://maps.google.com/?q=${lot.latitude},${lot.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="c-call-to-action"
      >
        Get directions to this parking facility
      </a>
    </p>
    {renderUtilization(lot)}
    {renderCapacity(lot)}
    {renderPayment(lot)}
    {renderManager(lot)}
    {renderNote(lot)}
  </div>
);

const stopOrStation = (stop: Stop): string =>
  stop["station?"] ? "station" : "stop";

interface Props {
  dispatch: Dispatch;
  isExpanded: boolean;
  isFocused: boolean;
  stop: Stop;
}

const Parking = ({
  dispatch,
  isExpanded,
  isFocused,
  stop
}: Props): ReactElement<HTMLElement> => (
  <>
    <ExpandableBlock
      dispatch={dispatch}
      initiallyExpanded={isExpanded}
      initiallyFocused={isFocused}
      id="parking"
      header={{
        text: "Parking",
        iconSvgText: "fa-square-parking"
      }}
    >
      <>
        {stop.parking_lots.length > 0 ? (
          stop.parking_lots.map((lot: ParkingLot) => (
            <Lot key={lot.name} lot={lot} />
          ))
        ) : (
          <p>{`No parking information is available for this ${stopOrStation(
            stop
          )}.`}</p>
        )}
        <p>
          <a href="/parking" className="c-call-to-action">
            Learn more about parking
          </a>
        </p>
      </>
    </ExpandableBlock>
  </>
);

export default Parking;
