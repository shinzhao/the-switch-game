import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import './PasswordConfirmationPage.css'



class PasswordConfirmationPage extends Component {
  constructor(){
    super();
    this.handleBackClick=this.handleBackClick.bind(this);
    this.handleGameRuleClick=this.handleGameRuleClick.bind(this);
    this.handleProfileClick=this.handleProfileClick.bind(this);
  }
  handleBackClick(e){
    e.preventDefault();
    this.props.history.push('/profile');
  }

  handleGameRuleClick(e){
    e.preventDefault();
    this.props.history.push('game-rule')
  }

  handleProfileClick(e){
    e.preventDefault();
    this.props.history.push('my-account')
  }
  render() {
    return ( 
      <div className="confirmation-page">
      <div className="button-section">
        <button className="Back-button" onClick={this.handleBackClick}>Back</button>
        <button className="Game-rule-button" onClick={this.handleGameRuleClick}>Game Rule</button>
        <button className="Profile-button" onClick={this.handleProfileClick}>My Account</button>
        </div>    
        <div className="MessageArea">
          <h1>Change Password</h1>
          <p>Your password has been successfully updated!</p>
        </div>
      </div>
    );
  }
}

export default PasswordConfirmationPage;