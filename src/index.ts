import {Server} from './server'
const server = new Server().app;
const port = 5000;
server.listen(port,()=>{
    console.log(`Server is connected at port ${port}`)
})