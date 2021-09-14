import React, { Component } from 'react';
import './header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { UserModel } from '../../models/user-model';

//redux
import { store } from "../../redux/store";
import { Action } from "../../redux/action";
import { ActionType } from "../../redux/action-type";
import { Unsubscribe } from "redux";
import Button from '@material-ui/core/Button';

interface HeaderState {
    user: UserModel;
    isLogin: boolean;
}

export class Header extends Component<any, HeaderState> {

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            user: store.getState().user,
            isLogin: store.getState().isLogin
        }
        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ user: store.getState().user });
            this.setState({ isLogin: store.getState().isLogin });
        });
    }

    public componentWillUnmount = () => {
        this.unsubscribeStore();
    }

    componentDidMount = () => {
        if (store.getState().user.userID === undefined) {
            this.checkLogIn();
        }
    }
    private checkLogIn = () => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        };
        // check JWT token
        fetch("http://localhost:3001/api/login/login-check", options)
            .then(response => response.json())
            .then(res => {
                if (res.name === 'JsonWebTokenError') {
                    const actionIsLogin: Action = {
                        type: ActionType.updateIsLogin,
                        payload: false
                    };
                    store.dispatch(actionIsLogin);
                    return;
                }
                const actionUser: Action = {
                    type: ActionType.getUser,
                    payload: res.user
                };
                store.dispatch(actionUser);

                const actionIsLogin: Action = {
                    type: ActionType.updateIsLogin,
                    payload: true
                };
                store.dispatch(actionIsLogin);
            })
            .catch(err => alert(err));
    }
    private logout = () => {
        window.location.href="/login"
        const action: Action = {
            type: ActionType.getFollowedVacations,
            payload: []
        };
        store.dispatch(action);

        const actionUser: Action = {
            type: ActionType.getUser,
            payload: new UserModel()
        };
        store.dispatch(actionUser);

        const actionIsLogin: Action = {
            type: ActionType.updateIsLogin,
            payload: false
        };
        store.dispatch(actionIsLogin);
        localStorage.removeItem("token");
    }

    public render(): JSX.Element {
        return (
            <div className='header'>
                <div className='navbar'>
                    <AppBar position="fixed">
                        
                            <Grid container spacing={0}>
                                <Grid item xs={10} sm={10}  md={3}>
                                    <div className='navlinks'>
                                        <NavLink to='/' exact>Home</NavLink>
                                        <NavLink to='/about' exact>About</NavLink>
                                        <NavLink to='/register' exact>register</NavLink>
                                        <NavLink to='/login' exact>login</NavLink>
                                    </div>
                                </Grid>
                              
                        {this.state.user.isAdmin===1&&this.state.isLogin===true?
                            
                            
                            <div className="welcome-admin">
                               <Grid item xs={12} sm={12} md={12}>
                             <p>Welcome {this.state.user.firstName} !</p> 
                             </Grid>
                             <div className="buttonAdmin">  
                                <Button   variant="contained" color="default" onClick={event =>  window.location.href='/admin-panel'}>Admin</Button>
                             </div>
                            </div>
                            :
                            <div >
                             <div className="welcome-newuser">
                             <Grid item xs={12} md={12}>
                                <p>Welcome {this.state.user.firstName} !</p>
                              </Grid>
                             </div>
                            </div>
                            }

                        {this.state.isLogin===true?

                                <Grid item xs={4} sm={1} md={1}>
                         <div className="logout">
                                <Button  className="logoutButton" variant="contained" color="secondary"
                                    onClick={this.logout}>Logout</Button>
                         </div>
                                   </Grid>
                            :
                            <div></div>
}
                                
                            </Grid>
                  
                    </AppBar>
                    <Toolbar />
                </div>
            </div>
        );
    }
}