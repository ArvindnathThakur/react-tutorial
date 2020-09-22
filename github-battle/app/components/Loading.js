import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    text: "Loading",
  };

  render() {
    return (
      <p style={styles.content}>
        {this.state.content} <FaSpinner className="fa-spin" />
      </p>
    );
  }
}
