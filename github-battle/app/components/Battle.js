import React from "react";
import { ThemeConsumer } from "../contexts/theme";
import Instructions from "./Instructions";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";
import Results from "./Results";

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleResetBattle = this.handleResetBattle.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    });
  }

  handleReset(id) {
    this.setState({
      [id]: null,
    });
  }

  handleResetBattle() {
    this.setState({
      playerOne: null,
      playerTwo: null,
      battle: false,
    });
  }

  componentDidMount() {
    this.setState({ playerOne: "sdras", playerTwo: "tylermcginnis" });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;
    if (battle === true) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
          onReset={() => this.handleResetBattle()}
        />
      );
    }
    return (
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>

          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit("playerOne", player)}
              />
            ) : (
              <PlayerPreview
                label="Player One"
                username={playerOne}
                onReset={() => this.handleReset("playerOne")}
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={(player) => this.handleSubmit("playerTwo", player)}
              />
            ) : (
              <PlayerPreview
                label="Player Two"
                username={playerTwo}
                onReset={() => this.handleReset("playerTwo")}
              />
            )}
          </div>

          {playerOne && playerTwo && (
            <ThemeConsumer>
              {({ theme }) => (
                <button
                  className={`btn ${theme==='light' ? 'dark': 'light'}-btn btn-space`}
                  onClick={() =>
                    this.setState({
                      battle: true,
                    })
                  }
                >
                  Battle
                </button>
              )}
            </ThemeConsumer>
          )}
        </div>
      </React.Fragment>
    );
  }
}
