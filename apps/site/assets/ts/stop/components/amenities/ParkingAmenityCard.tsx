import React from "react";
import AmenityCard, { AmenityModal } from "./AmenityCard";
import { parkingIcon } from "../../../helpers/icon";
import { Stop } from "../../../__v3api";
import { includes, split } from "lodash";
import { getExternalMapURI } from "../ExternalMapLink";

const getModalContent = (stop: Stop): JSX.Element => {
  // TODO figure out the alerts stuff
  return (
    <AmenityModal headerText={"Parking at " + stop.name}>
      <div>
        {stop.parking_lots.map(
          (park): JSX.Element => {
            const mobileAppId = park.payment.mobile_app?.id;
            const mobileAppURL = park.payment.mobile_app?.url;
            const supportsMobileApp = includes(
              park.payment.methods,
              "Mobile App"
            );
            const supportsInvoice = includes(park.payment.methods, "Invoice");
            const payTokens = split(park.payment.daily_rate, "|");
            let weekdayRate = park.payment.daily_rate;
            let weekendRate = park.payment.daily_rate;
            if (payTokens.length > 1) {
              // String is most likely of the format `Mon-Fri $5 | Sat-Sun $3`
              // so parse out the rates
              weekdayRate = split(payTokens[0], " ")[1];
              weekendRate = split(payTokens[1], " ")[2];
            }
            const supportsOvernight =
              park.capacity.overnight === "Available" ? "Yes" : "No";
            const totalSpots = park.capacity.total;
            const accessibleSpots = park.capacity.accessible;

            const externalMapURI = getExternalMapURI(
              park.longitude,
              park.latitude
            );

            return (
              <div key={park.name}>
                <h2>{park.name}</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <td>Weekday rate</td>
                      <td>Weekend rate</td>
                      <td>Overnight parking</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{weekdayRate}</td>
                      <td>{weekendRate}</td>
                      <td>{supportsOvernight}</td>
                    </tr>
                  </tbody>
                </table>
                <h3>Facility Information</h3>
                <ul>
                  <li>{totalSpots} total parking spots</li>
                  <li>{accessibleSpots} accessible spots</li>
                </ul>
                <div>
                  <a href={externalMapURI} className="c-call-to-action">
                    Get directions to this parking facility
                  </a>
                </div>

                {park.payment.methods.length > 0 && (
                  <>
                    <h2>Payment Methods</h2>
                    <ul>
                      {supportsMobileApp && mobileAppURL && (
                        <li>
                          <a href={mobileAppURL}>PayByPhone</a> (Location{" "}
                          {mobileAppId}). Use the:
                          <ul>
                            <li>App</li>
                            <li>Website</li>
                            <li>Or call 866-234-7275</li>
                          </ul>
                        </li>
                      )}
                      {supportsInvoice && (
                        <li>Invoice in the mail ($1 surcharge)</li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            );
          }
        )}
      </div>
      <div>
        <a href="/parking/pay-day" className="c-call-to-action">
          View more payment information
        </a>
      </div>
      <div>
        <a href="/parking" className="c-call-to-action">
          Learn more about parking at the T
        </a>
      </div>
    </AmenityModal>
  );
};

const ParkingAmenityCard = ({ stop }: { stop: Stop }): JSX.Element => {
  const icon = <span className="m-stop-page__icon">{parkingIcon()}</span>;
  console.log(stop);
  const modalContent = getModalContent(stop);

  return (
    <AmenityCard headerText="Parking" icon={icon} modalContent={modalContent} />
  );
};

export default ParkingAmenityCard;
