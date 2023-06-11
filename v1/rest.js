const express = require('express');
const router = express.Router();

router.use(express.json());

const commentsController = require("../controllers/comm");
const apiController = require("../controllers/apicntrl");
const modelsController=require("../controllers/modelscntrl");

var users = { 'user_agent': 0 };
var comm = [];



router.get('/', function (req, res) {
    res.send("Hello, you terned  out on my server!");
});

router.get("/dbcomments", commentsController.getAllComments);
router.get("/dbcomments/:id", commentsController.getComment);
router.post("/dbcomments", express.json(), commentsController.postAddComments);


router.post("/login", apiController.getApi);
router.delete("/logout", apiController.deleteApi);

// Models
router.get("/models", modelsController.getAllModels);
router.get("/models/:id", modelsController.getModelId);

router.post("/models", apiController.checkApi, modelsController.addModel);
router.put("/models/:id", apiController.checkApi, modelsController.updateModel);
router.delete("/models/:id", apiController.checkApi, modelsController.deleteModelId);


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




function checkAutorizetion(req, res, next) {
    const { apiKey } = req.query;
    if (apiKey !== "kotiki") {
        return res.status(401).send("are you kotick?????");
    } else {
        next();
    }
};




module.exports = router;