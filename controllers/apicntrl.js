const apiserv= require("../service/apidb");

async function getApi(req, res, next) {
    const {userName} = req.body;

    if (!userName) {
        res.statusCode = 400;
        const err = new Error("Отсутсвует имя пользователя!");
        next(err);
    }

    if (typeof userName !== "string") {
        res.statusCode = 400;
        const err = new Error("Некорректный тип имени, используйте string!");
        next(err);
    }

    try {
        const api = await apiserv.getApi(userName)
        res.json(api);
    }
    catch (err) {
        res.statusCode = 500;
        next(err);
    }
};

async function deleteApi(req, res, next) {
    const api = req.headers.api;

    if (!api) {
        const err = new Error("Отсутсвует API-ключ!");
        res.statusCode = 401;
        next(err);
    }
    else {
        try {
            const deletedApi = await apiserv.deleteApi(api);
            res.json(deletedApi);
        }
        catch (err) {
            res.statusCode = 500;
            next(err);
        }
    }
};

function checkApi(req, res, next) {
    const api = req.headers.api;

    if (!api) {
        const err = new Error("Отсутсвует API-ключ!");
        res.statusCode = 401;
        next(err);
    }
    else {
        next();
    }
};


module.exports = {
    deleteApi,
    checkApi,
    getApi
};