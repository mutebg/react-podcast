import './index.scss';
import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftIcon, rightIcon, leftIconClick, rightconClick, children, color } = this.props;

    var style = {};
    if ( color ) {
      style.background = color;
    }

    return (
      <div className="navbar" style={style}>
        <button className="navbar__icon material-icons" onClick={leftIconClick}>{leftIcon}</button>
        <div className="navbar__body">{children}</div>
        <button className="navbar__icon material-icons" onClick={rightconClick}>{rightIcon}</button>
      </div>
    );
  }
}
