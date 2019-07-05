const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var batchModel = sequelize.models.batch;
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: true}));

route.get("/", function (req, res) {
    return batchModel.findAll().then(function (batch) {
        res.send(batch);
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return batchModel.create(
        postData).then((batches) => {

        res.sendStatus(201).send(batches)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a batch"
        })
    })
})
route.delete("/delete/:batchId", function (req, res) {

    batchModel
        .destroy({where: {id: req.params.batchId}})
        .then(function (result) {
            res.sendStatus(200).send(result);

        })
        .catch(function (err) {

            res.sendStatus(501).send({
                error: err
            })

        });
})


module.exports = route;