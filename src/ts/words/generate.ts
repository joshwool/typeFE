// @ts-ignore
import words from "../../../static/json/words_1k.json";
import * as input from "../input/input";
import * as display from "./display";

export let wordList: Array<string> = [];

function genWord() {
  wordList.push(words.words[Math.floor(Math.random() * words.words.length)]);
  let word = $("<div class='word'></div>");
  for (let x = 0; x < wordList[wordList.length - 1].length; x++) {
    let char = $(
      "<span class='char'>" +
        wordList[wordList.length - 1].charAt(x) +
        "</span>"
    );
    word.append(char);
  }
  return word;
}

export function genLines(num: number): void {
  for (let i = 0; i < num; i++) {
    let lineWidth = 0;
    $("#wordDis").append("<div class='line'></div>");
    while (lineWidth < $("#wordDis").outerWidth()) {
      $(".line").last().append(genWord());
      lineWidth += $(".word").last().outerWidth(true);
    }
    $(".word").last().remove();
    wordList.pop();
  }
  if (input.wordInd === 0) {
    $(".word").first().addClass("wordCur");
  }
  display.updateLines();
}

export function genPractice(words: Array<string>) {
  let wordDis = $("#wordDis");
  let wordsDone = false;
  let count = 0;

  while (!wordsDone) {
    if (wordDis.find(".line").length === 0) {
      wordDis.append("<div class='line'></div>");
    }
    let lineWidth = 0;
    $(".line")
      .last()
      .find(".word")
      .each(() => {
        lineWidth += $(this).outerWidth();
      });
    let lineDone = false;
    while (!lineDone) {
      let word = $("<div class='word'></div>");
      wordList.push(words[count]);
      for (let i = 0; i < wordList[wordList.length - 1].length; i++) {
        let char = $(
          "<span class='char'>" +
            wordList[wordList.length - 1].charAt(i) +
            "</span>"
        );
        word.append(char);
      }
      $(".line").last().append(word);
      lineWidth += $(".word").last().outerWidth(true);
      count++;
      if (lineWidth > wordDis.outerWidth()) {
        wordDis.append("<div class='line'></div>");
        $(".line").last().prepend($(".line").eq(-2).children().last());
        lineDone = true;
      }
      if (count === words.length) {
        lineDone = true;
        wordsDone = true;
      }
    }
  }
  display.updateLines();
}
