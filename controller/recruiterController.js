//recruiter related url

let RecuiterModel=require('../schema/databaseSchemas').RecuiterModel;
let jobsModel=require('../schema/databaseSchemas').jobsModel;
const bodyParser = require('body-parser');
const ue=bodyParser.json();

let recruiterController=function(app,transporter){
  console.log('inside recruiter controller')

    app.get("/recruiter",function(req,res){
        RecuiterModel.find({},function(err,data){
          console.log(data);
          res.json(data);
        });
      });

    //reginster recruiter 
    app.post('/recruiter',ue,function(req, res) {
        console.log(req.body);
        var mailOptions = {
          from: 'udhyogprovider@gmail.com',
          to: req.body.email,
          subject: 'Welcome',
          text: 'Welcome to Udhyog',
         html: '<html><head><title>Udhyog</title><link href="https://fonts.googleapis.com/css?family=Do+Hyeon" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script></head><body><div class="row"><div class="col s12"><div class="card white" ><div class="card-content black-text"><span class="card-title"><a href="https://ibb.co/kKL3GK"><img src="https://preview.ibb.co/cadZOz/logo.png" alt="logo" style="width:150%;"></a></span><hr><p style="font-family:sans-serif;">We are welcoming you for our site. Get more choices which matters for you. Thank You...</p></div><div class="card-action"><a href="www.google.com/Udhyog"><p style="color:blue;font-size:75%;"> not you...!</p></a></div></div></div></div></body></html>'
        };
          transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        RecuiterModel(req.body).save(function(err,data){
          res.json(data);
        });
        });


        //complete profile recruiter
        app.post('/recruiter/completeProfile',ue,function(req, res) {
            console.log(req.body);
            var myquery = { email: req.body.email };
              var newvalues = { $set: {company_name: req.body.company_name, Company_website: req.body.Company_website,Company_Location:req.body.Company_Location,
              contact:req.body.contact,name_of_ceo:req.body.name_of_ceo}}
              RecuiterModel.updateOne(myquery, newvalues, function(err, data){
              res.json(data);
          });
          });


//login for recruiter
          app.post('/recruiter/login',ue,function(req,res){
            console.log(req.body.email);
            var email=req.body.email;
            var password=req.body.password;
            RecuiterModel.findOne({email:email,password:password},function(err,data){
              if(err){
                console.log(err);
               return res.status(500).send();
              console.log('error');
              }
              if(!data){
                return res.status(404).send();
                console.log('fail1');
              }
              //return res.status(200).send();
              console.log('success');
              res.send({message:"successful login",
              email:req.body.email
            });
              //res.json(data);
          });
          });


//fetch recruiter profile
app.get("/recuiter/profile",function(req,res){
    console.log(req.query.email);
    RecuiterModel.findOne({email:req.query.email},function(err,data){
     console.log(data);
      res.json(data);
  });
  });


  app.get("/recruiter/viewjobs",function(req,res){
    jobsModel.find({},function(err,data){
      console.log(data);
      res.json(data);
  });
  });


app.post('recruiter/addjob',ue,function(req, res) {
    console.log(req.body);
    jobsModel(req.body).save(function(err,data){
      res.json(data);
    });
  });
  

}


module.exports=recruiterController;