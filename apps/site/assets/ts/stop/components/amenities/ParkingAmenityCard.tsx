import React from "react";
import { includes } from "lodash";
import AmenityCard, { AmenityLink, AmenityModal } from "./AmenityCard";
import { parkingIcon } from "../../../helpers/icon";
import { Alert, ParkingLot, Stop } from "../../../__v3api";
import { getExternalMapURI } from "../ExternalMapLink";
import Alerts from "../../../components/Alerts";

const getPaymentElement = (park: ParkingLot): JSX.Element => {
  const paymentMethods =
    park.payment && park.payment.methods ? park.payment.methods : [];

  if (paymentMethods.length === 0) {
    return <></>;
  }

  const mobileAppURL = park.payment?.mobile_app?.url;
  const supportsMobileApp = includes(paymentMethods, "Mobile App");
  const supportsInvoice = includes(paymentMethods, "Invoice");
  const supportsCash = includes(paymentMethods, "Cash");
  const supportsCreditDebitCard = includes(paymentMethods, "Credit/Debit Card");

  return (
    <>
      <h3>Payment Methods</h3>
      <ul>
        {supportsMobileApp && mobileAppURL && (
          <li>
            <a href={mobileAppURL}>PayByPhone</a> (Location{" "}
            {park.payment?.mobile_app?.id}). Use the:
            <ul>
              <li>App</li>
              <li>Website</li>
              <li>Or call 866-234-7275</li>
            </ul>
          </li>
        )}
        {supportsCreditDebitCard && <li>Credit/Debit Card</li>}
        {supportsCash && <li>Cash</li>}
        {supportsInvoice && <li>Invoice in the mail ($1 surcharge)</li>}
      </ul>
    </>
  );
};

const getModalContent = (
  stop: Stop,
  alertsForParking: Alert[]
): JSX.Element | undefined => {
  // If there is no parking lot information then this modal should never show
  if (!stop.parking_lots || stop.parking_lots.length === 0) {
    return undefined;
  }
  return (
    <AmenityModal headerText={`Parking at ${stop.name}`}>
      <Alerts alerts={alertsForParking} />
      <div>
        {stop.parking_lots.map(
          (park): JSX.Element => {
            let externalMapURI = null;
            if (park.latitude && park.longitude) {
              externalMapURI = getExternalMapURI(park.latitude, park.longitude);
            }

            return (
              <div key={park.name}>
                <h2 className="mt-6">{park.name}</h2>
                <h3>Parking Rates</h3>
                <ul>
                  {park.payment?.daily_rate && (
                    <li>
                      <b>Daily:</b>
                      <span className="ps-8">{park.payment?.daily_rate}</span>
                    </li>
                  )}
                  {park.payment?.monthly_rate && (
                    <li>
                      <b>Monthly:</b>
                      <span className="ps-8">{park.payment?.monthly_rate}</span>
                    </li>
                  )}
                  {park.capacity?.overnight && (
                    <li>
                      <b>Overnight:</b>
                      <span className="ps-8">{park.capacity?.overnight}</span>
                    </li>
                  )}
                </ul>
                {park.capacity && (
                  <>
                    <h3>Facility Information</h3>
                    <ul>
                      <li>{park.capacity.total} total parking spots</li>
                      <li>{park.capacity.accessible} accessible spots</li>
                    </ul>
                  </>
                )}
                {externalMapURI && (
                  <div>
                    <a href={externalMapURI} className="c-call-to-action">
                      Get directions to this parking facility
                    </a>
                  </div>
                )}
                {getPaymentElement(park)}
              </div>
            );
          }
        )}
      </div>
      <AmenityLink
        url="/parking/pay-day"
        text="View more payment information"
      />
      <AmenityLink url="/parking" text="Learn more about parking at the T" />
    </AmenityModal>
  );
};

const ParkingAmenityCard = ({
  stop,
  alertsForParking
}: {
  stop: Stop;
  alertsForParking: Alert[];
}): JSX.Element => {
  const icon = <span className="m-stop-page__icon">{parkingIcon()}</span>;
  const modalContent = getModalContent(stop, alertsForParking);

  return (
    <AmenityCard headerText="Parking" icon={icon} modalContent={modalContent} />
  );
};

export default ParkingAmenityCard;
