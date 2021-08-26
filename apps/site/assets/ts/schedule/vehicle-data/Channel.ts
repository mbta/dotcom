import { Socket, Channel } from "phoenix";
import { useReducer, useEffect, Dispatch } from "react";
import {
  EventData,
  Action,
  ActionWithChannel,
  State,
  reducer as channelReducer
} from "./reducer";

declare global {
  interface Window {
    channels: { [id: string]: Channel };
    socket?: Socket;
  }
}

type UpdateEventName = "reset" | "add" | "update" | "setChannel";

interface UpdateEvent<T> {
  event: UpdateEventName;
  data: T;
}

interface RemoveEvent {
  event: "remove";
  data: string[];
}

export type SocketEvent<T> = UpdateEvent<T> | RemoveEvent;

export const doInitChannel = (id: string): Channel => {
  if (!window.socket) {
    window.socket = new Socket("/socket", {});
    window.socket.connect();
  }

  if (!window.channels) {
    window.channels = {};
  }

  if (window.channels[id]) return window.channels[id];

  const channel = window.socket.channel(id, {});
  window.channels[id] = channel;

  channel
    .join()
    .receive("error", ({ reason }) =>
      // eslint-disable-next-line no-console
      console.error(`failed to join ${id}`, reason)
    )
    // eslint-disable-next-line no-console
    .receive("timeout", () => console.error(`timeout joining ${id}`))
    .receive("ok", () => {
      if (id !== "vehicles:remove") {
        const route = id.split(":");
        channel.push("init", {
          // eslint-disable-next-line camelcase
          route_id: route[1],
          // eslint-disable-next-line camelcase
          direction_id: route[2]
        });
      }
    });

  return channel;
};

export const initChannel = <T>(
  channelId: string,
  onData: (data: SocketEvent<T>) => void
): void => {
  const channel = doInitChannel(channelId);
  channel.on("data", onData);
};

// NB: this removes *all* handlers from the channel. We're currently throwing
// away the reference returned by `channel.on`, so we can't remove a specific
// handler, but we don't have a use case for that yet.
const stopChannel = (id: string): void => {
  if (window.channels && window.channels[id]) {
    window.channels[id].off("data");
  }
};

const setupChannels = (
  channel: string,
  dispatch: Dispatch<ActionWithChannel>
): void => {
  dispatch({ action: { event: "setChannel", data: [] }, channel });
  /* istanbul ignore next */
  initChannel<EventData[]>(channel, (action: Action) =>
    dispatch({ action, channel })
  );
  /* istanbul ignore next */
  initChannel<EventData[]>("vehicles:remove", (action: Action) =>
    dispatch({ action, channel })
  );
};

export const stopChannels = (channel: string): void => {
  stopChannel(channel);
  stopChannel("vehicles:remove");
};

export const useVehicleChannel = (channel: string): State => {
  const [channelState, channelDispatch] = useReducer(channelReducer, {
    channel,
    markers: []
  });
  useEffect(
    () => {
      setupChannels(channel, channelDispatch);
      return () => stopChannels(channel);
    },
    [channel, channelDispatch]
  );
  return channelState;
};
