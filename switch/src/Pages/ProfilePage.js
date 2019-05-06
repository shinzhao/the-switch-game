import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { withRouter } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import './ProfilePage.css';
import { Auth } from 'aws-amplify';

class ProfilePage extends Component {
  constructor(){
    super();
    this.state=({
      name: ''
    })
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick(e) {
    e.preventDefault();
    this.props.history.push('/room-list');
  }

  getUserInfo() {
    Auth.currentUserInfo().then((userInfo) => {
      const { username } = userInfo;
      this.setState({
        name: username
      });
    });
  }

  //get score info from db
  getScore() {

  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
        <div className="profile">
          <button className="profile-back-button" onClick={this.handleBackClick}>Back</button>
                <img
                    src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png"
                    alt="profile-img"
                    className="profile-img"
                />

                <div className="username">
                    <h1>{this.state.name}</h1>
                </div>
                <p className="score">Win: | Lost: | Presentage: |</p>
        </div>
    )
}
}

export default withRouter(withAuthenticator(ProfilePage,true));