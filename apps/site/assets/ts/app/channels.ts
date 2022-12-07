import { Socket, Channel } from "phoenix";

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

const isVehicleChannel = (channelId: string): boolean =>
  channelId.includes("vehicles:") && channelId !== "vehicles:remove";

const joinChannel = <T>(channelId: string): void => {
  if (!window.socket) return;

  if (!window.channels[channelId]) {
    window.channels[channelId] = window.socket.channel(channelId, {});
  }

  const channel = window.channels[channelId];

  if (!["joined", "joining"].includes(channel.state)) {
    channel
      .join()
      .receive("error", ({ reason }) =>
        /* eslint-disable no-console */
        console.error(`failed to join ${channelId}`, reason)
      )
      .receive("ok", () => {
        console.log(`success joining ${channelId}`);
        /* eslint-enable no-console */
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

  if (isVehicleChannel(channelId)) {
    joinChannel("vehicles:remove");
  }
};

const leaveChannel = (id: string): void => {
  if (window.channels && window.channels[id]) {
    window.channels[id].off("data");
    window.channels[id].leave();
    delete window.channels[id];
  }
  if (id.includes("vehicles:") && id !== "vehicles:remove") {
    leaveChannel("vehicles:remove");
  }
};

function setupChannels(): void {
  window.socket = new Socket("/socket", {});
  window.socket.connect();
  window.channels = {};

  document.addEventListener(
    "turbolinks:load",
    () => {
      document.querySelectorAll("[data-channel]").forEach(el => {
        const channelId = el.getAttribute("data-channel");
        if (channelId) joinChannel(channelId);
      });
    },
    {
      passive: true
    }
  );

  document.addEventListener(
    "turbolinks:before-render",
    () => {
      Object.keys(window.channels).forEach(id => leaveChannel(id));
    },
    {
      passive: true
    }
  );
}

export { joinChannel, leaveChannel };
export default setupChannels;
