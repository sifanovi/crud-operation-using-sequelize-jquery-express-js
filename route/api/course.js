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
        res.send({status:"200",data:course,"message":"course found"});
    })
})
route.get("/:id", function (req, res) {
    return courseModel.findOne({where:{id:req.params.id}}).then(function (result) {
        res.send({status:"200",data:result,"message":"found"});
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
route.put("/:id", upload.array(), function (req, res) {
    var postData = req.body;


    return courseModel.update(
        postData,{
            where:{"id":req.params.id}
        }).then((result) => {

        res.send({status: 201, data: result, message: "updated successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not update"})
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