import { ViewHook } from "phoenix_live_view";

const Predictions: Partial<ViewHook> = {
  mounted() {
    if (!window.socket) return;
    if (this.el) {
      const { route, direction, stop } = this.el.dataset;
      if (route && stop) {
        const channelId = `predictions:${route}:${direction || 0}:${stop}`;
        const channel = window.socket.channel(channelId, {});
        this.el.innerHTML = `<div class="text-xs bg-gold-90">Loading predictions...</div>`;
        channel.onClose((payload, ref, joinRef) => {
          this.el.innerHTML = "";
          console.log("onClose", payload, ref, joinRef)
        });
        channel.onError((reason) => {
          this.el.innerHTML = "";
          console.error("onError", reason)
        });
        channel.onMessage((event, payload, red) => {
          console.log("onMessage", event, payload, ref)
        });
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
                  <span class="stop-routes__realtime-icon"><span class="notranslate c-svg__icon--realtime fs-10" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" viewBox="0 0 12 12"><g clip-path="url(#clip0_472_18139)"><path fill="#1C1E23" d="M11.6631 -0.0123221C5.6656 0.520953 0.588008 5.60062 0.0550302 11.5959C0.0349834 11.8214 0.206481 11.9976 0.431712 11.9855L1.62914 11.9208C1.84401 11.9093 2.02827 11.7294 2.04833 11.5143C2.50898 6.59601 6.6624 2.44152 11.5816 1.98082C11.7968 1.96076 11.9765 1.77633 11.9882 1.56163L12.0529 0.36418C12.0648 0.13913 11.8885 -0.0323691 11.6631 -0.0123221ZM9.14553 9.07831C8.494 9.72984 8.44363 10.7356 9.033 11.3249C9.62237 11.9143 10.6281 11.8639 11.2796 11.2124C11.9311 10.5609 11.9815 9.55515 11.3921 8.96577C10.8028 8.37639 9.79706 8.42677 9.14553 9.07831ZM11.4872 3.94922C7.6635 4.37414 4.44087 7.60048 4.01652 11.4201C3.99105 11.6489 4.16356 11.8295 4.39198 11.8165L5.59343 11.7485C5.80272 11.7366 5.98743 11.5652 6.01317 11.3554C6.35051 8.59818 8.67159 6.28241 11.4224 5.94608C11.6322 5.92034 11.8038 5.7358 11.8155 5.52634L11.8835 4.32487C11.8967 4.09626 11.7158 3.92377 11.4872 3.94922Z"></path></g><defs><clipPath><rect width="12" height="12" fill="white"></rect></clipPath></defs></svg></span></span>
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
