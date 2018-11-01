const mongoose=require('mongoose');
const mongodb=require('mongodb');


let candidateSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    option:String,
    question:String,
    male:String,
    female:String,
    Current_Position:String,
    years_of_experience:String,
    contact:String,
    address:String
  });


  let recuiterSchema=new mongoose.Schema({
    company_name:String,
    Company_website:String,
  Company_Location:String,
  name_of_ceo:String,
    email:String,
    password:String,
    //option:String,
    question:String
  });

  let skillSchema=new mongoose.Schema({
    technology:String,
    github_link:String,
  certificate:String
  
  });

  let addjobsSchema=new mongoose.Schema({
    domain:String,
    designation:String,
    skills_required:String,
    place:String,
    description:String,
  salary:String,
  date:String,
  time:String
  });


  let jobsModel = mongoose.model("addjobs", addjobsSchema);
  let skillModel = mongoose.model("skill", skillSchema);
  let RecuiterModel = mongoose.model("recuiter", recuiterSchema);
  let candidateModel = mongoose.model("candidate", candidateSchema);


