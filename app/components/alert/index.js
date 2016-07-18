import './index.scss';
import React from 'react';
import cn from 'classnames';

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let classes = cn('alert', 'alert--' + this.props.type);
    let icon = 'warning';

    if ( this.props.type == 'error' ) {
       icon = 'error_outline';
    }
    if ( this.props.type == 'success' ) {
      icon = 'done';
    }

    if ( this.props.icon ) {
      icon = this.props.icon;
    }

    return (
      <div className={classes}>
        <div className="alert__icon material-icons">{icon}</div>
        <div className="alert__message">{this.props.message}</div>
      </div>
    );
  }
}

export default Alert;
