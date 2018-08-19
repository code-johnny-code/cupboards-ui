import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this._handleChange = this._handleChange.bind(this);
        this._handleLogin = this._handleLogin.bind(this);
    }

    _handleChange(event) {
        const source = event.target.id;
        const value = event.target.value;
        this.setState({
            [source]: value
        })
    }

    _handleLogin() {
        const { REACT_APP_AUTH_URL, REACT_APP_UI_VERIFY, REACT_APP_API_VERIFY } = process.env;
        const apiKey = REACT_APP_UI_VERIFY;
        const username = this.state.username;
        const password = this.state.password;
        fetch(REACT_APP_AUTH_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({apiKey, username, password})
        })
        .then(res => res.json())
        .then(res => {
            if ((res.uiKey === REACT_APP_API_VERIFY) && res.authenticated) {
                this.props.handleLogin();
            }
        })
    }

    render() {
        return (
            <div>
                <input id='username' value={this.state.username} type={'text'} placeholder={'Username'} onChange={ this._handleChange }/>
                <input id='password' value={this.state.password} type={'password'} placeholder={'Password'} onChange={ this._handleChange }/>
                <button onClick={ this._handleLogin }>Log in</button>
            </div>
        );
    }
};

export default Login;