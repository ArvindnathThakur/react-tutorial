import React from "react";
import Card from "./Card";
import Loading from "./Loading";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { battle } from "./utils/api";
import ProfileList from "./ProfileList";

function battleReducer(state, action) {
  if (action.type === "success") {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error(`That action type isn't supported`);
  }
}

export default function Results({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search);
  const [state, dispatch] = React.useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  });

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then((players) =>
        dispatch({ type: "success", winner: players[0], loser: players[1] })
      )
      .catch(({ message }) => dispatch({ type: "error", message }));
  }, [playerOne, playerTwo]);

  const { winner, loser, error, loading } = state;

  if (loading === true) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subheader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>
        <Card
          header={winner.score === loser.score ? "Tie" : "Loser"}
          subheader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          name={loser.profile.login}
          href={loser.profile.html_url}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn dark-btn btn-space">
        Reset
      </Link>
    </React.Fragment>
  );
}
