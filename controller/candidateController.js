//TODO: must change employee to cangidates
//candidate related url

const candidateModel=require('../schema/databaseSchemas').candidateModel;
const bodyParser = require('body-parser');
const ue=bodyParser.json();
let candidateController=function(app,transporter){
    console.log("inside candidate controller");
    

    app.get("/candidates/allCandidates",function(req,res){
      candidateModel.find({},function(err,data){
          console.log(data);
          res.json(data);
        });
      });


// complete profile for candidate
app.post('/candidate/completeProfile',ue,function(req, res) {
    console.log(req.body);
    var myquery = { email: req.body.email };
      var newvalues = { $set: {firstname: req.body.firstname,
         lastname: req.body.lastname,
         male:req.body.male,
         female:req.body.female,
         Current_Position:req.body.Current_Position,
        years_of_experience:req.body.years_of_experience,
        contact:req.body.contact,address:req.body.address,
        date:req.body.date }}
  
        candidateModel.updateOne(myquery, newvalues, function(err, data){
      res.json(data);
    });
  });

  //login for employee
  app.post('/candidate/login',ue,function(req,res){
    //console.log(req.body.email);
  
  var email=req.body.email;
    var password=req.body.password;
    candidateModel.findOne({email:email,password:password},function(err,data){
      if(err){
        console.log(err);
       return res.status(500).send();
      console.log('error');
      }
      if(!data){
        return res.status(404).send();
        console.log('fail1');
      }
       req.session.email=req.body.email;
       console.log("-----session inside-----");
       console.log(req.session);
      
        console.log('success');
        res.send({message:"successful login",
        email:req.body.email
    });
      //res.json(data);
  });
  //console.log(req.session);
  //console.log("session "+req.session.email);
  });
  
//===============================================get employee profile data=============================
  app.get("/candidate/fetchbyid",function(req,res){
    console.log("------session outside --------");
   console.log(req.session.email);
   candidateModel.findOne({email:req.query.email},function(err,data){
     console.log(data);
      res.json(data);
  });
  });


}


module.exports=candidateController;


  