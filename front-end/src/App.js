import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

// import APIFootball api
import APIFootball from "./api-football";

// Import components
import NavBar from './Navbar';
import Home from './Home';
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

import PageNotFound from './PageNotFound';
import Footer from './Footer';

function App() {
    // functions to register, update, login, logout users
    const userRegister = async user => {
        try{
            let resp = await APIFootball.userRegister(user);
            return resp;
        }catch (err){
            return err;
        }
    }
    const userAuthenticate = async user => {
        try{
            let resp = await APIFootball.userAuthenticate(user);
            console.log("App Resp:", resp);
            return resp;
        }catch (err){
            return err;
        }
    }
    // check if username/email already exists
    const checkUsernameEmail = async (email, username) => {
        console.log("checking API");
        try{
            let resp = await APIFootball.checkUsernameEmail(username, email);
            return resp;
        }catch (err){
            return err;
        }
    }

    
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                
                {/* ROUTES TO PROTECT LATER */}
                {/* <Route exact path="/quinielas/:username/add">
                    <QuinielaAddForm />
                </Route>
                <Route exact path="/quinielas/:username/update/:id">
                    <QuinielaUpdateForm />
                </Route>
                <Route exact path="/quinielas/:username/:id">
                    <QuinielaDetails />
                </Route> */}
                
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
                <Route exact path="/user/:username/profile">
                    <UserProfile />
                </Route>
                {/* <Route exact path="/quinielas/:username/update/:id">
                    <QuinielaUpdateForm />
                </Route>
                <Route exact path="/quinielas/:username/:id">
                    <QuinielaDetails />
                </Route> */}

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
