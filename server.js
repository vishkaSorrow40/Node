const { log } = require('node:console');
const http=require('node:http');

const host= "127.0.0.1"
const port= 5500


const server = http.createServer((req, res)=>{
    if(req.url ==="/"){
        res.statusCode=200;
        res.setHeader("Content-Type", "text/plain");
        res.end("yra! this is my server, no gde je on bil a week ago on kontrolnyi work :((((((");
    }else if(req.url === "/user"){
        res.statusCode=200;
        res.setHeader("Content-Type", "text/plain");
        res.end("vozradyisia USER  this is my server, no gde je on bil a week ago on kontrolnyi work :((((((");
    } else{
        res.statusCode=404;
        res.setHeader("Content-Type", "text/plain");
        res.end("USER  ty slomal moi server, mne teper grystno i nevkusno:((((((");
    }

    
    
});

server.on("connection", ()=>{
    console.log("New connection!");
});

server.listen(port, host, ()=> {
    console.log(`server is on.  http://${host}:${port}`);
});