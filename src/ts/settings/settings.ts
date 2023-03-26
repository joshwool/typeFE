let settings = ["themes"];
let options = ["wordCount", "timeCount", "difficulty"];

export function Settings() {
  $("body").append(
    "<div style='display: none' id='blur'></div>",
    "<div style='display: none' id='settings'></div>"
  );

  $("#setop").on("click", () => {
    $("#blur").toggle();
    $("#settings").toggle();
  });

  $("#blur").on("click", () => {
    $("#blur").toggle();
    $("#settings").toggle();
  });
}
