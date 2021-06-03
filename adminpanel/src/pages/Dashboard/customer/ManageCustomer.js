import react from 'react';
import {Fragment, useState, useEffect} from 'react'
import SIDEBAR from '../components/Sidebar'
import TOPBAR from '../components/TopBar'
import {GET_ALL_CUSTOMERS} from '../../../action/customer.action'


const MANAGECUSTOMER = ()=>{

    useEffect(()=>{
        GET_ALL_CUSTOMERS();
    },[])


    return (
        <Fragment>
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
                        <div className="container">
                        <h1 className="display-6">Products <a href="/dashboard/product/add" className="btn btn-sm alert-primary">Add New</a></h1>
                              <div class="container-fluid  pb-3"></div>
                            <div class="d-grid gap-3" >
                                    <div class="alert-light shadow border rounded-3">
                                    <div class="table-responsive">
                                <table class="table">
                                  
                                    <thead className="alert-success ">
                                        <tr>
                                        <th className="product-text" scope="col">Name</th>
                                        <th className="product-text" scope="col">Category</th>
                                        <th className="product-text" scope="col">Image</th>
                                        <th className="product-text" scope="col">Price</th>
                                        <th className="product-text" scope="col">Size</th>
                                        <th  className="product-text" scope="col">Stock</th>
                                        <th  className="product-text" scope="col">Manage </th>
                                        </tr>
                                    </thead>                                       
                                        <tbody>
                                         <tr>
                                        <td className="product-text"></td>
                                        <td className="product-text"></td>
                                        <td className="product-text">
                                        <img  className="prodo-img" />    
                                        </td>
                                        <td className="product-text"> £</td>
                                        <td className="product-text"></td>
                                        <td className="product-text"></td> 
                                        <td className="product-text">
                                        <div  className="d-flex">
                                        <button  className="alert-danger shadow btn-sm btn space-2"><i class="fas fa-trash"></i></button>
                                        <button  className="alert-primary shadow btn-sm btn space-2"><i class="fas fa-eye"></i></button>  
                                        <button  className="alert-warning shadow text-success btn-sm btn space-2"><i class="far fa-edit"></i></button>   
                                        </div>                                        
                                        </td>    
                                        </tr>
      
                                    </tbody>
                                    </table>

                                    
                                    </div>
                                    </div>
                                        </div>
                            </div>
                        </div>
                        </div>
                        </div>                      

            </div>
        </Fragment>
    )
}

export default MANAGECUSTOMER;