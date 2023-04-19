import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { SWRConfig } from "swr";
import { useRoutesByStop } from "../useRoute";
import { Polyline } from "../../leaflet/components/__mapdata";
import { zip } from "lodash";

const unmockedFetch = global.fetch;
const HookWrapper: React.FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const testRoutes = [
  {
    id: "0",
    type: 0
  },
  {
    id: "1",
    type: 1
  },
  {
    id: "2",
    type: 2
  },
  {
    id: "3",
    type: 3
  },
  {
    id: "4",
    type: 4
  }
];

const testPolylines: Polyline[][] = [
  [
    {
      id: "0",
      "dotted?": false,
      weight: 2,
      positions: [
        [1, 2],
        [3, 4]
      ],
      color: "#ABC123"
    }
  ],
  [
    {
      id: "1",
      "dotted?": false,
      weight: 2,
      positions: [
        [5, 2],
        [7, 4]
      ],
      color: "#ABC123"
    }
  ],
  [
    {
      id: "2",
      "dotted?": false,
      weight: 2,
      positions: [
        [9, 2],
        [3, 4]
      ],
      color: "#ABC123"
    }
  ],
  [
    {
      id: "3",
      "dotted?": false,
      weight: 2,
      positions: [
        [2, 2],
        [8, 4]
      ],
      color: "#ABC123"
    }
  ],
  [
    {
      id: "4",
      "dotted?": false,
      weight: 2,
      positions: [
        [9, 2],
        [3, 4]
      ],
      color: "#ABC123"
    }
  ]
];

const testData = zip(testRoutes, testPolylines);
describe("useRoute", () => {
  beforeAll(() => {
    // provide mocked network response
    global.fetch = jest.fn(
      () =>
        new Promise((resolve: Function) =>
          resolve({
            json: () => testData,
            ok: true,
            status: 200,
            statusText: "OK"
          })
        )
    );
  });

  describe("useRoutesByStop", () => {
    it("should return an array of routes and lines", async () => {
      const { result, waitFor } = renderHook(() => useRoutesByStop("stop-id"), {
        wrapper: HookWrapper
      });
      await waitFor(() => expect(result.current).toEqual(testData));
      const [route, lines] = result.current![0];
      expect(typeof route).toBe("object");
      expect(lines[0]).toHaveProperty("color");
      expect(lines[0]).toHaveProperty("weight");
      expect(lines[0]).toHaveProperty("positions");
    });
  });

  afterAll(() => {
    global.fetch = unmockedFetch;
  });
});
