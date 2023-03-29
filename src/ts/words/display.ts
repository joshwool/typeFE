import * as input from "../input/input";
import * as gen from "./generate";
import * as caret from "../caret/display";

export function wordsFocus(): void {
  let wordInp = $("#wordInp");

  $("#wordDis").on("click", () => {
    // Sets up an event listener to wait for a click on the word display
    $("#wordInp").trigger("focus"); // Focuses on the hidden input box once the display box has been clicked
  });
  wordInp.on("focusin", () => {
    $("#caret").show(); // Shows caret when the input is being focused
  });
  wordInp.on("focusout", () => {
    $("#caret").hide(); // Hides caret when the input is not focused
  });
}

export function updateLines(): void {
  let lineInd = $(".wordCur").parent().index(); // Stores the index of the line that the current word is on in memory for quicker calling
  if (lineInd > 2) {
    // Checks if the line index is greater than 2
    for (let i = 0; i < lineInd - 2; i++) {
      $(".line").eq(i).hide(); // Hides all lines more than 2 lines above the current line
    }
    /*The reason it checks if the current line index is greater than 2 is to make sure
     * there are only ever two lines above the current line*/
  }
  for (let i = lineInd; i >= (lineInd - 2 > 0 ? lineInd - 2 : 0); i--) {
    $(".line")
      .eq(i)
      .css({
        opacity: 1 - 0.25 * (lineInd - i),
        transform: "scale(" + (1 - 0.15 * (lineInd - i)) + ")",
      });
    $(".line").eq(i).show();
  }
  for (let i = lineInd; i < lineInd + 3; i++) {
    $(".line")
      .eq(i)
      .css({
        opacity: 1 - 0.25 * (i - lineInd),
        transform: "scale(" + (1 - 0.15 * (i - lineInd)) + ")",
      });
    $(".line").eq(i).show();
  }
  if ($(".line").length > lineInd + 3) {
    for (let i = lineInd + 3; i < $(".line").length; i++) {
      $(".line").eq(i).hide();
    }
  }
}

export function resize(): void {
  $(window).on("resize", () => {
    if ($("#wordDis").outerWidth() + screen.width * 0.1 > window.innerWidth) {
      $("#wordDis").width(window.innerWidth * 0.9);
    } else {
      $("#wordDis").width(screen.width * 0.7);
    }
    resizeLines();
  });
}

export function resizeLines(): void {
  $(".line").each((i, line) => {
    console.log("====== Line " + (i + 1) + "======");
    let lineWidth = 10; // starting value = 10 so words do not take up the absolute size of lines
    $(line)
      .children()
      .each((i, word) => {
        lineWidth += $(word).children().length * 14.41 + 8; // Calcs width of word in px (including margin)
      });
    console.log("lineWidth: " + lineWidth);
    console.log("wordDis width: " + $("#wordDis").outerWidth());
    console.log("children before: " + $(line).children().length);
    if (lineWidth > $("#wordDis").outerWidth()) {
      // Checks if line width is greater than display width
      console.log("shrink");
      while (lineWidth > $("#wordDis").outerWidth()) {
        lineWidth -= $(line).children().last().outerWidth(true);
        if ($(".line").eq(i + 1).length === 0) {
          // Checks if the next line exists
          $("#buffer").prepend($(line).children().last()); // Prepends word to buffer if next line doesn't exist
        } else {
          $(".line")
            .eq(i + 1)
            .prepend($(line).children().last()); // Prepends word to buffer if next line does exist
        }
      }
    } else if (lineWidth < $("#wordDis").outerWidth()) {
      console.log("expand");
      let underflow = lineWidth - $("#wordDis").outerWidth(); // Free space potentially available for words
      let pull = i + 1; // Index of line which words will be pulled from
      console.log("underflow: " + underflow);
      while (underflow < 0) {
        let pullElement = undefined;
        while (pullElement === undefined) {
          // Checks if next line has words to pull from
          if ($(".line").eq(pull).children().length > 0) {
            // Checks if there are words in the line
            pullElement = $(".line").eq(pull);
          } else if (pull < $(".line").length - 1) {
            // Checks if all lines have been iterated through
            pull++;
          } else {
            pullElement = $("#buffer"); // If all lines have 0 words in then words will be pulled from buffer
          }
        }
        console.log(pullElement);
        underflow +=
          pullElement.children().first().children().length * 14.41 + 8; // Calcs width of word to be pulled and adds to underflow
        if (underflow < 0) {
          if (pullElement.children().length === 0) {
            // Checks if there are any words in the pull element
            if (pullElement === $("#buffer")) {
              underflow = 0;
            } else {
              pullElement = undefined;
            }
          } else {
            // Appends the first word in the pull element to the line
            $(line).append(pullElement.children().first());
          }
        }
      }
    }
    console.log("children after: " + $(line).children().length);
  });
  console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
  updateLines();
}

export function wordForward(): void {
  $(".word").eq(input.wordInd).removeClass("wordCur");
  $(".word")
    .eq(input.wordInd + 1)
    .addClass("wordCur");
}

export function wordBack(): void {
  $(".word").eq(input.wordInd).removeClass("wordCur");
  $(".word")
    .eq(input.wordInd - 1)
    .addClass("wordCur");
}

export function charForward(key: string): void {
  let inpLength = (<any>$("#wordInp").val()).length;
  if (inpLength + 1 > gen.wordList[input.wordInd].length) {
    $(".wordCur").append("<span class='char incorrect'>" + key + "</span>");
    resizeLines();
  } else if (key === gen.wordList[input.wordInd].charAt(inpLength)) {
    $(".wordCur").children().eq(inpLength).addClass("correct");
  } else {
    $(".wordCur").children().eq(inpLength).addClass("incorrect");
  }
}

export function charBack(): void {
  let inpLength = (<any>$("#wordInp").val()).length; // Stores length of input
  if (inpLength > gen.wordList[input.wordInd].length) {
    $(".wordCur").children().last().remove();
    resizeLines();
  } else {
    $(".wordCur")
      .children()
      .eq(inpLength - 1)
      .removeClass("correct incorrect");
  }
}

export function ctrlBack(): void {
  let word = $(".wordCur"); // Stores current word in memory for quicker calling
  for (let i = 0; i < word.children().length; i++) {
    word.children().eq(i).removeClass("correct incorrect incomplete"); // Removes all classes from all characters in the word
  }
}
export function spaceCheck(inpVal: string): void {
  for (let i = inpVal.length; i < gen.wordList[input.wordInd].length; i++) {
    // Loops through any characters that have not been completed
    $(".wordCur").children().eq(i).addClass("incomplete"); // Sets any characters that have not been typed to incomplete
  }
}

export function backCheck(inpVal: string): void {
  for (let i = inpVal.length; i < gen.wordList[input.wordInd].length; i++) {
    // Loops through any characters that have not been completed
    $(".wordCur").children().eq(i).removeClass("incomplete"); // Removes incomplete class from any incomplete characters
  }
}
