const { log } = require('node:console');
const http=require('node:http');
const { connect } = require('node:http2');
const { parse } = require('node:querystring');

const host= "127.0.0.1"
const port= 5500

var users={'user_agent': 0};
var comm=[];

const server = http.createServer((req, res)=>{
    if(req.url ==="/"){
        if(req.method === "GET"){
            res.statusCode=200;
            res.setHeader("Content-Type", "text/plain");
            res.end("yra! this is my server, no gde je on bil a week ago on kontrolnyi work :((((((");
        }
    }else if(req.url === "/stats"){
        if(req.method=== "GET"){
            res.writeHead(200, {'Content-Type': 'text/html'});
            users.user_agent++;
            res.end(`<table>
            <tr>
                <th>User-agent:</th>
            </tr>
            <tr>
                <td>${users.user_agent}</td>
            </tr>
            </table>`);
        }
    } else if(req.url === "/comments"){
        if(req.method=== "POST"){
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            body="";
            req.on("data", (chunk)=>{
                body+=chunk.toString();
            });

            req.on("end", ()=>{
                comm= parse(body);
                console.log(comm);
                res.end("Moi server horosh!");
            });
   
        }
    }
    else{
        res.statusCode=404;
        res.setHeader("Content-Type", "text/plain");
        res.end("USER  ty slomal moi server, mne teper grystno i nevkusno:((((((");
    }

});

server.on("connection", ()=>{
    console.log("New connection!");
    console.log(`ip ${host}, port: ${port}`);
});

server.listen(port, host, ()=> {
    console.log(`server is on.  http://${host}:${port}`);
});