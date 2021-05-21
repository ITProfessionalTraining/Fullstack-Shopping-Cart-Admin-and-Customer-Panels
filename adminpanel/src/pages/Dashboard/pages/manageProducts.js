import react from 'react'
import SIDEBAR from '../components/Sidebar'
import TOPBAR from '../components/TopBar'
import {useEffect} from 'react'
import {useState} from 'react'
import {ALL_PRODUCTS, TRENDING_PRODUCTS} from '../../../action/Products'
import store from '../../../store.js'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const ManageProducts = ({product})=>{


    useEffect(()=>{
       ALL_PRODUCTS();
        TRENDING_PRODUCTS();
    }, [])




    return (
            <div>
             <div>
                <div className="row">
                <div className="col-2">
                <div  className="card shadow position-fixed alert-danger">
                    <div className="card-body">
                    <SIDEBAR/>
                    </div>
                </div>
          
          </div>
          <div className="col-10">
          <div className="container">
            <TOPBAR/>
            <h1 className="display-6">All Products</h1>
            <div class="container-fluid  pb-3"></div>
                <div class="d-grid gap-3" >
                        <div class="alert-light shadow border rounded-3">
                            <br/> <br/><br/>
                           
                            </div>
                </div>
            </div>
            </div>
            </div>
                </div>
            </div>
    )
}

ManageProducts.propTypes = {
    product: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    product: state.product
  });
  
  export default connect(mapStateToProps, { ALL_PRODUCTS })(ManageProducts);

