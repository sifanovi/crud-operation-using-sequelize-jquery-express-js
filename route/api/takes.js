const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var takesModel = sequelize.models.takes;
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: true}));

route.get("/", function (req, res) {
    return takesModel.findAll().then(function (takes) {
        res.send(takes);
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return takesModel.create(
        postData).then((takes) => {

        res.sendStatus(201).send(takes)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a student"
        })
    })
})
route.delete("/delete/:takesId", function (req, res) {

    takesModel
        .destroy({where: {id: req.params.takesId}})
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