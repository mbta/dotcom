import React from "react";
import { difference, includes } from "lodash";
import AmenityCard, { AmenityLink, AmenityModal } from "./AmenityCard";
import { parkingIcon } from "../../../helpers/icon";
import { Alert, ParkingLot, Stop } from "../../../__v3api";
import { getExternalMapURI } from "../ExternalMapLink";
import Alerts from "../../../components/Alerts";
import Badge from "../../../components/Badge";
import { alertsInEffect, alertsForEffect } from "../../../models/alert";

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
            Use PayByPhone (location #{park.payment?.mobile_app?.id})
            <ul>
              <li>
                Download on{" "}
                <a href="https://play.google.com/store/apps/details?id=com.paybyphone&shortlink=72quwtf4&c=Footer_Android&pid=NA_Website&af_xp=custom&source_caller=ui&pli=1">
                  Google Play
                </a>
              </li>
              <li>
                Download on{" "}
                <a href="https://paybyphone.onelink.me/ZQkh/vi3pgnpz">
                  App Store
                </a>
              </li>
              <li>
                Visit <a href={mobileAppURL}>PayByPhone website</a>
              </li>
              <li>
                Call <a href="tel:866-234-7275">866-234-7275</a>
              </li>
            </ul>
          </li>
        )}
        {supportsCreditDebitCard && <li>Credit/Debit Card</li>}
        {supportsCash && <li>Cash</li>}
        {supportsInvoice && <li>Get an invoice in the mail for a $1 fee</li>}
      </ul>
      <AmenityLink
        url="/parking/pay-day"
        text="View more payment information"
      />
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
                <h2 className="text-xl u-mt-6">{park.name}</h2>
                <h3>Parking Rates</h3>
                <ul>
                  {park.payment?.daily_rate && (
                    <li>
                      <b>Daily:</b>
                      <span className="u-ps-8">{park.payment?.daily_rate}</span>
                    </li>
                  )}
                  {park.payment?.monthly_rate && (
                    <li>
                      <b>Monthly:</b>
                      <span className="u-ps-8">
                        {park.payment?.monthly_rate}
                      </span>
                    </li>
                  )}
                  {park.capacity?.overnight && (
                    <li>
                      <b>Overnight:</b>
                      <span className="u-ps-8">{park.capacity?.overnight}</span>
                    </li>
                  )}
                </ul>
                {getPaymentElement(park)}
                {park.capacity && (
                  <>
                    <h3>Facility Information</h3>
                    <ul>
                      <li>{park.capacity.total} total parking spots</li>
                      <li>{park.capacity.accessible} accessible spots</li>
                      {park.manager && (
                        <>
                          {park.manager.name && (
                            <li>Managed by {park.manager.name}</li>
                          )}
                          <ul>
                            {park.manager.url && (
                              <li>
                                Visit{" "}
                                <a href={`${park.manager.url}`}>
                                  {park.manager.contact
                                    ? park.manager.contact
                                    : null}{" "}
                                  website
                                </a>
                              </li>
                            )}
                            {park.manager.phone && (
                              <li>
                                Call{" "}
                                <a href={`tel:${park.manager.phone}`}>
                                  {park.manager.phone}
                                </a>
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </ul>
                  </>
                )}
                {externalMapURI && (
                  <AmenityLink
                    url={externalMapURI}
                    text="Get directions to this parking facility"
                  />
                )}
              </div>
            );
          }
        )}
      </div>
      <AmenityLink url="/parking" text="Learn more about parking at the T" />
    </AmenityModal>
  );
};

const getBadge = (
  parkingLots: ParkingLot[],
  areAllParkingLotsClosed: boolean
): JSX.Element => {
  if (parkingLots.length === 0) {
    return <Badge text="Not available" bgClass="u-bg--gray-lighter" />;
  }
  if (areAllParkingLotsClosed) {
    return <Badge text="Temporarily closed" />;
  }
  return <></>;
};

const allParkingLotsClosed = (
  alerts: Alert[],
  parkingLots: ParkingLot[]
): boolean => {
  if (parkingLots.length === 0) {
    return false;
  }

  const filteredAlerts = alertsInEffect(alerts);
  const parkingClosuresIDs = alertsForEffect(
    filteredAlerts,
    "parking_closure"
  ).flatMap(a => a.informed_entity.facility);

  const parkingLotIDs = parkingLots.map(p => p.id);

  // if both arrays have the same ids in them then all lots are closed
  // meaning `openParkingLotIDs` should be empty if all lots are closed
  const openParkingLotIDs = difference(parkingLotIDs, parkingClosuresIDs);

  return openParkingLotIDs.length === 0;
};

const iconColorOverride = (isDisabled: boolean): string => {
  if (isDisabled) {
    return "u-color-gray-dark";
  }

  return "text-primary";
};

const ParkingAmenityCard = ({
  stop,
  alertsForParking
}: {
  stop: Stop;
  alertsForParking: Alert[];
}): JSX.Element => {
  const allParkingClosed = allParkingLotsClosed(
    alertsForParking,
    stop.parking_lots
  );

  const modalContent = getModalContent(stop, alertsForParking);
  const iconColor = iconColorOverride(modalContent === undefined);
  const icon = (
    <span className={`m-stop-page__icon ${iconColor}`}>{parkingIcon()}</span>
  );

  const badge = getBadge(stop.parking_lots, allParkingClosed);

  return (
    <AmenityCard
      headerText="Parking"
      icon={icon}
      modalContent={modalContent}
      badge={badge}
    >
      {stop.parking_lots.length === 0 && (
        <div>This station does not have parking.</div>
      )}
      {!allParkingClosed && stop.parking_lots.length !== 0 && (
        <div>View daily rates and facility information.</div>
      )}
    </AmenityCard>
  );
};

export default ParkingAmenityCard;
