import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import './ProfilePage.css';
import { Auth } from 'aws-amplify';
import Validate from './FormValidation'
import FormErrors from "./FormErrors";

/**
 * This component is the page for user profile.
 * It will render if a "my account" button was clicked,
 * and redirect to /profile.
 */
class ProfilePage extends Component {
  constructor(){
    super();
    this.state=({
      name: '',
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    })
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleGameRuleClick=this.handleGameRuleClick.bind(this);
    this.handleMyaccountClick=this.handleMyaccountClick.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
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

  /**
   * Handles the "back" button click, will redirect to room list page.
   * @param {event} e 
   */
  handleBackClick(e) {
    e.preventDefault();
    this.props.history.push('/room-list');
  }
  handleMyaccountClick(e){
    e.preventDefault();
    this.props.history.push('/my-account');
  }

  /**
   * Gets current authenticated user's username.
   * Then, sets name state as the username gotten from Amplify.
   */
  getUserInfo() {
    Auth.currentUserInfo().then((userInfo) => {
      const { username } = userInfo;
      this.setState({
        name: username
      });
    });
  }

  /**
   * Handles the "submit" button click.
   * Changes password and redirects to the password confirmation page
   * if there's no error with the input
   * @param {event} event
   */
  handlesubmit = async event => {
    event.preventDefault();
    this.clearErrorState();
    const error = Validate(event, this.state);
    if(error){
      this.setState({
        errors:{...this.state.error, ...error}
      });
    }
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      await Auth.changePassword(
        user, 
        this.state.oldpassword,
        this.state.newpassword
      );
      this.props.history.push("/changepasswordconfirmation")
    }
    catch(error){
      console.log(error);
    }
  }

  /**
   * Handles input change.
   * Sets the value entered by user in the input area to corresponding state
   * @param {event} event
   */
  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  /**
   * Handles "game rule" button click, will redirect to game rule page
   * @param {event} e
   */
  handleGameRuleClick=(e)=>{
    e.preventDefault();
    this.props.history.push('/game-rule')
  }
  
  render() {
    return (
        <div className="profile">
          <button className="profile-back-button" onClick={this.handleBackClick}>Back</button>
          <button className="Game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
          <button className="profilepage-prifile-button" onClick={this.handleMyaccountClick}>My Account</button>
                <img
                    src="https://www.shareicon.net/download/2015/09/18/103157_man_512x512.png"
                    alt="profile-img"
                    className="profile-img"
                />

                <div className="username">
                    <h1>{this.state.name}</h1>

                </div>
                {/* <p className="score">Win: | Lost: | Presentage: |</p> */}
              
                <div className="passwordsetting">
                <h1>Change Password</h1>
                <FormErrors formerrors={this.state.errors} />
                <form onSubmit={this.handlesubmit}>
                <div className="oldpassword">
                <input className="input" type="password" id="oldpassword" placeholder="Old Password" value={this.state.oldpassword} onChange={this.onInputChange}></input>
                </div>
                <div className="newpassword">
                <input className="input" type="password" id="newpassword" placeholder="New Password" value={this.state.newpassword} onChange={this.onInputChange}></input>
                </div>
                <div className="confirmpassword">
                <input className="input" type="password" id="confirmpassword" placeholder="Confirm Paaword" value={this.state.confirmpassword} onChange={this.onInputChange}></input>
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
