import './index.scss';
import React from 'react';

export default class SearchResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick() {
    if ( ! this.props.isAdded ) {
      this.props.onClickAdd();
      console.log('add');
    } else {
      this.props.onClickRemove()
      console.log('remove');
    }
  }

  render() {

    let { title, isAdded } = this.props;

    return (
      <div className="seaerch-result-item">
        {title}
        <button onClick={this.handleClick.bind(this)}>{ isAdded ? 'remove' : 'add' }</button>
      </div>
    );
  }
}
