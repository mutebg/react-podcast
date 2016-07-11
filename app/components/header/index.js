import './index.scss';
import React from 'react';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <div className="header">
        <div className="header__cover" style={{ backgroundImage: 'url(http://www.thesnugg.com/news/wp-content/uploads/2012/11/Top-Five-Windows-8-Apps-NOT-COVER.jpg)' }}></div>
        <div className="header__body">
          <img className="header__icon" src="https://lh3.googleusercontent.com/Ik0HWuGBq1564kfSuqadFDjm1EBLnhT7EjqYtnFd-jFkPfXjLTh7mVMNXs1lxyIQElmA=w300-rw" />
          <div className="header__buttons">
            <button>Install</button>
            <button>Share</button>
          </div>
        </div>
      </div>
    );
  }
}
