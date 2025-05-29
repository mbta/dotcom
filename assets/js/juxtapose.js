export default function() {
  if (document.getElementById("juxtapose")) {
    let tries = 3;

    const interval = setInterval(() => {
      console.log("JUXTAPOSE", tries);

      if (tries <= 0) {
        clearInterval(interval);

        return;
      } else if (window.frames) {
        // const frame = window.frames["juxtapose"];

        // frame. document.getElementById("juxtapose-embed").style.height = "100%";

        // frame.document.getElementById("juxtapose-embed").style.width = "100%";

        clearInterval(interval);

        return;
      }
      tries--;
    }, 1000);
  }
}