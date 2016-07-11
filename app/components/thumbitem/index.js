import React from 'react';
import './index.scss';
import cn from 'classnames';

class ThumbItem extends React.Component {

  render() {

    const { image, onClick } = this.props;

    const itemClasses = cn('thumb-item');


    return (
      <div className={itemClasses} onClick={onClick}>
        <img src={image} className="thumb-item__icon" />
      </div>
    );
  }
}
export default ThumbItem;
