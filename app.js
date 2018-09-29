const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');


//Absolute path directory for images,css,js files
app.use(express.static(path.join(__dirname,'public')));


//View Engine setup
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',(req,res)=>{

    res.render('index');
    
})

app.listen(4111,()=>{

    console.log("listening on 4111");
})
