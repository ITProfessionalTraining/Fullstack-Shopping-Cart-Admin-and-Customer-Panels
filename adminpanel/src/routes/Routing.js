import React, {Fragment, FC, useEffect, useState} from 'react'
import {getAdmin} from '../util/getAdmin'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../store';
import Intro from '../pages/Intro'
import Login from '../pages/Login'
import Register from '../pages/Register'


const Routing = ()=>{
    return (
        <Provider store={store}>
         <Router>
         <Fragment>
         <Switch>     
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
         <Route  exact path="/" component={Intro}/>
         </Switch>
         </Fragment>
         </Router>      
        </Provider>
    )
}


export default {Routing};