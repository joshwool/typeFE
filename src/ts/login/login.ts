import * as ws from "../websocket/websocket";

export function Login() {
  $("#logForm").on("submit", (event) => {
    event.preventDefault();

    let valid = true;
    let uname = <string>$("#logUname").val();
    let pword = <string>$("#logPword").val();

    $(".logInput").each(function () {
      if ($(this).val() === undefined) {
        alert("Missing fields");
        return false;
      }
    });

    let unameRegex = /^?=[a-zA-Z0-9]{3,20}$/;

    if (!uname.match(unameRegex)) {
      alert(
        "Username is not valid. Must be: \n between 3-20 characters \n no special characters"
      );
      valid = false;
    }

    let pwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!pword.match(pwordRegex)) {
      alert(
        "Password is not valid. Must have at least:\n 8 characters \n 1 symbol \n 1 upper case character \n 1 lower case character \n 1 number"
      );
      valid = false;
    }
  });
}
