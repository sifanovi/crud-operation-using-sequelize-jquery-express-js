const route = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");
var upload = multer();
var DB = require('../../models/index');
var sequelize = DB.sequelize;
var includeModel = sequelize.models.include;
route.use(bodyParser.json()); // for parsing application/json
route.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
route.get("/", function (req, res) {
    return includeModel.findAll().then(function (include) {
        res.send(include);
    })
})

route.post("/", upload.array(), function (req, res) {
    var postData = req.body;


    return includeModel.create(
        postData).then((includes) => {
        res.sendStatus(201).send(includes)
    }).catch((err) => {
        console.log(err);
        res.sendStatus(501).send({
            error: "Could not create"
        })
    })
});
route.delete("/delete/:includeId", function (req, res) {

    includeModel
        .destroy({where: {id: req.params.includeId}})
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