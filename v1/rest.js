const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

/**
 *  @swagger
 * /:
 *  get:
 *      description: приветствие на сервере.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: ответ об успешном подключении и вывод сообщения.
 *              content:
 *                  application/json:
*                    schema:
*                      type: object
*                      properties:
*                        data:
*                          type: object
*                          properties:
*                            status:
*                              type: string
*                              description: статус ответа.
*                            message:
*                              type: string
*                              description: привественное сообщение.
 */

router.get("/dbcomments", commentsController.getAllComments);
router.get("/dbcomments/:id", commentsController.getComment);
router.post("/dbcomments", express.json(), commentsController.postAddComments);


router.post("/login", apiController.getApi);
router.delete("/logout", apiController.deleteApi);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: возвращает API-ключ по имени пользователя.
 *     tags:
 *        - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: имя пользователя
 *     responses:
 *       '200':
 *         description: успешный запрос, возвращается объект с API-ключом.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiObject'
 *       '400':
 *         description: некорректный запрос,отсутсвует имя пользователя или имя пользователя имеет неверный тип.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '500':
 *         description:  ошибка сервера, не удалось получить API-ключ
 * /logout:
 *    delete:
 *      summary: завершение сеанса пользователя
 *      description:  выход из системы и удаления API-ключа.
 *      tags:
 *        - Authentication
 *      security:
 *        - ApiKeyAuth: []
 *      responses:
 *        '200':
 *          description: завершение сеанса
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DeletedApi'
 *        '401':
 *          description: не передан API.
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *        '500':
 *          description: ошибка сервера, не удалось получить модель. 
*/


router.get("/models", modelsController.getAllModels);
router.get("/model/:id", modelsController.getModelId);

/**
 * @swagger
 * /models:
 *  get:
 *      summary: получить все модели из базы.
 *      responses:
 *          '200':
 *            description: возвращает список всех моделей.
 *            content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ModelData'
 *       '500':
 *         description: ошибка сервера, запрос не выполнен
 * /
 * 
/** 
 * @swagger
 * /model/{id}:
 *      get:
 *          summary: возвращает модель по Id
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: ID модели
 *                schema:
 *                type: string
 *          responses:
 *              '200':
 *                description: модель  найдена
 *                content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ModelData'
 *              '400':
 *                  description: некорректный ID модели
 *                  content:
 *                  application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/BadRequestError'
 *              '500':
 *                  description: ошибка сервера, не удалось получить модель.
 */

router.post("/models", apiController.checkApi, modelsController.addModel);
router.put("/models/:id", apiController.checkApi, modelsController.updateModel);
router.delete("/models/:id", apiController.checkApi, modelsController.deleteModelId);

/**
 * @swagger
 *  /models:
 *   post:
 *     summary: добавить модель
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModelData'
 *     responses:
 *       '201':
 *         description: модель  добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: ошибка валидации, некорректные данные модели или недостаточно данных.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '500':
 *         description:  ошибка сервера, модель не добавлена
 * 
 * /models/{id}:
 *   put:
 *     summary: обновить модель по ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID модели
 *         schema:
 *           type: string
 *       - in: body
 *         name: modelData
 *         required: true
 *         description: данные о модели
 *         schema:
 *           $ref: '#/components/schemas/ModelData'
 *     responses:
 *       '200':
 *         description: модель обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModelData'
 *       '400':
 *         description: некорректный ID модели или отсутствуют данные о модели
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '402':
 *         description: ошибка валидации, некорректные данные модели или недостаточно данных.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       '500':
 *         description: ошибка сервера, не удалось обновить модель.
 * 
 * /models/{id}:
 *   delete:
 *     summary: уалить модель по ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID модели
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: модель удалена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: number
 *                   description: количество удаленных моделей
 *       '400':
 *         description: некорректный ID модели.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestError'
 *       '401':
 *         description: Не передан API.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       '500':
 *         description: ошибка сервера, не удалось удалить модель
 */


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

router.use((err, res, req, next)=>{
    res.status(500).json(err);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     ModelData:
 *       type: object
 *       properties:
 *         userName:
 *           type: string
 *           description: имя пользователя
 *         modelName:
 *           type: string
 *           description: имя модели
 *         code:
 *           type: object
 *           description: JSON модели
 *         description:
 *           type: string
 *           description: описание модели (опционально)
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: комментарии (опционально)
 *       required:
 *         - userName
 *         - modelName
 *         - code
 *  
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: описание ошибки валидации
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: описание ошибки авторизации
 *     BadRequestError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: описание ошибки невалидного запроса
 *     ApiObject:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: имя пользователя
 *         api:
 *           type: string
 *           description: API ключ
 *     DeletedApi:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               description: имя пользователя
 *             api:
 *               type: string
 *               description: удаленный API ключ
 *   securitySchemes:
 *       ApiKeyAuth:
 *         type: apiKey
 *         in: header
 *         name: api
 */


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "My first server",
        version: "1.0.0",
        description: "glad to see you",
    },
    components: {
        securitySchemes: {
            apikey: {
                description:
                    "API ключ для авторизации, если нет, то можно воспользоваться `eaaa9f80-f414-41d5-b0c3-13effc8e8dcc`.",
                type: "apiKey",
                name: "api",
                in: "header",
            },
        },
    },
    servers: [
        {
            url: "http://127.0.0.1:5500/v1",
            description: "Локальный для разработки",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./v1/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;