const modelserv = require("../service/modelsdb");
const { ObjectId } = require("mongodb");

function validatemodels(modelData) {
    let err = null;

    if (!modelData) {
        err = new Error("Отсутствуют данные модели");
    }
    if (!modelData.userName || typeof modelData.userName !== "string") {
        err = new Error("Отсутствует имя пользователя или неверный формат, используйте string!");
    }
    if (!modelData.modelName || typeof modelData.modelName !== "string") {
        err = new Error("Отсутствует имя модели или неверный формат, используйте string!");
    }
    if (!modelData.code || typeof modelData.code !== "object") {
        err = new Error("Отсутсвует JSON модели или  неверный формат, используйте object!");
    }
    if (modelData.description && typeof modelData.description !== "string") {
        err = new Error("Невырный формат описания, используйте srting!");
    }
    if (modelData.comments && typeof modelData.comments !== "object") {
        err = new Error("Неверный формат комментария, используйте формат массива!");
    }

    return err;
};

async function getAllModels(req, res, next) {
    try {
        const models = await modelserv.getAllModels();
        res.send(models);
    }
    catch (err) {
        next(err);
    }
};

async function getModelId(req, res, next) {
    const modelId = req.params.id;

    if (!ObjectId.isValid(modelId)) {
        const err = new Error("Некорректный ID-модели");
        next(err);
    }

    try {
        const model = await modelserv.getModelID(modelId);
        res.send(model);
    }
    catch (err) {
        next(err)
    }
};


async function addModel(req, res, next) {
    const modelData = req.body;

    const error = validatemodels(modelData);
    if (error !== null) {
        res.statusCode = 400;
        next(error);
    }

    const insertModelData = {...modelData};
    insertModelData.description = insertModelData.description ?? "";
    insertModelData.comments = insertModelData.comments ?? [];

    const date = new Date();
    insertModelData.created = date;
    insertModelData.modified = date;

    try {
        const insertRes = await modelserv.addModel(insertModelData);

        if (insertRes.insertedId) {
            res.statusCode = 201;
            res.send(insertRes.insertedId);
        }
        else {
            const err = new Error("Ошибка добавления модели!");
            res.statusCode = 500;
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
};


async function updateModel(req, res, next) {
    const modelData = req.body;

    if (!modelData) {
        res.statusCode = 400;
        const err = new Error("Отсутствуют данные о модели!");
        next(err);
    }

    const modelId = req.params.id;

    if (!modelId || !ObjectId.isValid(modelId)) {
        res.statusCode = 400;
        const err = new Error("Некорректный ID-модели!");
        next(err);
    }

    const error = validatemodels(modelData);
    if (error !== null) {
        next(error);
    }

    const insertModelData = {...modelData};

    insertModelData.modified = new Date();

    try {
        const result = await modelserv.updateModel(modelId, insertModelData);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
};


async function deleteModelId(req, res, next) {
    const modelId = req.params.id;

    if (!ObjectId.isValid(modelId)) {
        const err = new Error("Некорректный ID-модели!");
        res.statusCode = 400;
        next(err);
    }

    try {
        const result = await modelserv.deleteModel(modelId);

        let error = null;
        if (result.deletedCount > 1) {
            error = new Error("Удалено больше одного элемента!");
        }
        else if (result.deletedCount === 0) {
            error = new Error("Не удалось удалить элемент!");
        }
        if (error !== null) {
            res.statusCode = 500
            next(error);
        }

        res.send(result);
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    getAllModels,
    getModelId,
    addModel,
    updateModel,
    deleteModelId,
};