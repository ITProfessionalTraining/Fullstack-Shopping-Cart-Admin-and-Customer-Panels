import React from 'react'
import { Fragment } from 'react';


const TopBar = ()=>{
    return(
        <Fragment>
        <header class="p-3 mb-3 border-bottom ">
        <div class="container ">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
             
            </a>
    
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" class="nav-link px-2 link-secondary sp">Overview <i class="fas fa-binoculars"></i></a></li>
              <li><a href="#" class="nav-link px-2 link-dark">Inventory <i class="fas fa-truck-moving"></i></a></li>
              <li><a href="#" class="nav-link px-2 link-dark">Customers <i class="fas fa-users"></i></a></li>
              <li><a href="#" class="nav-link px-2 link-dark">Products<i class="fas fa-drafting-compass"></i></a></li>
            </ul>
    
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
            </form>
    
            <div class="dropdown text-end">
              <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img style={{width: '40px', borderRadius: '50%'}} src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
              </a>
              <ul class="dropdown-menu text-small alert-danger" aria-labelledby="dropdownUser1">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li><hr class="dropdown-divider"/></li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
          </Fragment>
    )
}


export default TopBar;