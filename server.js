const { log } = require('node:console');
const http=require('node:http');

const host= "127.0.0.1"
const port= 5500


const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type", "text/plain");
    res.end("yra! this is my server, no gde je on bil a week ago on kontrolnyi work :((((((");
});

server.on("connection", ()=>{
    console.log("New connection!");
});

server.listen(port, host, ()=> {
    console.log(`server is on.  http://${host}:${port}`);
});