const express=require('express');
const  router = express.Router();
const bPasrser=require('body-parser');

router.use(express.json());

var users={'user_agent': 0};
var comm=[];

function checkAutorizetion(res, req,next){
    const apiKey=req.query.apiKey;
    if (apiKey!== 'kotiki'){
        res.status(401).send("are you kotick?????");
    } else{
        next();
    }
}

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


router.post("/users", checkAutorizetion, (res, req) =>{
    res.send("you are a truely kotick!!!!");
});

module.exports = router;