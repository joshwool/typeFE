import * as inp from "../input/input";

export function caretCreate() {
  $("#wordDis").append("<div id='caret'></div>");
  $("#caret").offset({
    top:
      $(".wordCur").offset().top +
      ($(".wordCur").outerHeight(true) - $("#caret").outerHeight()) / 2,
    left: $(".wordCur").offset().left,
  });
}

export function caretMove() {}

export function caretBack() {}
