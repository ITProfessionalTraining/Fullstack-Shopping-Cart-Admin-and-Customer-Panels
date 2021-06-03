import React, {Fragment, FC, useEffect, useState} from 'react'
import {getAdmin} from '../util/getAdmin'
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../store';
import Login from '../pages/Login'
import Register from '../pages/Register'
import Private from './PrivateRouting'
import AddProduct from '../pages/Dashboard/pages/AddProduct'
import Dashboard from '../pages/dashboard'
import MANAGECUSTOMER from '../pages/Dashboard/customer/ManageCustomer'
import ADDCUSTOMER from '../pages/Dashboard/customer/AddCustomer'
import TRACKCUSTOMER from '../pages/Dashboard/customer/TrackCustomer'
import manageProduct from '../pages/Dashboard/pages/manageProducts'


const Routing = ()=>{
    return (
        <Provider store={store}>
         <Router>
         <Fragment>
         <Switch>     
         <Route exact path="/register" component={Register}/>
         <Route  exact path="/" component={Login}/>
         <Route exact path="/dashboard" component={Dashboard} />
         <Route exact path="/dashboard/product/add" component={AddProduct} />
         <Route exact path="/dashboard/product/manage" component={manageProduct} />
         
         <Route exact path="/dashboard/customer/manage" component={MANAGECUSTOMER} />
         <Route exact path="/dashboard/customer/add" component={ADDCUSTOMER} />
         <Route exact path="/dashboard/customer/track" component={TRACKCUSTOMER} />


          <Route component={NotFound} />
         </Switch>
         </Fragment>
         </Router>      
        </Provider>
    )
}


const NotFound = ()=>{
    return (
        <div>
           <div id="notfound">
            <div class="notfound">
            <div class="notfound-404">
            <h1>404</h1>
            </div>
            <h2>Oops, The Page you are looking for can't be found!</h2>            
            <a href="/"><span class="arrow"></span>Return To Homepage</a>
         
            </div>
</div>
        </div>
    )
}

export default Routing;