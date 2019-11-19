import React from "react";
import renderer from "react-test-renderer";
import { Teaser as Project } from "../../__cms";
import { createReactRoot } from "../../app/helpers/testUtils";
import ProjectUpdateList from "../components/ProjectUpdateList";

const projectUpdates: Project[] = [
  {
    title: "PTC Weekly Activities",
    text: "Several lines are affected by day and night operations.",
    status: null,
    routes: [{ mode: "commuter_rail", id: "commuter_rail", group: "mode" }],
    path:
      "/projects/commuter-rail-positive-train-control-ptc/update/ptc-weekly-activities",
    image: {
      url:
        "https://live-mbta.pantheonsite.io/sites/default/files/styles/teaser/public/media/2018-11/commuter-rail-ashland-tie-replacement.jpg?itok=pVKP8vAv",
      alt:
        "A Commuter Rail train with machinery by its side, the track ties being replaced"
    },
    id: 3065,
    date: "2019-08-26"
  },
  {
    title: "Shuttle Service Ends After Wollaston Reopening",
    text:
      "Shuttle service is no longer running between North Quincy, Wollaston, and Quincy Center stations. Reduced fares for Commuter Rail service from Quincy Center to South Station are still in effect.",
    status: null,
    routes: [{ mode: "subway", id: "Red", group: "line" }],
    path:
      "/projects/wollaston-station-improvements/update/shuttle-service-ends-after-wollaston-reopening",
    image: {
      url:
        "https://live-mbta.pantheonsite.io/sites/default/files/styles/teaser/public/projects/wollaston-bus-shuttle-yankee.jpg?itok=kv8lwpvB",
      alt: "Yankee bus shuttle during Wollaston&#039;s renovation"
    },
    id: 3005,
    date: "2019-08-24"
  },
  {
    title: "Early Morning and Late Night Service Becomes Permanent",
    text:
      "As a result of our Late Night and Early Morning Bus Service pilots, we’re making about 140 more weekly late night trips permanent, in addition to previous existing late night service.",
    status: null,
    routes: [{ mode: "bus", id: "bus", group: "mode" }],
    path:
      "/projects/early-morning-and-late-night-bus-service-pilots/update/early-morning-and-late-night",
    image: {
      url:
        "https://live-mbta.pantheonsite.io/sites/default/files/styles/teaser/public/media/2019-08/Bus_Late%20Night%20Bus%20Shelters_2019-6213.jpg?itok=VvFzWkH4",
      alt:
        "A bus pulled up to a bus shelter late at night, with a rider walking away, and an ad for late night bus service on the shelter wall, which reads, &quot;Late-night buses. If you&#039;re working late, so are we. Extended bus hours are here for you.&quot;."
    },
    id: 4388,
    date: "2019-08-23"
  },
  {
    title: "Brighton Ave Bus Lane",
    text:
      "A permanent bus- and bike-only lane on Brighton Ave in Allston opened in June 2019.",
    status: null,
    routes: [
      { mode: "bus", id: "57", group: "route" },
      { mode: "bus", id: "57A", group: "route" },
      { mode: "bus", id: "66", group: "route" }
    ],
    path: "/projects/bus-transit-priority/update/brighton-ave-bus-lane",
    image: {
      url:
        "https://live-mbta.pantheonsite.io/sites/default/files/styles/teaser/public/media/2019-08/Bus_Allston_Dedicated_Lane_2019-4908.jpg?itok=dP6bWBYi",
      alt:
        "A 57 bus travels in a dedicated bus lane on Brighton Ave in Allston, with &quot;Bus Bike Only&quot; prominently stenciled in the dark red lane."
    },
    id: 4467,
    date: "2019-08-20"
  }
];

const placeholderImageUrl = "https://www.example.com/someimage.png";

it("renders", () => {
  createReactRoot();
  const tree = renderer
    .create(
      <ProjectUpdateList
        projectUpdates={projectUpdates}
        placeholderImageUrl={placeholderImageUrl}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
