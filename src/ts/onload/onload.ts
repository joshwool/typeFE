import * as ws from "../websocket/websocket";
import * as setup from "../typing/setup";

export function IndexOnload() {
  if (localStorage.getItem("sessionId") !== null) {
    ws.websocket.onopen = () => {
      ws.websocket.send(
        JSON.stringify({
          operation: 3, // Config load
          sessionId: localStorage.getItem("sessionId"),
          config: "test_config",
        })
      );
    };
  } else {
    setup.GenTest();
  }
}

export function SigninOnload() {
  if (localStorage.getItem("sessionId") !== null) {
    window.location.replace("account.html"); // Redirects to account page if there is a session ID
  }
}

export function AccountOnload() {
  if (localStorage.getItem("sessionId") !== null) {
  } else {
    window.location.replace("signin.html"); // Redirects to login page if there is no sessionId
  }
}
