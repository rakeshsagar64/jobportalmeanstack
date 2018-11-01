//skill related url
const skill=require('../schema/databaseSchemas').skillModel;

const bodyParser = require('body-parser');
const ue=bodyParser.json();
let skillController=function(app,transporter){
  console.log("inside skill controller");
    app.get("/skill",function(req,res){
        skill1.find({},function(err,data){
          console.log(data);
          res.json(data);
        });
      });

    app.post('/addskill',ue,function(req, res) {
        console.log(req.body);
        skill1(req.body).save(function(err,data){
          res.json(data);
        });
      });

}

module.exports=skillController;