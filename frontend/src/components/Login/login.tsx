import React, { Component, SyntheticEvent } from 'react';
import {NavLink, Redirect } from 'react-router-dom';
import { UserModel } from '../../models/user-model';
import "./login.css"
import{ store }from '../../redux/store';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/action-type';




interface LoginState {
    loginInput: any;
    user: UserModel;
    isLogin:boolean

}
export class LoginPage extends Component<{}, LoginState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            loginInput: {
                userName: '',
                password: ''
            },
            user: store.getState().user,
            isLogin:store.getState().isLogin

        }
       console.log(store.getState().isLogin);
       
        
    }
    

    private userNameChange = (args: SyntheticEvent) => {
        const userName = (args.target as HTMLSelectElement).value;
        const loginInput = { ...this.state.loginInput };
        loginInput.userName = userName;

        
        this.setState({ loginInput });
    }
    private passwordChange = (args: SyntheticEvent) => {
        const password = (args.target as HTMLSelectElement).value;
        const loginInput = { ...this.state.loginInput };
        loginInput.password = password;
        console.log(loginInput.password);
        
        this.setState({ loginInput });
    }
    private login = () => {
        if(this.state.isLogin===true){
            alert("Sorry but another user is online")
            return;
        }
        const loginInput = { ...this.state.loginInput };
        if (loginInput.userName.length < 2 || loginInput.password.length < 4) {
            alert('Enter valid details');
            return;
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.loginInput)
        };

        fetch("http://localhost:3001/api/login", options)
            .then(async response => {
                if (!response.ok)
                    throw new Error(await response.text());
                return response;
            })
            .then(response => response.json())
            .then(user => {
                const actionUser: Action = {
                    type: ActionType.getUser,
                    payload: user[0]
                };
                store.dispatch(actionUser);

                const actionIsLogin: Action = {
                    type: ActionType.updateIsLogin,
                    payload: true
                };
                store.dispatch(actionIsLogin);
                this.sendJWT();
                window.location.href='/'
            })
            .catch(err => alert(err));
    }
    private sendJWT = () => {
        const optionsJWT = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(store.getState().user)
        };
        // save to JWT 
        fetch("http://localhost:3001/api/login/login-save", optionsJWT)
            .then(response => response.json())
            // save in localstorage for auto login with unique token
            .then(res => localStorage.setItem('token', res.token))
            .catch(err => alert(err));
    }

    public render(): JSX.Element {
        
        console.log(this.props);
        return (
            
            <div className="LoginPage">
            <div className='input-user'>
             <h1>Login</h1>
                        <TextField  className="input" onChange={this.userNameChange}
                            label="User Name"
                            variant="filled"
                            size="medium"
                            />
                 
                        <TextField className="input"  onChange={this.passwordChange}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="filled"
                           
                        />
          
                        <Button className="button-login"  variant="contained" color="primary" onClick={this.login}>Login</Button>
                  
                    <br></br>
              
                        <NavLink to='/register' exact>
                            <Button className="button-register" variant="contained" color="secondary">Register</Button>
                        </NavLink>
                        </div>

                        </div>

                
      
        );
    }}