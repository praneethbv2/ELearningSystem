const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.Promise = global.Promise;

//Connecting to db
mongoose.connect("mongodb://localhost:27017/eLearn").then(db=>{

console.log("connected to mongoDB");
}).catch(err=>{
    console.log(err);
});

//View Engine setup
app.engine('handlebars',exphbs({defaultLayout:'layout'}));
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



//Absolute path directory for images,css,js files
app.use(express.static(path.join(__dirname,'public')));




//Session for flash
app.use(session({
    secret: 'praneethbv2',
    resave:true,
    saveUninitialized:true

}))
app.use(flash());

//Local variables using middleware
app.use((req,res,next)=>{

    res.locals.user = req.user || null;

    res.locals.success_message = req.flash('success_message');

    res.locals.error_message = req.flash('error_message');


    res.locals.error = req.flash('error');

    next();
})

//Load Routes
const home = require('./routes/index');
const classes = require('./routes/classes');
const users = require('./routes/users');
//Use Routes
app.use('/',home);
app.use('/classes',classes);
app.use('/users',users);






app.get('/',(req,res)=>{

    res.render('index');
    
})

app.listen(4111,()=>{

    console.log("listening on 4111");
})
