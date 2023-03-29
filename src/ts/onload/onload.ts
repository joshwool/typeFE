import * as ws from "../websocket/websocket";

export function IndexOnload() {
  if (localStorage.getItem("sessionId") !== null) {
    ws.websocket.send(
      JSON.stringify({
        operation: 3, // Config load
        sessionId: localStorage.getItem("sessionId"),
        config: "test_config",
      })
    );
  } else {
  }
}

export function AccountOnload() {
  if (localStorage.getItem("sessionId") !== null) {
  } else {
    window.location.replace("./login.html"); // Redirects to login page if not logged in
  }
}
