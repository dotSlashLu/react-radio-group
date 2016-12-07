import React from "react";
import classNames from "classnames";

class StateRadio extends React.Component {
  constructor(...args) {
    super(...args);
    let v = false;
    if (this.props.hasOwnProperty("value"))
      v = this.props.value;
    this.state = {
      active: v
    };
  }

  clickHandler(e) {
    e.preventDefault();
    if (this.props.readOnly) return;
    let s = this.state.active ? false : true;
    this.setState({active: s});
    this.props.clickHandler(s);
  }

  render() {
    let className = classNames({
      btn: 1,
      "btn-default": 1,
      active: this.state.active
    });
    return (
      <button type="radio"
      className={className}
      key={this.props.k}
      onClick={this.clickHandler.bind(this)}>
        {this.props.children}
      </button>
    )
  }
}

StateRadio.propTypes = {
  k: React.PropTypes.string
}
