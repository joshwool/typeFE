import "../../styles/pages/login.scss";
import * as register from "../login/register";
import * as response from "../login/response";

$(() => {
  register.Register();

  response.Response();
});
