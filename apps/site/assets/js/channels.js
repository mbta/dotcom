import { Socket } from "phoenix";

let channels = {};

function onData(channelId) {
  return data => {
    window.$(document).trigger(channelId, data);
  };
}

function initChannel(channelId, socket) {
  if (!channels[channelId]) {
    const channel = socket.channel(channelId, {});
    channels[channelId] = channel;
    channel.on("data", onData(channelId));
    channel
      .join()
      .receive("error", ({ reason }) =>
        console.error(`failed to join ${channelId}`, reason)
      )
      .receive("timeout", () => console.error(`timeout joining ${channelId}`))
      .receive("ok", () => {
        if (channelId !== "vehicles:remove") {
          const route = channelId.split(":");
          channel.push("init", { route_id: route[1], direction_id: route[2] });
        }
      });
  }
}

function initAll(socket) {
  Array.from(document.querySelectorAll("[data-channel]")).forEach(el => {
    const channelId = el.getAttribute("data-channel");
    initChannel(channelId, socket);
    if (channelId.includes("vehicles:")) {
      initChannel("vehicles:remove", socket);
    }
  });
}

function teardown() {
  Object.keys(channels).forEach(id => {
    if (channels[id]) {
      channels[id].leave();
      channels[id] = null;
    }
  });
  channels = {};
}

export default function() {
  const socket = new Socket("/socket", {});
  socket.connect();
  document.addEventListener("turbolinks:load", () => initAll(socket), {
    passive: true
  });
  document.addEventListener("turbolinks:before-render", teardown, {
    passive: true
  });
}
