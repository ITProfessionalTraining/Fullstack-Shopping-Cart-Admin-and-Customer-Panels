import react from 'react'
import {Fragment} from 'react'

const Main = ()=>{
    return (
        <Fragment>
        <div class="container-fluid pb-3"></div>
          <div class="d-grid gap-3" style={{gridTemplateColumns: '2fr 1fr'}}>
                <div class="bg-light border rounded-3">
                    <br/> <br/> <br/> <br/> <br/> <br/>
                </div>
                <div class="bg-light border rounded-3">
                <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                </div>
                </div>
        
        </Fragment>
    )
}

export default Main;