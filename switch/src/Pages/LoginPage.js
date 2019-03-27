import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import GuestPage from './GuestPage';
import SignUpPage from './SignUpPage';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    validateForm(){
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }

    handleLogin(event){
        //submit to database
        event.preventDefault();
    }

    renderGuestPage(event){
        window.location.href = "./GuestPage";
    }

    renderSignUpPage(event){
        window.location.href = "./SignUpPage";
    }

    render(){
        return (
            <div className="login-page">
                <h1>WELCOME TO SWITCH</h1>
                <form onSubmit={this.handleLogin}>
                    <FormGroup controlId="username" bsSize="large">
                        <FormLabel>Username: </FormLabel>
                        <FormControl autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password: </FormLabel>
                        <FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    <br />
                    <Button bsSize="large" disabled={!this.validateForm()} type="submit">Login</Button>
                </form>
                <Button className="guest-button" onClick={this.renderGuestPage}>Guest</Button>
                <Button className="signup-button" onClick={this.renderSignUpPage}>Sign Up</Button>
            </div>
        );
    }
}

export default LoginPage;