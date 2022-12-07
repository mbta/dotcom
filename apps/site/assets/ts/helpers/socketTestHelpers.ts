/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Socket } from "phoenix";

export const makeMockSocket = (): Socket & { channel: jest.Mock } =>
  ({
    channel: jest.fn()
  } as Socket & { channel: jest.Mock });

export const makeMockChannel = (
  expectedJoinMessage?: "ok" | "error" | "timeout",
  expectedJoinData?: any
) => {
  const result = {
    join: jest.fn(),
    leave: jest.fn(),
    on: jest.fn(),
    receive: jest.fn()
  };
  result.join.mockImplementation(() => result);
  result.receive.mockImplementation((message, handler) => {
    if (message === expectedJoinMessage) {
      // eslint-disable-next-line default-case
      switch (message) {
        case "ok":
          if (expectedJoinData !== undefined) {
            handler(expectedJoinData);
          }
          return result;

        case "error":
          handler({ reason: "ERROR_REASON" });
          break;

        case "timeout":
          handler();
      }
    }

    return result;
  });
  return result;
};

export const makeMockOneShotChannel = (dataOnJoin?: any) => {
  const result: { join: any; on: any; receive: any; leave: any } = {
    join: () => result,
    on: jest.fn(),
    receive: (event: any, handler: ({ data }: { data: any }) => void) => {
      if (event === "ok") {
        handler({ data: dataOnJoin });
      }
      return result;
    },
    leave: jest.fn()
  };

  return result;
};
