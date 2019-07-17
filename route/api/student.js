const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var studentModel = sequelize.models.student;
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: true}));

route.get("/", function (req, res) {
    return studentModel.findAll().then(function (students) {
        res.send(students);
    })
})
route.get("/:id", function (req, res) {
    return studentModel.findOne({where:{id:req.params.id}}).then(function (result) {
        res.send({status:"200",data:result,"message":"found"});
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return studentModel.create(
        postData).then((students) => {

        res.sendStatus(201).send(students)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a student"
        })
    })
})
route.put("/:id", upload.array(), function (req, res) {
    var postData = req.body;


    return studentModel.update(
        postData,{
            where:{"id":req.params.id}
        }).then((result) => {

        res.send({status: 201, data: result, message: "updated successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not update"})
    })
})
route.delete("/delete/:studentId", function (req, res) {

    studentModel
        .destroy({where: {id: req.params.studentId}})
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