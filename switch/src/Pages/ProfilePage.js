import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { withRouter } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import './ProfilePage.css';
import { Auth } from 'aws-amplify';
import Validate from './FormValidation'
import FormErrors from "./FormErrors";

class ProfilePage extends Component {
  state={
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }
  constructor(){
    super();
    this.state=({
      name: ''
    })
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
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
  
  handlesubmit = async event =>{
    event.preventDefault();
    this.clearErrorState();
    const error = Validate(event, this.state);
    if(error){
      this.setState({
        errors:{...this.state.eeror, ...error}
      });
    }
    // AWS Cognito integration
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      await Auth.changePassword(
        user, 
        this.state.oldpassword,
        this.state.newpassword
      );
      this.props.history.push("changepasswordconfirmation")
    }
    catch(error){
      console.log(error)

    }
  }
  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
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
                
                <div className="passwordsetting">
                <h1>Change Password</h1>
                <FormErrors formerrors={this.state.errors} />
                <form onSubmit={this.handlesubmit}>
                <div className="oldpassword">
                <input className="input" type="password" id="oldpassword" placeholder="Old Password"></input>
                </div>
                <div className="newpassword">
                <input className="input" type="password" id="newpassword" placeholder="New Password"></input>
                </div>
                <div className="confirmpassword">
                <input className="input" type="password" id="confirmpassword" placeholder="Confirm Paaword"></input>
                </div>
                <div className="submitbutton">
                <button className="submit" type="submit" id="submit">Submit</button>
                </div>
                </form>
                </div>

        </div>
    )
}
}

export default withRouter(withAuthenticator(ProfilePage,true));