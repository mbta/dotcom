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

const getSocket = (): Socket => {
  if (!window.socket) {
    const socketOptions = { ...storageOptions } as Partial<SocketConnectOption>;
    const socket = new Socket("/socket", socketOptions);
    window.socket = socket;
    window.channels = {};
    socket.connect();
  } else if (!window.channels) {
    window.channels = {};
  }

  return window.socket;
};

const joinChannel = <T>(
  channelId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleJoin?: (event: any) => void
): void => {
  const socket = getSocket();

  if (!window.channels[channelId]) {
    window.channels[channelId] = socket.channel(channelId, {});
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

export { joinChannel, leaveChannel };
