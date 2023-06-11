const connectToMongoDB = require("../configs/db");
const { ObjectId } = require("mongodb");

let db;
let modelsCollection;

connectToMongoDB()
    .then(result => {
        db = result;
        modelsCollection = db.collection("models");
    })
    .catch(err => {
        throw err;
    });

    async function getAllModels() {
        try {
            const models = await modelsCollection.find().project({modelName: 1, _id: 0});
            return models.toArray();
        }
        catch (err) {
            throw err;
        }
    };
    
    async function getModelID(modelId) {
        try {
            return await modelsCollection.findOne({_id: new ObjectId(modelId)});
        }
        catch (err) {
            throw err;
        }
    };
    
    async function addModel(modelData) {
        try {
            return modelsCollection.insertOne(modelData);
        }
        catch (err) {
            throw err;
        }
    };
    
    async function updateModel(modelId, modelData) {
        try {
            return await modelsCollection.updateOne({_id: new ObjectId(modelId)}, {
                $set: modelData
            });
        }
        catch (err) {
            throw err;
        }
    };
    
    async function deleteModel(modelId) {
        try {
            return await modelsCollection.deleteOne({_id: new ObjectId(modelId)});
        }
        catch (err) {
            throw err;
        }
    };
    
    module.exports = {
        getAllModels,
        getModelID,
        addModel,
        updateModel,
        deleteModel,
    };