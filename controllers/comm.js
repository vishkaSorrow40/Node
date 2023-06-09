const commentServices = require('../service/servdb');
const { ObjectId } = require('mongodb');

async function getAllComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}

async function getComment(req, res) {
  if (ObjectId.isValid(req.params.id)) {
    let comment = await commentServices.findComments(req.params.id)
    res.json(comment)
  } else {
    res.status(404).send("Object Not Found")
  }
}

async function postAddComments(req, res) {
  const { name, comment } = req.body;
 commentServices.insertComment({ name, comment });
 let com= await commentServices.findComments();
  res.json(com);
}

async function getCommentByName (req, res) {
    if (ObjectId.isValid(req.params.name)) {
        let comment = await comment.Services.findName(req.params.name)
        res.json(comment)
    } else {
        res.status(404).send("Object Not Found")
    }
}

module.exports = {
  getAllComments,
  postAddComments,
  getComment,
  getCommentByName,
}