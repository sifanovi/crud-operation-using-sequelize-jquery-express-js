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
    return batchModel.findAll().then(function (batches) {
        res.send({status: 200, data: batches, message: "batch found"})
    }).catch(function (err) {
        res.send({status: 500, data: err, message: "batch not found"})
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return batchModel.create(
        postData).then((batches) => {

        res.send({status: 201, data: batches, message: "batch created successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not create batch"})
    })
})
route.delete("/delete/:batchId", function (req, res) {

    batchModel
        .destroy({where: {id: req.params.batchId}})
        .then(function (result) {
            res.send({status: 200, data: result, message: "batch deleted successfully"})

        })
        .catch(function (err) {

            res.send({status: 500, data: err, message: "could not delete batch"})

        });
})


module.exports = route;