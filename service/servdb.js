const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/db");

let db;

connectToMongoDB() 
  .then((result) => {
    db = result;
  })
  .catch((err) => console.log(err));

console.log(db);

async function insertComment(data) {
  const comments = db.collection("comments");
  await comments.insertOne(data);
}

async function findComments() {
  const comments = db.collection("comments");
  const result = await comments.find();
  return result.toArray();
}

async function findComment(id) {
  const comments = db.collection("comments");
  const result = await comments.findOne({ _id: new ObjectId(id) });
  return result;
}

async function findName(name) {
  const comments =- db.collection("comments");
  const result = await comments.findOne({ _name: new ObjectId(name) });
  return result;
}

module.exports = {
  insertComment,
  findComments,
  findComment,
  findName,
};