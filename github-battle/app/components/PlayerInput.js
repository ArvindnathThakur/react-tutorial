import React from "react";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/theme";

export default function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const theme = React.useContext(ThemeContext);
  return (
    <form className="column player" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className={`input-${theme}`}
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === "light" ? "dark" : "light"}-btn`}
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
