import React from "react";

export default class Hover extends React.Component {
  state = {
    hovering: false,
  };
  mouseOver = () => {
    this.setState({ hovering: true });
  };

  mouseOut = () => {
    this.setState({ hovering: false });
  };

  render() {
    return (
      <div
        onMouseEnter={() => this.mouseOver()}
        onMouseLeave={() => this.mouseOut()}
      >
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
