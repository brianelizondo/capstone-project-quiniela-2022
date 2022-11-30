import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

// import APIFootball api
import APIFootball from "./api-football";

// redux dispatch and reducer
import { useDispatch } from 'react-redux';
import { logout } from './store/userSlice';

// Import components
import NavBar from './Navbar';
import Home from './Home';
import QuinielaDetails from './QuinielaDetails';
import GroupList from './GroupList';
import GroupDetails from './GroupDetails';
import MatchList from './MatchList';
import MatchDetails from './MatchDetails';
import TeamList from './TeamList';
import TeamDetails from './TeamDetails';
import Rules from './Rules';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import UserProfile from './UserProfile';
import UserMatchUpdate from './UserMatchUpdate';
import UserQuinielaAdd from './UserQuinielaAdd';

import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import Footer from './Footer';

function App(){
    // redux selector and dispatch
    const dispatch = useDispatch();

    // functions to register, update, login, logout users
    const userRegister = async user => {
        try{
            let resp = await APIFootball.userRegister(user);
            return resp;
        }catch (err){
            return err;
        }
    }
    // function to authenticate the user
    const userAuthenticate = async user => {
        try{
            let resp = await APIFootball.userAuthenticate(user);
            return resp;
        }catch (err){
            return err;
        }
    }
    // function to logout the user
    const userLogout = () => {
        dispatch(logout());
    }
    // check if username/email already exists
    const checkUsernameEmail = async (email, username) => {
        try{
            let resp = await APIFootball.checkUsernameEmail(username, email);
            return resp;
        }catch (err){
            return err;
        }
    }

    
    return (
        <BrowserRouter>
            <NavBar userLogout={userLogout} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/quinielas">
                    <Home />
                </Route>
                
                <Route exact path="/groups">
                    <GroupList />
                </Route>
                <Route exact path="/groups/:group">
                    <GroupDetails />
                </Route>
                <Route exact path="/matches">
                    <MatchList />
                </Route>
                <Route exact path="/matches/phase/:phase/match/:matchID">
                    <MatchDetails />
                </Route>
                <Route exact path="/teams">
                    <TeamList />
                </Route>
                <Route exact path="/teams/:shortname">
                    <TeamDetails />
                </Route>
                <Route exact path="/rules">
                    <Rules />
                </Route>

                <Route exact path="/register">
                    <RegisterForm userRegister={userRegister} checkUsernameEmail={checkUsernameEmail} />
                </Route>
                <Route exact path="/login">
                    <LoginForm userAuthenticate={userAuthenticate} />
                </Route>

                {/* ROUTES TO PROTECT LATER */}
                <ProtectedRoute exact path="/quinielas/:username/:quinielaID" component={QuinielaDetails} />
                <ProtectedRoute exact path="/users/:username/profile" component={UserProfile} />
                <ProtectedRoute exact path="/users/matches/update" component={UserMatchUpdate} />
                <ProtectedRoute exact path="/users/:username/quinielas/add" component={UserQuinielaAdd} />
                <ProtectedRoute exact path="/users/:username/quinielas/:quinielaID/edit" component={UserQuinielaAdd} />

                <Route exact path="/404">
                    <PageNotFound />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
