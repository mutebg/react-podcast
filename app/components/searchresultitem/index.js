import './index.scss';
import React from 'react';
import cn from 'classnames';

export default class SearchResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick() {
    if ( ! this.props.isAdded ) {
      this.props.onClickAdd();
    } else {
      this.props.onClickRemove()
    }
  }

  render() {

    let { title, isAdded } = this.props;
    let buttonClasses = cn('search-result-item__btn', 'material-icons', {
      'search-result-item__btn--active': isAdded
    });

    return (
      <div className="search-result-item">
        <div className="search-result-item__title">{title}</div>
        <button  className={buttonClasses} onClick={this.handleClick.bind(this)}>{ isAdded ? 'remove_circle_outline' : 'add_circle_outline' }</button>
      </div>
    );
  }
}
