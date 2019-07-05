const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var facultyModel = sequelize.models.faculty;
route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
route.get("/", function (req, res) {
    return facultyModel.findAll().then(function (faculty) {
        res.send(faculty);
    })
})
route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return facultyModel.create(postData).then((faculties) => {

        res.sendStatus(201).send(faculties)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a faculty"
        })
    })
})
route.delete("/delete/:facultyId", function (req, res) {

    facultyModel
        .destroy({where: {id: req.params.facultyId}})
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