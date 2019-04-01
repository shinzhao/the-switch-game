import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { Auth } from 'aws-amplify';

class SignUpPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: false,
            email: '',
            password:'',
            confirmPassword: '',
			confirmationCode: '',
			newUser: null

        };
        this.handleChange = this.handleChange.bind(this);
    }
    validateForm(){
        return (this.state.email.length > 0 && this.state.password.length > 0&&
                this.state.confirmPassword>0 && this.state.confirmationCode>0&&
                this.state.password===this.state.confirmPassword
            );
    }

    handleChange(event){
        this.setState({[event.target.id]: event.target.value});
    }
    handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			const newUser = await Auth.signUp({
				username: this.state.email,
				password: this.state.password
			});
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}

		this.setState({ isLoading: false });
	};

    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange}></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl autoFocus type="confirmpassword" value={this.state.confirmPassword} onChange={this.onChange}></FormControl>
                </FormGroup>
                <button disabled={!this.validateForm()} type="signup">SignUp</button>
              
                </form>
            </div>
            
        );
    }
}

export default SignUpPage;