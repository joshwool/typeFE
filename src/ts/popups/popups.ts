import * as config from "../config/config";
import * as change from "../config/change";

let settings = [
  `<div class="setting">
<div class="setname">Mode</div>
<div class="setops">
<form id="mode" class="setting">
<input id="test" class="setinp" type="radio" name="mode" value="test">
<label for="test">Test</label>
<input id="practice" class="setinp" type="radio" name="mode" value="practice">
<label for="practice">Practice</label>
</form>
</div>
</div>`,
  `<div class="setting">
<div class="setname">Type</div>
<div class="setops">
<form id="type" class="setting">
<input id="time" class="setinp" type="radio" name="type" value="time">
<label for="time">Time</label>
<input id="words" class="setinp" type="radio" name="type" value="words">
<label for="words">Words</label>
</form>
</div>
</div>`,
  `<div class="setting" id="timeNum">
<div class="setname">Type</div>
<div class="setops">
<form class="setting">
<input id="time15" class="setinp" type="radio" name="number" value=15>
<label for="time15">15</label>
<input id="time30" class="setinp" type="radio" name="number" value=30>
<label for="time30">30</label>
<input id="time60" class="setinp" type="radio" name="number" value=60>
<label for="time60">60</label>
</form>
</div>
</div>`,
  `<div class="setting" id="wordsNum">
<div class="setname">Type</div>
<div class="setops">
<form class="setting">
<input id="words25" class="setinp" type="radio" name="number" value=25>
<label for="words25">25</label>
<input id="words50" class="setinp" type="radio" name="number" value=50>
<label for="words50">50</label>
<input id="words100" class="setinp" type="radio" name="number" value=100>
<label for="words100">100</label>
</form>
</div>
</div>`,
];

export function Blur() {
  $("#blur").on("click", function () {
    console.log("test");
    $("#blur").remove();
    $(".popup").remove();

    $("#wordInp").prop("disabled", false);

    $("#blur").off("click");
  });
}

export function Results() {
  $("body").append(
    "<div id='blur'></div>",
    "<div class='popup' id='results'></div>"
  );

  $("#results").trigger("focus");

  Blur();
}

export function Settings() {
  $("#setop").on("click", () => {
    $("body").append(
      "<div id='blur'></div>",
      "<div class='popup' id='settings'></div>"
    );

    $("#settings").append(settings[0]);
    $("#settings").append(settings[1]);

    console.log(config.typeConfig.type);

    if (config.typeConfig.type === "time") {
      $("#settings").append(settings[2]);
    } else if (config.typeConfig.type === "words") {
      $("#settings").append(settings[3]);
    }

    $("#" + config.typeConfig.mode).prop("checked", true);
    $("#" + config.typeConfig.type).prop("checked", true);
    $("#" + config.typeConfig.type + config.typeConfig.number).prop(
      "checked",
      true
    );

    $("input[type='radio'][name='mode']").on("change", function () {
      config.typeConfig.mode = <string>$(this).val();

      change.Config();
    });

    $("input[type='radio'][name='type']").on("change", function () {
      config.typeConfig.type = <string>$(this).val();

      $("#timeNum").remove();
      $("#wordsNum").remove();

      if (config.typeConfig.type === "time") {
        config.typeConfig.number = 15;
        $("#settings").append(settings[2]);
      } else if (config.typeConfig.type === "words") {
        config.typeConfig.number = 25;
        $("#settings").append(settings[3]);
      }

      $("#" + config.typeConfig.type + config.typeConfig.number).prop(
        "checked",
        true
      );

      change.Config();
    });

    $("input[type='radio'][name='number']").on("change", function () {
      config.typeConfig.number = <number>$(this).val();

      change.Config();
    });
    Blur();
  });
}
