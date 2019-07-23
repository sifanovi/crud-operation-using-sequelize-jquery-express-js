const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var noticeModel = sequelize.models.notice;
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended: true}));

route.get("/", function (req, res) {
    return noticeModel.findAll().then(function (notices) {
        res.send({status: 200, data: notices, message: "notice found"})
    }).catch(function (err) {
        res.send({status: 500, data: err, message: "notice not found"})
    })
})
route.get("/:id", function (req, res) {
    return noticeModel.findOne({where:{id:req.params.id}}).then(function (result) {
        res.send({status:"200",data:result,"message":"found"});
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return noticeModel.create(
        postData).then((notices) => {

        res.send({status: 201, data: notices, message: "notice created successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not create notice"})
    })
})

route.put("/:id", upload.array(), function (req, res) {
    var postData = req.body;


    return noticeModel.update(
        postData,{
            where:{"id":req.params.id}
        }).then((notices) => {

        res.send({status: 201, data: notices, message: "notice update successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not create notice"})
    })
})
route.delete("/delete/:noticeId", function (req, res) {

   return  noticeModel
        .destroy({where: {id: req.params.noticeId}})
        .then(function (result) {
            res.send({status: 200, data: result, message: "notice deleted successfully"})

        })
        .catch(function (err) {

            res.send({status: 500, data: err, message: "could not delete notice"})

        });
})


module.exports = route;