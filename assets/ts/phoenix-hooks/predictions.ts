import { ViewHook } from "phoenix_live_view";
import { parsePrediction } from "../hooks/usePredictionsChannel";
import { sortBy } from "lodash";
import { formatToBostonTime } from "../helpers/date";

const Predictions: Partial<ViewHook> = {
  mounted() {
    if (!window.socket) return;
    if (this.el) {
      const { route, direction, stop } = this.el.dataset;
      if (route && stop) {
        const channelId = `predictions:${route}:${direction || 0}:${stop}`;
        const channel = window.socket.channel(channelId, {});
        // channel.onClose((payload, ref, joinRef) => {
        //   console.log("onClose", payload, ref, joinRef)
        // });
        // channel.onError((reason) => {
        //   console.error("onError", reason)
        // });
        // channel.onMessage((event, payload, red) => {
        //   console.log("onMessage", event, payload, ref)
        // });
        channel.on("data", ({ predictions }) => {
          this.el.innerHTML = "";
          predictions.forEach(({ headsign, time }) => {
            const newParagraph = document.createElement("div");
            newParagraph.innerHTML = `
              <div class="flex justify-between">
                <div class="font-heading font-bold text-lg notranslate">
                  ${headsign}
                </div>
                <div class="font-medium">
                  ${time}
                </div>
              </div>
            `;
            this.el.appendChild(newParagraph);
          })
        });
        channel.join();
      }
    }
  }
};

export default Predictions;
