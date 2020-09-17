import React from "react";
import PropTypes from "prop-types";
import {FaSpinner} from 'react-icons/fa'
const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  }
};

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text,
      spinDegree: 0
    };
  }

  componentDidMount() {
    const { speed, text } = this.props;
    this.interval = window.setInterval(() => {
      this.state.spinDegree === 360
        ? this.setState({ spinDegree: 0 })
        : this.setState(({ spinDegree }) => ({ spinDegree: spinDegree + 60 }));
    }, this.props.speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
      console.log(`Spinning at ${this.state.spinDegree}`)
    return <p style={styles.content}>{this.state.content} <FaSpinner style={{transform: [{rotate: `${this.state.spinDegree}deg`, scaleX: '-1'}]}}/></p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}