import { Channel, Socket, SocketConnectOption } from "phoenix";
import storageOptions from "../../js/storage.js";

declare global {
  interface Window {
    channels: { [id: string]: Channel };
    socket: Socket;
  }
}

type UpdateEventName = "reset" | "add" | "update";

interface UpdateEvent<DataType> {
  event: UpdateEventName;
  data: DataType;
}

interface RemoveEvent {
  event: "remove";
  data: string[];
}

export type SocketEvent<DataType> = UpdateEvent<DataType> | RemoveEvent;

export const isVehicleChannel = (channelId: string): boolean =>
  (channelId.includes("vehicles:") || channelId.includes("vehicles-v2:")) &&
  !channelId.includes(":remove");

const joinChannel = <T>(
  channelId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleJoin?: (event: any) => void
): void => {
  if (!window.socket) return;

  if (!window.channels[channelId]) {
    window.channels[channelId] = window.socket.channel(channelId, {});
  }

  const channel = window.channels[channelId];

  if (!["joined", "joining"].includes(channel.state)) {
    channel
      .join(10000)
      .receive("error", ({ reason }) => {
        /* eslint-disable no-console */
        console.error(`failed to join ${channelId}`, reason);
        const errorEvent = new CustomEvent<{ error: string }>(channelId, {
          detail: { error: reason }
        });
        document.dispatchEvent(errorEvent);
      })
      .receive("timeout", response => {
        /* eslint-disable no-console */
        console.error(`failed to join ${channelId}`, response);
        const errorEvent = new CustomEvent<{ error: string }>(channelId, {
          detail: { error: "timeout" }
        });
        document.dispatchEvent(errorEvent);
      })
      .receive("ok", event => {
        console.log(`success joining ${channelId}`);
        if (handleJoin && event) {
          handleJoin(event);
        }
        if (isVehicleChannel(channelId)) {
          const [, route_id, direction_id] = channelId.split(":");
          channel.push("init", { route_id, direction_id });
        }
      });
  }

  channel.on("data", (data: T) => {
    const event = new CustomEvent<T>(channelId, { detail: data });
    document.dispatchEvent(event);
  });

  channel.onError((reason: string) => {
    if (reason) {
      console.error(`error on channel ${channelId} : ${reason}`);
    }
  });

  if (isVehicleChannel(channelId)) {
    const [baseChannel] = channelId.split(":");
    joinChannel(`${baseChannel}:remove`);
  }
};

const leaveChannel = (id: string): void => {
  if (window.channels && window.channels[id]) {
    window.channels[id].off("data");
    window.channels[id].leave();
    delete window.channels[id];
  }

  if (isVehicleChannel(id)) {
    const [baseChannel] = id.split(":");
    leaveChannel(`${baseChannel}:remove`);
  }
};

const setupChannels = (): void => {
  const socketOptions = { ...storageOptions } as Partial<SocketConnectOption>;
  window.socket = new Socket("/socket", socketOptions);
  window.socket.onClose(event => {
    if (event.type === "close" && !event.wasClean) {
      // eslint-disable-next-line no-console
      console.log(
        "Socket was forced closed by the browser -- reloading to establish WebSocket connection."
      );
      window.location.reload();
    }
  });
  window.socket.connect();
  window.channels = {};

  const joinAllChannels = (): void => {
    document.querySelectorAll("[data-channel]").forEach(el => {
      const channelId = el.getAttribute("data-channel");
      if (channelId) joinChannel(channelId);
    });
  };

  window.addEventListener("load", joinAllChannels);

  // leave subscribed channels when navigating away from a page.
  const leaveAllChannels = (): void => {
    Object.keys(window.channels).forEach(id => leaveChannel(id));
  };
  document.addEventListener("DOMContentLoaded", leaveAllChannels);
};

export { joinChannel, leaveChannel };
export default setupChannels;
