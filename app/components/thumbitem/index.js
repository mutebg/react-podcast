import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import cn from 'classnames';

class ThumbItem extends React.Component {

  static defaultProps = {
    image: '',
    onClick: () => '',
    style: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
    }

    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    if (this.props.image) {
      this.img = ReactDOM.findDOMNode(this.refs['img']);
      this.img.onload = this.onImageLoad;
    }
  }

  onImageLoad() {
    this.setState({ imageLoaded: true });
  }



  render() {

    const { image, onClick, style } = this.props;
    const itemClasses = cn('thumb-item');
    const imgClasses = cn('thumb-item__icon', {'thumb-item__icon--show': this.state.imageLoaded})
    return (
      <div className={itemClasses} onClick={onClick} style={style}>
        <img src={image} ref="img" className={imgClasses} />
      </div>
    );
  }
}

export default ThumbItem;
