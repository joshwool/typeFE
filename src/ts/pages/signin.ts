import "../../styles/pages/signin.scss";
import * as register from "../signin/register";
import * as response from "../signin/response";
import * as login from "../signin/login";
import * as onload from "../onload/onload";

$(() => {
  register.Register();
  login.Login();

  response.Response();

  onload.SigninOnload();
});
