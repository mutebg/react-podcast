import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from '../listitem';
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
  }

  componentDidMount() {
    this.fakeHeader = ReactDOM.findDOMNode( this.refs['fake-header'] );
  }

  openItem(item) {
    let elem = ReactDOM.findDOMNode(this.refs['item-' + item.uuid]);
    let img = elem.querySelector('img');
    let rect = img.getBoundingClientRect();
    let top = ( rect.top - 60 ) * -1;
    img.style.transform = `translate3d(0px, ${top}px, 0) scale(0.8)`;
    img.style.willChange = 'transform';
    this.setState({
      openItem: item.uuid,
    });

    let imgSource$ = Rx.Observable.fromEvent(img, 'transitionend');
    let headerSource$ = Rx.Observable.fromEvent(this.fakeHeader, 'transitionend');

    let combineSource$ = Rx.Observable.merge(imgSource$, headerSource$)
      .take(3) // 3 is number of transitions: img:transform, header:transform, header:opacity
      .delay(50); // small delay to visualy finish transitions
    let subscription = combineSource$.subscribe(
      (events) => console.log(events), // next
      (err) => console.log(err), // error
      () => browserHistory.push('/details') // done
    );



  }


  componentWillMount() {
    //this.props.fetchItems();
    const list = [];
    const icon = faker.image.avatar();
    _.times(10, () => {
      list.push({
        uuid: faker.random.uuid(),
        //icon: faker.image.avatar(),
        icon: 'https://lh3.googleusercontent.com/Ik0HWuGBq1564kfSuqadFDjm1EBLnhT7EjqYtnFd-jFkPfXjLTh7mVMNXs1lxyIQElmA=w300-rw',
        //title: faker.commerce.productName(),
        title: 'SkySport Football',
        //author: faker.company.companyName(),
        author: 'Stoyan Delev',
        rating: 5,
      });
    });

    this.setState({
      list
    })

  }

  render() {
    const list = this.state.list.map(item => {
      let hide = 'none';
      if ( this.state.openItem ) {
        hide = item.uuid == this.state.openItem ? 'body' : 'all';
      }
      return <ListItem ref={`item-${item.uuid}`} hide={hide} key={item.uuid} {...item} onClick={ () => this.openItem(item) }/>;
    });

    let fakeClasses = cn('fake-header', {
      'fake-header--show': this.state.openItem
    })

    return (
      <div className="list">
        <div className={fakeClasses} ref="fake-header"></div>
        {list}
      </div>
    )
  }
}
