import React from "react";
import { Route, Switch } from "react-router-dom";
import { About } from "../about/about";
import { AddVacation } from "../add-vacation/add-vacation";
import { AdminPanel } from "../admin-panel/admin-panel";
import { Chart } from "../chart/chart";
import { EditVacation } from "../edit-vacation/edit-vacation";
import { Home } from "../home/home";
import { LoginPage } from "../Login/login";
import { PageNotFound } from "../page-not-found/page-not-found";
import { RegisterPage } from "../register/register";



export default function Routing():JSX.Element{
    return(

        <Switch>
        <Route path='/register' component={RegisterPage} exact />
        <Route path='/login' component={LoginPage} exact />
        <Route path='/admin-panel' component={AdminPanel} exact />
        <Route path='/add-vacation' component={AddVacation} exact />
        <Route path='/edit-vacation/:id' component={EditVacation} exact />
        <Route path='/chart' component={Chart} exact />
        <Route path='/about' component={About} exact />
        <Route path='/page-not-found' component={PageNotFound} exact />
        <Route path='/' component={Home} exact />
    </Switch>
    )
};