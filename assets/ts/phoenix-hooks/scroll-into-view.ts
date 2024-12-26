import { ViewHook } from "phoenix_live_view";

const ScrollIntoView: Partial<ViewHook> = {
  mounted() {
    if (this.el) {
      this.el.scrollIntoView({ behavior: "smooth" });
    }
  },
  updated() {
    if (this.el) {
      this.el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default ScrollIntoView;
