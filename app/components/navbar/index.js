import './index.scss';
import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { leftIcon, rightIcon, leftIconClick, rightIconClick, children, color } = this.props;

    var style = {};
    if ( color ) {
      style.background = color;
    }

    let buttonFn = (icon, callback) => <button className="navbar__icon material-icons" onClick={callback}>{icon}</button>
  let leftButton = leftIcon ? buttonFn(leftIcon, leftIconClick) : null;
    let rightButton = rightIcon ? buttonFn(rightIcon, rightIconClick) : null;


    return (
      <div className="navbar" style={style}>
        {leftButton}
        <div className="navbar__body">{children}</div>
        {rightButton}
      </div>
    );
  }
}
