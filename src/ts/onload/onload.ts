import * as ws from "../websocket/websocket";
import * as setup from "../index/setup";
import * as config from "../config/config";

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

    $("#account").attr("href", "account.html");
    $("#account").text("Account");
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
    ws.websocket.onopen = () => {
      ws.websocket.send(
        JSON.stringify({
          operation: 3,
          sessionId: localStorage.getItem("sessionId"),
          config: "stats",
        })
      );

      ws.websocket.send(
        JSON.stringify({
          operation: 8,
          sessionId: localStorage.getItem("sessionId"),
        })
      );
    };
  } else {
    window.location.replace("signin.html"); // Redirects to login page if there is no sessionId
  }
}

export function LeaderboardOnload() {
  $("#boardselect").val(config.typeConfig.type + config.typeConfig.number);

  ws.websocket.onopen = () => {
    ws.websocket.send(
      JSON.stringify({
        operation: 10, // Requests leaderboard entries
        type: config.typeConfig.type,
        number: String(config.typeConfig.number),
      })
    );
  };

  // Setups event listener to listen for changes to drop down menu
  $("#boardselect").on("change", function () {
    $("#leaderboard").empty();

    const selectedBoard = $(this).val();

    let type, number;

    if (selectedBoard === "t15") {
      type = "time";
      number = "15";
    } else if (selectedBoard === "t30") {
      type = "time";
      number = "30";
    } else if (selectedBoard === "t60") {
      type = "time";
      number = "60";
    } else if (selectedBoard === "w25") {
      type = "words";
      number = "25";
    } else if (selectedBoard === "w50") {
      type = "words";
      number = "50";
    } else if (selectedBoard === "w100") {
      type = "words";
      number = "100";
    }

    if (ws.websocket.readyState === 1) {
      ws.websocket.send(
        JSON.stringify({
          operation: 10, // Requests leaderboard entries
          type: type,
          number: number,
        })
      );
    }
  });
}
