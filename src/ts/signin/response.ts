import * as ws from "../websocket/websocket";

export function Response() {
  ws.websocket.onmessage = (event) => {
    let response = JSON.parse(event.data);
    if (response.result === 1) {
      localStorage.setItem("sessionId", response.sessionId);
      window.location.replace("./account.html");
    } else {
      for (let i = 0; i < response.errmsgs.length; i++) {
        alert(response.errmsgs[i]);
      }
    }
  };
}
