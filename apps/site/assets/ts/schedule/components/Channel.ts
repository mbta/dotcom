import { Socket, Channel, Push } from "phoenix";

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
          // eslint-disable-next-line @typescript-eslint/camelcase
          route_id: route[1],
          // eslint-disable-next-line @typescript-eslint/camelcase
          direction_id: route[2]
        });
      }
    });

  return channel;
};

const initChannel = <T>(
  channelId: string,
  onData: (data: SocketEvent<T>) => void
): void => {
  const channel = doInitChannel(channelId);
  channel.on("data", onData);
};

export default initChannel;
