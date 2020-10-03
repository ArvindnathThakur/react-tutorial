import React from "react";
import Instructions from "./Instructions";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import { Link } from "react-router-dom";
import ThemeContext from "../contexts/theme";

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  const handleSubmit = (id, player) => {
    if (id === "playerOne") {
      setPlayerOne(player);
    } else if (id === "playerTwo") {
      setPlayerTwo(player);
    }
  };

  const handleReset = (id) => {
    if (id === "playerOne") {
      setPlayerOne(null);
    } else if (id === "playerTwo") {
      setPlayerTwo(null);
    }
  };

  const handleResetBattle = () => {
    setPlayerOne(null);
    setPlayerTwo(null);
  };

  const theme = React.useContext(ThemeContext);
  
  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg">Players</h1>

        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("playerOne", player)}
            />
          ) : (
            <PlayerPreview
              label="Player One"
              username={playerOne}
              onReset={() => handleReset("playerOne")}
            />
          )}

          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              label="Player Two"
              username={playerTwo}
              onReset={() => handleReset("playerTwo")}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className={`btn ${
              theme === "light" ? "dark" : "light"
            }-btn btn-space`}
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
