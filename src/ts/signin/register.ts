import * as ws from "../websocket/websocket";

export function Register() {
  $("#regForm").on("submit", (event) => {
    event.preventDefault(); // Prevents default handling of event as we want to handle the event ourselves

    let valid = true;

    // Store values of each input box in cache
    let uname = <string>$("#regUname").val();
    let email = <string>$("#regEmail").val();
    let confEmail = <string>$("#regConfEmail").val();
    let pword = <string>$("#regPword").val();
    let confPword = <string>$("#regConfPword").val();

    //Checks if there are any missing fields
    $(".regInput").each(function () {
      if ($(this).val() === undefined) {
        alert("Missing fields");
        return false;
      }
    });

    // Checks if the email is the same in both boxes
    if (email !== confEmail) {
      alert("Emails do not match");
      valid = false;
    }

    // Checks if the password is the same in both boxes
    if (pword !== confPword) {
      alert("Passwords do not match");
      valid = false;
    }

    let unameRegex = /^[A-Za-z0-9]{3,20}$/;

    if (!uname.match(unameRegex)) {
      alert(
        "Username is not valid. Must be: \n between 3-20 characters \n no special characters"
      );
      valid = false;
    }

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
      alert("Email is not valid");
      valid = false;
    }

    let pwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!pword.match(pwordRegex)) {
      alert(
        "Password is not valid. Must have at least:\n 8 characters \n 1 symbol \n 1 upper case character \n 1 lower case character \n 1 number"
      );
      valid = false;
    }

    if (valid) {
      // If there is anything wrong with inputs then nothing will be sent to the server
      if (ws.websocket.readyState === 1) {
        // Checks if websocket connection is open.
        ws.websocket.send(
          // Sends json string with all necessary info to server
          JSON.stringify({
            operation: 1, // Register operation
            username: uname,
            email: email,
            password: pword,
          })
        );
        console.log("sent to server");
      } else {
        // If connection is not open registration cannot occur so user is told to try later.
        alert("Server down, please try again later");
      }
    }
  });
}
