
import db from './DB_Con/db.js'
db()

import app from './app.js'
import connectSocket from './socketFolder/connectSocket.js'

const port =  4556 

const server = app.listen(port , ()=>{
    console.log('Server running on port :- ', port);
})

connectSocket(server)

