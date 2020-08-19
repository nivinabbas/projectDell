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

const User = mongoose.model('User', {
    name: String, 
    password:String,
});

const Post = mongoose.model('Post', {
    username :  String,
    text: String, 
});


app.get('/getPosts', (req, res) => {
    Post.find({}, function(err,docs) {
            res.send(docs)
    })

})

app.post('/addPosts' , (req, res)=> {
    const {text ,name}=req.body;
    let newpost= new Post( {username:name ,text:text } )
        newpost.save()
        

})

app.post('/login-user', function (req, res) {
    const { name, password } = req.body;
    console.log(name,password)
    let validAdmin=false;
    User.findOne( {name:name , password:password } , function(err, docs) {
        console.log(docs);
        if ( docs!=null ) {
            let validAdmin=true;
            res.send( {validAdmin:validAdmin , id:docs._id})
        } 
        else {
            res.send({validAdmin:validAdmin})
        }

    })
});
app.post('/addProduct', (req, res) => {
    const { body } = req;
    console.log(body)
    const {img,price,color,type } = body;

        let newProduct= new product( { name:img, price: price ,color:color,type:type} )
        newProduct.save()
        
      
  })

  app.post('/api/userPannel',(req,res)=>{
    const {id} = req.body;
    
    User.findOne({_id:id}).then(doc=>{
        res.send({user:doc})
    })
   
})


  

app.listen(3000 , ()=>{
    console.log('port 3000')
})