import React from 'react'
import ReactDOM from 'react-dom'
import {Fragment} from 'react'
import Routing from './routes/Routing'


const App = ()=>{
    return (
       <Fragment>
           <Routing/>
       </Fragment>
    )
}


ReactDOM.render(<App/>, document.getElementById('root'))