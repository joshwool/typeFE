import "../../styles/pages/account.scss";
import * as onload from "../onload/onload";
import * as response from "../account/response";

$(() => {
  onload.AccountOnload();
  response.Response();
});
