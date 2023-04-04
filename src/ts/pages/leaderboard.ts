import "../../styles/pages/leaderboard.scss";
import * as onload from "../onload/onload";
import * as response from "../leaderboard/response";

$(() => {
  onload.LeaderboardOnload();

  response.Response();
});
