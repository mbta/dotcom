import jsdom from "mocha-jsdom";
import { expect } from "chai";
import { CRTimetableTrains, channelDataId } from "../cr-timetable-trains";
import { trainIcon } from "../cr-timetable-train-icons";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("CRTimetableTrains", () => {
  jsdom({ url: testURL });

  beforeEach(() => {
    window.$ = jsdom.rerequire("jquery");
    window.jQuery = selector => {
      return {
        tooltip: value => {
          return;
        }
      };
    };

    document.body.innerHTML = `
      <table>
      <td class="schedule-timetable-time-col js-tt-cell" data-html="true" data-toggle="tooltip" id="Middleborough/Lakeville-CR-Weekday-Fall-18-002-tooltip" style="height: 56px;">
        <span class="schedule-timetable-time-col-data">
          <span class="timetable-data-icon">
                &nbsp;
          </span>
          <span class="timetable-data-time ">
            <span class="sr-only">05:20 AM</span>
            <span aria-hidden="true">05:20A</span>
          </span>
          <span class="timetable-data-icon" id="Middleborough/Lakeville-CR-Weekday-Fall-18-002">
            &nbsp;
          </span>
        </span>
      </td>
      <td class="schedule-timetable-time-col js-tt-cell" data-html="true" data-toggle="tooltip" data-original-title="test-data" id="Brockton-CR-Weekday-Fall-18-028-tooltip" style="height: 56px;">
      <span class="schedule-timetable-time-col-data">
        <span class="timetable-data-icon">
              &nbsp;
        </span>
        <span class="timetable-data-time ">
          <span class="sr-only">05:30 AM</span>
          <span aria-hidden="true">05:30A</span>
        </span>
        <span class="timetable-data-icon" id="Brockton-CR-Weekday-Fall-18-028">
          ${trainIcon("1234")}
        </span>
      </span>
      </td>
      <td class="schedule-timetable-time-col js-tt-cell" data-html="true" data-toggle="tooltip" id="Holbrook/Randolph-CR-Weekday-Fall-18-028-tooltip" style="height: 56px;">
        <span class="schedule-timetable-time-col-data">
          <span class="timetable-data-icon">
                &nbsp;
          </span>
          <span class="timetable-data-time ">
            <span class="sr-only">05:40 AM</span>
            <span aria-hidden="true">05:40A</span>
          </span>
          <span class="timetable-data-icon" id="Holbrook/Randolph-CR-Weekday-Fall-18-028">
            &nbsp;
          </span>
        </span>
      </td>
      </table>
      <script type="text/plaintext" id="js-cr-vehicle-data" data-channel="vehicles:CR-Middleborough:1"></script>
      <script id="js-cr-vehicle-schedules-data" type="application/json">{"Holbrook/Randolph-CR-Weekday-Fall-18-028":{"trip_id":"CR-Weekday-Fall-18-028","stop_sequence":5,"stop_name":"Holbrook/Randolph"},"Brockton-CR-Weekday-Fall-18-028":{"trip_id":"CR-Weekday-Fall-18-028","stop_sequence":4,"stop_name":"Brockton"}}</script>
      <script type="application/json" id="js-cr-vehicle-prior-stops-data">{"CR-Weekday-Fall-18-028-4":"Brockton-CR-Weekday-Fall-18-028","CR-Weekday-Fall-18-004-5":"Holbrook/Randolph-CR-Weekday-Fall-18-004"}</script>
    `;
  });

  describe("constructor", () => {
    it("creates a new CRTimetableTrains with parsed data", () => {
      const trains = new CRTimetableTrains(
        document.getElementById(channelDataId)
      );
      expect(trains).to.be.an.instanceOf(CRTimetableTrains);
      expect(
        trains.schedules["Holbrook/Randolph-CR-Weekday-Fall-18-028"]
      ).to.eql({
        trip_id: "CR-Weekday-Fall-18-028",
        stop_sequence: 5,
        stop_name: "Holbrook/Randolph"
      });
      expect(trains.priorStops["CR-Weekday-Fall-18-028-4"]).to.equal(
        "Brockton-CR-Weekday-Fall-18-028"
      );
    });
  });

  describe("onVehicles", () => {
    it("handles adding a train in transit when calling updateTrain", () => {
      const trains = new CRTimetableTrains(
        document.getElementById(channelDataId)
      );
      trains.onVehicles("", {
        data: [
          {
            data: {
              stop_name: "Holbrook/Randolph",
              vehicle: {
                id: "vehicle-1234",
                trip_id: "CR-Weekday-Fall-18-028",
                status: "in_transit"
              }
            },
            marker: {
              tooltip_text:
                "Middleborough/Lakeville train 028 is on the way to Holbrook/Randolph"
            }
          }
        ]
      });
      expect(
        document
          .getElementById("Brockton-CR-Weekday-Fall-18-028")
          .innerHTML.trim()
      ).to.not.equal("&nbsp;");
      expect(
        document
          .getElementById("Holbrook/Randolph-CR-Weekday-Fall-18-028")
          .innerHTML.trim()
      ).to.equal("&nbsp;");
      expect(
        document
          .getElementById("Brockton-CR-Weekday-Fall-18-028-tooltip")
          .getAttribute("data-original-title")
      ).to.equal(
        "<p class='prediction-tooltip'>Middleborough/Lakeville train 028 is on the way to Holbrook/Randolph</p>"
      );
      expect(
        document
          .getElementById("Holbrook/Randolph-CR-Weekday-Fall-18-028-tooltip")
          .getAttribute("data-original-title")
      ).to.equal(null);
    });

    it("handles adding a train stopped by calling updateTrain", () => {
      const trains = new CRTimetableTrains(
        document.getElementById(channelDataId)
      );
      trains.onVehicles("", {
        data: [
          {
            data: {
              stop_name: "Brockton",
              vehicle: {
                id: "vehicle-1234",
                trip_id: "CR-Weekday-Fall-18-028",
                status: "stopped"
              }
            },
            marker: {
              tooltip_text:
                "Middleborough/Lakeville train 028 has arrived at Brockton"
            }
          }
        ]
      });
      expect(
        document
          .getElementById("Holbrook/Randolph-CR-Weekday-Fall-18-028")
          .innerHTML.trim()
      ).to.equal("&nbsp;");
      expect(
        document
          .getElementById("Brockton-CR-Weekday-Fall-18-028")
          .innerHTML.trim()
      ).to.not.equal("&nbsp;");
      expect(
        document
          .getElementById("Brockton-CR-Weekday-Fall-18-028-tooltip")
          .getAttribute("data-original-title")
      ).to.equal(
        "<p class='prediction-tooltip'>Middleborough/Lakeville train 028 has arrived at Brockton</p>"
      );
      expect(
        document
          .getElementById("Holbrook/Randolph-CR-Weekday-Fall-18-028-tooltip")
          .getAttribute("data-original-title")
      ).to.equal(null);
    });
  });

  describe("onRemoveVehicles", () => {
    it("handles a remove event by removing a train", () => {
      const trains = new CRTimetableTrains(
        document.getElementById(channelDataId)
      );
      const hasVehicle = document.getElementsByClassName("1234")[0];
      expect(
        document
          .getElementById(`${hasVehicle.parentNode.id}-tooltip`)
          .getAttribute("data-original-title")
      ).to.not.equal(null);
      expect(document.getElementsByClassName("1234")[0].innerHTML).to.not.equal(
        "&nbsp;"
      );
      trains.onRemoveVehicles("", { data: ["vehicle-1234"] });
      const noVehicle = document.getElementsByClassName("1234")[0];
      expect(noVehicle.innerHTML).to.equal("&nbsp;");
      expect(
        document
          .getElementById(`${noVehicle.parentNode.id}-tooltip`)
          .getAttribute("data-original-title")
      ).to.equal(null);
    });
  });
});
