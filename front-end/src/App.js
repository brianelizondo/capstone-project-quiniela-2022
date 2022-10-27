import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

// Import files to routes
import NavBar from './Navbar';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                {/* <Route exact path="/">
                    <Home />
                </Route> */}
                
                {/* ROUTES TO PROTECT LATER */}
                {/* <Route exact path="/quinielas/:username/add">
                    <QuinielaAddForm />
                </Route>
                <Route exact path="/quinielas/:username/update/:id">
                    <QuinielaUpdateForm />
                </Route>
                <Route exact path="/quinielas/:username/:id">
                    <QuinielaDetails />
                </Route>
                
                <Route exact path="/groups">
                    <MatchesGroups />
                </Route>
                <Route exact path="/matches">
                    <Matches />
                </Route>
                <Route exact path="/matches/:id">
                    <Matches />
                </Route>
                <Route exact path="/teams">
                    <MatchesTeams />
                </Route>
                <Route exact path="/teams/:shortname">
                    <MatchesTeams />
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
        </BrowserRouter>
    );
}

export default App;
