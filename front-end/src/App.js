import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import './App.css';

// Import components
import NavBar from './Navbar';
import Home from './Home';
import GroupList from './GroupList';
import GroupDetails from './GroupDetails';
import MatchList from './MatchList';
import Footer from './Footer';

function App() {
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
                {/* <Route exact path="/matches/:id">
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
                    <RegisterForm />
                </Route>
                <Route exact path="/login">
                    <LoginForm />
                </Route>

                <Route>
                    <PageNotFound />
                </Route> */}
            </Switch>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
