const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var marksModel = sequelize.models.marks;

route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
route.get("/", function (req, res) {
    return marksModel.findAll().then(function (marks) {
        res.send({status:"200",data:marks,message:"marks found"});
    })
})
route.get("/:id", function (req, res) {
    return marksModel.findOne({where:{id:req.params.id}}).then(function (result) {
        res.send({status:"200",data:result,"message":"found"});
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return marksModel.create(
        postData).then((result) => {

        res.send({status:"201",data:result,message:"marks submitted"})
    }).catch((err) => {
        console.log(err);
        res.send({status:"500",data:err,message:"marks not submitted"})
    })
})
route.put("/:id", upload.array(), function (req, res) {
    var postData = req.body;


    return marksModel.update(
        postData,{
            where:{"id":req.params.id}
        }).then((result) => {

        res.send({status: 201, data: result, message: "updated successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not update"})
    })
})
route.delete("/delete/:marksId", function (req, res) {

    marksModel
        .destroy({where: {id: req.params.marksId}})
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