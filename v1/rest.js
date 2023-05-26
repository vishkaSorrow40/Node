const express = require('express');
const router = express.Router();
// const bPasrser = require('body-parser');

// const bodyJson = bPasrser.json({
//     extended: false,
// });

router.use(express.json());

var users = { 'user_agent': 0 };
var comm = [];



router.get('/', function (req, res) {
    res.send("Hello, you terned  out on my server!");
});

router.get('/stats', function (req, res) {
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

router.post('/comments', validateBody, (req, res) => {
    let body = req.body
    comm.push(body)

    console.log(comm);
    res.status(200).json(comm);
    // res.send(comm);

    // body="";
    // req.on("data", (chunk)=>{
    //     body+=chunk.toString();
    // });
    // req.on("end", ()=>{
    //     comm.push(JSON.parse(body));
    //     console.log(comm);
    //     res.send(JSON.stringify(comm));
    // });
});

function validateBody(req, res, next) {
    if (!req.body) {
        res.status(400).json("expected comments!");
    } else {
        const { text } = req.body;
        if (!text) {
            res.status(401).send("Bad request, waited text!");
        } else {
            next();
        }
    }
}

router.post("/users", checkAutorizetion, (req, res) => {
    res.send("you are a truely kotick!!!!");
});


    // return (req, res, next) =>{ 
    //     const {error}=kot.validate(res.body);
    //     if(error){
    //         return res.status(400).json({
    //             error: error.detalis[0].message
    //         });
    //     }
    //     next();
    // };
// }

function checkAutorizetion(req, res, next) {
    const { apiKey } = req.query;
    if (apiKey !== "kotiki") {
        return res.status(401).send("are you kotick?????");
    } else {
        next();
    }
};


module.exports = router;