import React from 'react';
import './index.scss';
import cn from 'classnames';

class ListItem extends React.Component {

  render() {

    const { icon, title, author, rating, onClick, hide } = this.props;

    const listClasses = cn('list-item',
      {'list-item--hide-all': hide === 'all' },
      {'list-item--hide-body': hide === 'body' }
    );


    return (
      <div className={listClasses} onClick={onClick}>
        <img src={icon} className="list-item__icon" />
        <div className="list-item__body">
          <div className="list-item__title">{title}</div>
          <div className="list-item__author">by {author}</div>
          <div className="list-item__rating">{rating} rating</div>
        </div>
      </div>
    );
  }
}
export default ListItem;
