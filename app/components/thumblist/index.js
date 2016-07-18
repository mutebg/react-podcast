import React from 'react';
import ReactDOM from 'react-dom';
import ThumbItem from '../thumbitem';
import faker from 'faker';
import _ from 'lodash';
import './index.scss';
import cn from 'classnames';
import {browserHistory} from 'react-router';
import Rx from 'rxjs/Rx';


export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      openItem: 0,
    }

    this.openItem = this.openItem.bind(this);
    this.fakeHeader = null;
    this.windowWidth = 320;
  }

  componentDidMount() {
    this.fakeHeader = ReactDOM.findDOMNode( this.refs['fake-header'] );
    this.windowWidth = window.innerWidth;

    //removing animate class after component mount
    let thumbList = ReactDOM.findDOMNode( this.refs['thumb-list'] );
    let animationEnd$ = Rx.Observable.fromEvent(thumbList, 'animationend');
    let subscription = animationEnd$.subscribe(
      (events) => thumbList.classList.remove('thumb-list--animate')
    );

  }

  openItem(item) {
    this.props.onClickHandler(item);
    let iconSize = 180;
    let elem = ReactDOM.findDOMNode(this.refs['item-' + item.id]);
    let img = elem.querySelector('img');
    let rect = img.getBoundingClientRect();
    let scale = iconSize / rect.width;
    let topOffset = ( iconSize - rect.width ) / 2;
    let top = ( rect.top - 70 - topOffset ) * -1;
    let finaleLeftPosition = ( this.windowWidth / 2 ) - ( rect.width / 2 );
    let left = finaleLeftPosition - rect.left;

    img.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`,
    img.style.willChange = 'transform';
    img.style.zIndex = 3;
    this.setState({
      openItem: item.id,
    });
    this.fakeHeader.querySelector('.fake-header__bubble').style.background = item.color;

    let imgSource$ = Rx.Observable.fromEvent(img, 'transitionend');
    let headerSource$ = Rx.Observable.fromEvent(this.fakeHeader, 'transitionend');

    let combineSource$ = Rx.Observable.merge(imgSource$, headerSource$)
      .take(2) // 2 is number of transitions: img:transform, header:transform
      .delay(50); // small delay to visualy finish transitions
    let subscription = combineSource$.subscribe(
      (events) => console.log('event', events), // next
      (err) => console.log(err), // error
      () => browserHistory.push('/details-' + item.id ) // done
    );
  }


  componentWillMount() {

  }

  render() {
    const list = this.props.items.map(item => {
      return <ThumbItem ref={`item-${item.id}`}  key={item.id} {...item} onClick={ () => this.openItem(item) }/>;
    });

    let fakeHeaderClasses = cn('fake-header', {
      'fake-header--show': this.state.openItem
    });
    let fakeContClasses = cn('fake-container', {
      'fake-container--show': this.state.openItem
    });

    return (
      <div className="list">
        <div className={fakeHeaderClasses} ref="fake-header">
          <div className="fake-header__bubble"></div>
        </div>
        <div className={fakeContClasses} ref="fake-container"></div>
        <div className="thumb-list thumb-list--animate" ref="thumb-list">{list}</div>
      </div>
    )
  }
}
