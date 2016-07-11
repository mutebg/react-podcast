import './index.scss';
import React from 'react';
import cn from 'classnames';

class Tabs extends React.Component {

  static propTypes = {
    //list ot tab items
    tabs: React.PropTypes.array.isRequired,

    //selected tab item
    activeTab: React.PropTypes.string.isRequired,

    //function that will be invoked when tab is changed
    onChangeTab: React.PropTypes.func.isRequired,

    //type of tabs, currently there is only 1 varition: OS
    type: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  handleClick(item) {
    this.props.onChangeTab(item.action);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.activeTab != nextProps.activeTab;;
  }


  render() {
    const linkHTML = this.props.tabs.map(item => {
      const classes = cn('tabs__link', {'tabs__link--active': this.props.activeTab === item.action});
      return (
        <button
          key={item.action}
          className={classes}
          onClick={ this.handleClick.bind(this, item) }>
          {item.name}
        </button>);
    });

    return (
      <div className="tabs">{linkHTML}</div>
    );
  }
}

export default Tabs;
