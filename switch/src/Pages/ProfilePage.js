import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { withRouter } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import './ProfilePage.css';

class ProfilePage extends Component {
  constructor(){
    super();
    this.state={
      userName: ''
    }
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
        userName: username
      })
    })
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
        <div className="profile">
        <button className="back-button" onClick={this.handleBackClick}>Back</button>
        <div style={{width: '100%', margin: 'auto'}}>
          <Grid className="landing-grid">
            <Cell col={12}>
            <img
                src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png"
                alt="profile-img"
                className="profile-img"
                />

              <div>
                <h1 className="username">{this.state.userName}</h1>
              <hr/>
              </div>
            <p>Win: | Lost: | Percentage: |</p>
            {/* game records */}
            <div className="info">
          
            <div>
                <p>name</p>
                <input placeholder="username"></input>
                {/* username should placehold to the current name */}
            </div>
            <div>
                <p>Email</p>
                <input placeholder="email"></input>
                {/*email should placehold to the current name */}
            </div>
            <div>
                <p>Gender</p>
                <input required type="radio" value="male"></input>Male
                <input required type="radio" value="female"/>Female
            </div>
            <div>
                <p>Password</p>
                <input placeholder="8-10 chatacters"></input>
            </div>
            <div>
                <p>Confirm Password</p>
                <input></input>
            </div>
            <button type="submit">Save</button>
          </div>
              
            </Cell>
          </Grid>

        </div>
        </div>
    )
}
}

export default withRouter(withAuthenticator(ProfilePage,true));