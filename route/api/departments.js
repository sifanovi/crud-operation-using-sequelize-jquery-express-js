const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var departmentModel = sequelize.models.departments;
route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
route.get("/", function (req, res) {
    return departmentModel.findAll().then(function (departments) {
        res.send({status:"200",data:departments,message:"departments Found"});
    })
})
route.get("/:id", function (req, res) {
    return departmentModel.findOne({where:{id:req.params.id}}).then(function (result) {
        res.send({status:"200",data:result,"message":"found"});
    })
})
route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return departmentModel.create(
        postData).then((departments) => {
        res.send({status:200,data:departments,message:"department crearted successfully"});
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create a department"
        })
    })
})
route.put("/:id", upload.array(), function (req, res) {
    var postData = req.body;


    return departmentModel.update(
        postData,{
            where:{"id":req.params.id}
        }).then((result) => {

        res.send({status: 201, data: result, message: "updated successfully"})
    }).catch((err) => {
        res.send({status: 500, data: err, message: "could not update"})
    })
})
route.delete("/delete/:departmentId", function (req, res) {

    departmentModel
        .destroy({where: {id: req.params.departmentId}})
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