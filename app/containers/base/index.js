import './reset.scss';
import './index.scss';
import React from 'react';


export default class Base extends React.Component {
  render() {
    return <div className="base">{ this.props.children }</div>;
  }
}
