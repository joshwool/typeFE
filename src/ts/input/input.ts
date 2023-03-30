import * as worddis from "../words/display";
import * as gen from "../words/generate";
import * as setup from "../typing/setup";
import * as config from "../config/config";
import * as popups from "../popups/popups";
import * as ws from "../websocket/websocket";

export let wordInd: number = 0;
let inpHistory: Array<any> = [];

let time = 0;
let wordCount = 0;
let counts = true;
let lastTime: number = null;
let interval: NodeJS.Timeout;

export function KeyDown(): void {
  $("#wordInp").on("keydown", (event) => {
    let currentTime = Date.now();
    let inpVal = <any>$("#wordInp").val();
    if (event.which === 8) {
      // Checks if the key pressed is a backspace
      if (inpVal === "") {
        // Checks if at start of word
        if (wordInd === 0) {
          event.preventDefault();
        } else {
          wordCount--;
          if (event.metaKey === true || event.ctrlKey === true) {
            // Although meta key is supposed to clears full line it has been changed to same function as ctrl key
            worddis.ctrlBack(); // Calls ctrlBack function to deal with ctrl/meta key press
            worddis.wordBack(); // Moves current word back by 1
            wordInd--;
            $("#wordInp").val(""); // Empties current input
            event.preventDefault(); // Prevents backspace event from going through as it has already been dealt with
          } else {
            let newInput = inpHistory.pop(); // Pops last word in input history and saves it as newInput
            $("#wordInp").val(newInput); // Changes current input to newInput
            worddis.wordBack();
            wordInd--;
            inpHistory.pop(); // Removes last word in input history
            worddis.backCheck(newInput); // Calls backCheck to deal with function
            event.preventDefault(); // Prevents backspace event from going through as it has already been dealt with
          }
        }
      } else {
        if (event.metaKey === true || event.ctrlKey === true) {
          // Although meta key is supposed to clears full line it has been changed to same function as ctrl key
          worddis.ctrlBack(); // Calls ctrlBack function to deal with ctrl/meta key press
          $("#wordInp").val(""); // Empties current input
          inpHistory.pop(); // Removes last word in input history
          event.preventDefault(); // Prevents backspace event from going through as it has already been dealt with
        } else {
          worddis.charBack();
        }
      }
    } else if (event.which === 32) {
      // Checks if key pressed is a space
      if (inpVal === "")
        event.preventDefault(); // Checks if at the start of a word, if so space is ignored
      else {
        wordCount++;
        inpHistory.push(inpVal); // Pushes the current value in input to history.
        if (inpVal.length < gen.wordList[wordInd].length) {
          // If word is incomplete spaceCheck function is called
          worddis.spaceCheck(inpVal);
        }
        $("#wordInp").val(""); // Clears the input
        worddis.wordForward(); // Moves current word forward
        wordInd++; // Increments current word index
        event.preventDefault();
        if (
          $(".wordCur").parent().index() >
          $(".word")
            .eq(wordInd - 1)
            .parent()
            .index()
        ) {
          // Checks if current word is in a new line
          gen.genLines(1);
          worddis.updateLines();
        }
      }
    } else if (event.which >= 65 && event.which <= 90) {
      if (lastTime !== null) {
        let keyCode = event.which - 65;
        let timeDiff = currentTime - lastTime;
        config.typeData.keys[keyCode][0] = Math.round(
          (config.typeData.keys[keyCode][0] * config.typeData.keys[keyCode][1] +
            timeDiff) /
            (config.typeData.keys[keyCode][1] + 1)
        );
      }
      if (wordInd === 0 && inpVal === "") {
        counts = true;
        if (config.typeConfig.type === "time") {
          time = config.typeConfig.number;
          $("#count").text(time);
          interval = setTimeout(TimeInterval, 1000);
        } else if (config.typeConfig.type === "words") {
          time = 0;
          wordCount = 0;
          $("#count").text("0/" + config.typeConfig.number);
          interval = setTimeout(WordsInterval, 1000);
        }
      }

      // Character Check
      worddis.charForward(event.key, event.which - 65); // Calls charForward function to deal with key press
    }
    lastTime = currentTime;

    if (config.typeConfig.type === "words") {
      $("#count").text(wordCount + "/" + config.typeConfig.number);
    }
  });
}

export function Reset() {
  time = 0;
  wordInd = 0;
  inpHistory = [];
  gen.clearWordList();
  $("#wordInp").val("");
  $("#count").text("");
  $("#WPM").text("WPM");
  $("#ACC").text("ACC");

  if (localStorage.getItem("sessionId") !== null && counts) {
    if (ws.websocket.readyState === 1) {
      ws.websocket.send(
        JSON.stringify({
          operation: 5, // Practice Config Update
          sessionId: localStorage.getItem("sessionId"),
          addConfig: config.typeData.keys,
        })
      );
    } else {
      alert("Server down, please try again later");
    }
  }

  setup.GenTest();
}

export function Results() {
  popups.Results();
  Reset();
}

function TimeInterval() {
  time--;

  WPMACCCalc();

  $("#count").text(time);

  if (Date.now() - lastTime > 3000) {
    // Checks if last key press was > 3 seconds ago
    counts = false; // If it was, test doesn't count
  }
  if (time <= 0) {
    // If time is < 0 then test is over
    $("#wordInp").prop("disabled", true); // Locks the input box to prevent any more typing once time is done
    if (counts) {
      Results();
    } else {
      Reset();
    }
  } else {
    interval = setTimeout(TimeInterval, 1000);
  }
}

function WordsInterval() {
  time++;

  WPMACCCalc();

  if (Date.now() - lastTime > 3000) {
    // Checks if last key press was > 3 seconds ago
    counts = false; // If it was, test doesn't count
  }

  interval = setTimeout(WordsInterval, 1000);
}

function StopInterval() {
  clearTimeout(interval);
}

function WPMACCCalc() {
  let wpm =
    ((config.typeData.totalPresses - config.typeData.errors) /
      5 /
      (config.typeConfig.number - time)) *
    60;
  let accuracy =
    ((config.typeData.totalPresses - config.typeData.errors) /
      config.typeData.totalPresses) *
    100;

  $("#WPM").text(Math.round(wpm));
  $("#ACC").text(Math.round(accuracy));
}
