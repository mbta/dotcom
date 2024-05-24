/* eslint func-names: 0 */
(function() {
  if (typeof Storage !== "undefined") {
    let session_id = localStorage.getItem("session_id");

    if (session_id === null) {
      session_id = window.crypto.randomUUID();

      localStorage.setItem("session_id", session_id);
    }

    const data = { path: window.location.pathname, session_id };

    const request = new Request("/tracker", {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    fetch(request);
  }
})();
