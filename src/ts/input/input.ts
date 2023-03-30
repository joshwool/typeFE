import * as worddis from "../words/display";
import * as gen from "../words/generate";
import * as setup from "../typing/setup";
import * as config from "../config/config";

export let wordInd: number = 0;
let inpHistory: Array<any> = [];

let time = 0;
let lastTime: number = null;

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
      if (inpVal === "" && wordInd === 0)
        event.preventDefault(); // Checks if anything has been typed, if not then event is ended.
      else {
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
        let timeDiff = currentTime - lastTime;
      }
      if (wordInd === 0 && inpVal === "" && config.typeConfig.type === "time") {
        time = config.typeConfig.number;
        $("#count").text(time);
        const timeInterval = setInterval(function () {
          time--;
          let wpm =
            ((config.testData.totalPresses - config.testData.errors) /
              5 /
              (config.typeConfig.number - time)) *
            60;
          let accuracy =
            ((config.testData.totalPresses - config.testData.errors) /
              config.testData.totalPresses) *
            100;
          $("#WPM").text(Math.round(wpm));
          $("#ACC").text(Math.round(accuracy));
          $("#count").text(time);
          if (time <= 0) {
            clearInterval(timeInterval);
          }
        }, 1000);
      }
      // Character Check
      worddis.charForward(event.key); // Calls charForward function to deal with key press
    }
    lastTime = currentTime;
  });
}

export function Reset() {
  time = 0;
  setup.GenTest();
}
