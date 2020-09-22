import React from "react";

export default function withHover(Component, propName = "hovering") {
  return class WithHover extends React.Component {
    state = {
      hovering: false,
    };

    mouseOver = () => {
      this.setState({ hovering: true });
    }

    mouseOut() {
      this.setState({ hovering: false });
    }

    render = () =>  {
      const props = {
        [propName]: this.state.hovering,
        ...this.props,
      };
      return (
        <div
          onMouseEnter={() => this.mouseOver()}
          onMouseLeave={() => this.mouseOut()}
        >
          <Component {...props} />
        </div>
      );
    }
  };
}
