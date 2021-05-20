const app = require('../server');
const config = require('config');


//Creating and running the server
const http = require('http');
const server = http.createServer(app);
let port = process.env.PORT || config.get('PORT');
server.listen(port);

server.on('listening', function(){
    let address = server.address();
    let uri = typeof address === 'string' ? address : `http://localhost:${address.port}`;
    console.log("listening on" + uri) 
})
