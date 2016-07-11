import './index.scss';
import React from 'react';
import NavBar from '../navbar';
import { browserHistory } from 'react-router';


export default class Cover extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cover" style={{background: this.props.color}}>
        <NavBar
          color={this.props.color}
          leftIcon="arrow_back"
          leftIconClick={ () => browserHistory.goBack() }
          rightIcon="more_vert"
          rightconClick={ () => console.log('right') }
          >
        </NavBar>
        <img className="cover__img" src={this.props.image} />
      </div>
    );
  }
}
