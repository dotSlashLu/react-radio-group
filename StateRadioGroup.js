import React from "react";
import classNames from "classnames";
import StateRadio from "./StateRadio";

class StateRadioGroup extends React.Component {
  constructor(...args) {
    super(...args);
    this.ret = {};
  }

  componentWillMount() {
    this.children = React.Children.map(this.props.children, (child) => {
      let k = child.props.k;
      this.ret[k] = false;
      let state = {};
      state[k] = false;
      this.setState(state);

      return React.cloneElement(child, {
        clickHandler: this.clickHandler(k),
        readOnly: this.props.readOnly
      })
    });
  }

  clickHandler(k) {
    return (s) => {
      this.props.onChange(k, s);
    }
  }

  render() {
    let {className, ...restProps} = this.props;
    if (className)
      className += " btn-group"

    return (
      <div className={className} {...restProps}>
        {this.children}
      </div>
    )
  }
}


StateRadioGroup.propTypes = {
  onChange: React.PropTypes.func,
  children: function(props, propName, componentName) {
    const prop = props[propName]

    let error = null
    React.Children.forEach(prop, function (child) {
      if (child.type !== StateRadio) {
        error = new Error('`' +
          componentName +
          '` children should be of type `StateRadio`.');
      }
    })
    return error
  }
}
