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
  constructor(props) {
    super(props);
    this.state = {
      content: props.text
    };
  }

  render() {
    return (
      <p style={styles.content}>
        {this.state.content} <FaSpinner className="fa-spin" />
      </p>
    );
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired
};

Loading.defaultProps = {
  text: "Loading"
};
