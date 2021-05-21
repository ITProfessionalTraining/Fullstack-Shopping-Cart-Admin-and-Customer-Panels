import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import auth from '../reducers/auth'
import {LogoutController} from '../action/auth'
import TOPBAR from './Dashboard/components/TopBar'
import SIDEBAR from './Dashboard/components/Sidebar'
import MAIN from './Dashboard/components/main'
const Dashboard = ({
    auth: { user },
})=>{


  const onlogout = ()=>{
    LogoutController();
  }

    return (
        <div>
        <div className="row">
          <div className="col-lg-2">
            <SIDEBAR/>
          </div>
          <div className="col-lg-10">
          <div className="container">
          <TOPBAR/>
            <MAIN/>
          </div>
           
          </div>
        </div>

        </div>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, {})(
    Dashboard
  );