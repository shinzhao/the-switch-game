import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import GuestPage from './GuestPage';
import SignUpPage from './SignUpPage';
import { Auth } from 'aws-amplify';

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

    render(){
        return (
            <Router>
                <div className="login-page">
                    <h1>WELCOME TO SWITCH</h1>
                    <form onSubmit={this.handleLogin}>
                        <FormGroup controlId="username">
                            <FormLabel>Username: </FormLabel>
                            <FormControl autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <FormGroup controlId="password">
                            <FormLabel>Password: </FormLabel>
                            <FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <br />
                        <Button disabled={!this.validateForm()} type="submit">Login</Button>
                    </form>
                    <Button className="guest-button"><Link to="/guest">Guest</Link></Button>
                    <Button className="signup-button"><Link to="/signup">Sign Up</Link></Button>
                    
                    <Route path="/guest" component={GuestPage} />
                    <Route path="/signup" component={SignUpPage} />
                </div>
            </Router>
        );
    }
}

export default LoginPage;