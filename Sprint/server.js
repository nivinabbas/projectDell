const express = require('express')
const app = express()

var bodyParser = require('body-parser');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

const url = "mongodb+srv://jeries:g1g2g3g4g5@cluster0.sb6dm.mongodb.net/test";


const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });





app.use(express.static('public'));

const Task = mongoose.model('Task', {
  jiraItem: {
    jiraId: String,
    jiraName: String,
    jiraType: String,
    priority: String,
    status: String,
    specialFields: {
      jiraParentId: String,
      functionalTest: Boolean,
      qaRepresentative: String,
      fixVersion: String
    }
  },
  qcItem: {
    requirmentId: String,
    requirementType: String,
    status: String
  },
  diffItem: {
    type: { type: String },
    updateTime: Number,
    updatedFields: [{fieldName: String,
      oldValue: String,
      newValue: String}]    
  }
  // taskItem: {
  //   user: User,
  //   isDone: Boolean,
  //   updatedTime: Date,
  //   createdTime: Date
  // }
});



  app.get('/Tickets', (req, res) => {
    /*Task.find({},function(err,tasks){
      res.send(tasks)
  })*/
})

  app.listen(3000 , ()=> {
    console.log("Port is running in 3000")
})