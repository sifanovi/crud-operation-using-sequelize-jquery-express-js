const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var courseModel = sequelize.models.course;

route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
route.get("/", function (req, res) {
    return courseModel.findAll().then(function (course) {
        res.send(course);
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return courseModel.create(
        postData).then((courses) => {

        res.sendStatus(201).send(courses)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a batch"
        })
    })
})

route.delete("/delete/:courseId", function (req, res) {

    courseModel
        .destroy({where: {id: req.params.courseId}})
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