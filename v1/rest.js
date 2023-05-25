const express=require('express');
const  router = express.Router();



var users={'user_agent': 0};
var comm=[];

router.get('/', function(req,res){
    res.send("Hello, you terned  out on my server!");
});

router.get('/stats', function(req,res){
    users.user_agent++;
    res.status(200);
    res.send(`<table>
    <tr>
        <th>User-agent:</th>
    </tr>
    <tr>
        <td>${users.user_agent}</td>
    </tr>
    </table>`);
});

router.post('/comments', function(req,res){
    res.status(200);
    res.send();

    body="";
    req.on("data", (chunk)=>{
        body+=chunk.toString();
    });
    req.on("end", ()=>{
        comm.push(JSON.parse(body));
        console.log(comm);
        res.end(JSON.stringify(comm));
    });

});

module.exports = router;