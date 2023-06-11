const connectToMongoDB = require("../configs/db");
const { ObjectId } = require("mongodb");
const uuid= require("uuid").v4;

let db;
let apiCollection;
connectToMongoDB()
    .then(result => {
        db = result;
        apiCollection = db.collection("API");
    })
    .catch(err => {
        throw err;
    });

    async function getApi(userName) {
        try {
            let apiDoc = await apiCollection.findOne({user: userName});
    
            if (apiDoc === null) {
                const insertRes = await apiCollection.insertOne({
                    user: userName,
                    api: uuid(),
                });
    
                if (insertRes.insertedId) {
                    apiDoc = await apiCollection.findOne({_id: new ObjectId(insertRes.insertedId)});
                }
            }
    
            return apiDoc;
        }
    
        catch (err) {
            throw err;
        }
    };

    async function deleteApi(api) {
        try {
            return await apiCollection.findOneAndDelete({"api": api});
        }
        catch (err) {
            throw err;
        }
    };
    
    module.exports = {
        getApi,
        deleteApi
    };