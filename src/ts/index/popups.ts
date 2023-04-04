import * as config from "../config/config";
import * as change from "../config/change";
import * as ws from "../websocket/websocket";

let settings = [
  `
<div class="setting">
    <div class="setname">Mode</div>
    <div class="setops">
        <form id="mode" class="setting">
            <input id="inptest" class="setinp" type="radio" name="mode" value="test">
            <label for="inptest">Test</label>
            <input id="inppractice" class="setinp" type="radio" name="mode" value="practice">
            <label for="inppractice">Practice</label>
        </form>
    </div>
</div>`,
  `
<div class="setting">
    <div class="setname">Type</div>
    <div class="setops">
        <form id="type" class="setting">
            <input id="inptime" class="setinp" type="radio" name="type" value="time">
            <label for="inptime">Time</label>
            <input id="inpwords" class="setinp" type="radio" name="type" value="words">
            <label for="inpwords">Words</label>
        </form>
    </div>
</div>`,
  `
<div class="setting" id="timeNum">
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
  `
<div class="setting" id="wordsNum">
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
</div>
`,
];

let results = `
<div id="resHead">
    <div id="resmode" class="resheader"></div>
    <div id="restype" class="resheader"></div>
    <div id="resnumber" class="resheader"></div>
</div>
<div class="solid-line"></div>
<div id="mainData">
    <div id="resWPM" class="resmData"></div>
    <div id="resACC" class="resmData"></div>
</div>
<div class="solid-line"></div>
<div id="keyData"></div>
`;

export function Blur() {
  // Adds event listener to blur filter
  $("#blur").on("click", function () {
    $("#blur").remove();
    $(".popup").remove();

    $("#wordInp").prop("disabled", false);

    $("#blur").off("click");
  });
}

export function Results() {
  // Opens Results popup
  $("body").append(
    "<div id='blur'></div>",
    "<div class='popup' id='results'></div>"
  );

  $("#results").trigger("focus");
  $("#results").append(results);
  $("#resmode").text(config.typeConfig.mode);
  $("#restype").text(config.typeConfig.type);
  $("#resnumber").text(config.typeConfig.number);
  $("#resWPM").text("WPM: " + config.typeData.wpm.toFixed(1));
  $("#resACC").text("Accuracy: " + config.typeData.acc.toFixed(2) + "%");

  Blur();
}

export function Settings() {
  // Adds event listener on settings button to open settings pop up on click
  $("#setop").on("click", () => {
    $("body").append(
      "<div id='blur'></div>",
      "<div class='popup' id='settings'></div>"
    );

    $("#settings").append(settings[0]);
    $("#settings").append(settings[1]);

    if (config.typeConfig.type === "time") {
      $("#settings").append(settings[2]);
    } else if (config.typeConfig.type === "words") {
      $("#settings").append(settings[3]);
    }

    $("#inp" + config.typeConfig.mode).prop("checked", true);
    $("#inp" + config.typeConfig.type).prop("checked", true);
    $("#" + config.typeConfig.type + config.typeConfig.number).prop(
      "checked",
      true
    );

    // On mode change update mode
    $("input[type='radio'][name='mode']").on("change", function () {
      config.typeConfig.mode = <string>$(this).val();

      change.Config();
    });

    // On type change update testConfig and test format
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

    // On number change, change number
    $("input[type='radio'][name='number']").on("change", function () {
      config.typeConfig.number = <number>$(this).val();

      change.Config();
    });
    Blur();
  });
}
