const express = require('express')
const router = express.Router();
const Class = require('../models/Class');

// router.all('/*',(req,res,next)=>{

//     req.app.locals.layout = 'layout';
//     next();
 //})


router.get('/',(req,res)=>{

    Class.find({}).then(classes=>{

        res.render('index',{classes:classes});

    })

})



router.post('/register', (req, res)=>{

    let errors = [];


    if(!req.body.firstName) {

        errors.push({message: 'please enter your first name'});

    }


    if(!req.body.lastName) {

        errors.push({message: 'please add a last name'});

    }

    if(!req.body.email) {

        errors.push({message: 'please add an email'});

    }

    if(!req.body.password) {

        errors.push({message: 'please enter a password'});

    }


    if(!req.body.passwordConfirm) {

        errors.push({message: 'This field cannot be blank'});

    }


    if(req.body.password !== req.body.passwordConfirm) {

        errors.push({message: "Password fields don't match"});

    }


    if(errors.length > 0){

        res.render('home/register', {

            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,

        })

    } else {


        User.findOne({email: req.body.email}).then(user=>{

            if(!user){

                const newUser = new User({

                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,

                });



                bcrypt.genSalt(10, (err, salt)=>{

                    bcrypt.hash(newUser.password, salt, (err, hash)=>{


                        newUser.password = hash;


                        newUser.save().then(savedUser=>{


                            req.flash('success_message', 'You are now registered, please login')


                            res.redirect('/login');

                        });


                    })


                });

            } else {

                req.flash('error_message', 'That email exist please login');


                res.redirect('/login');


            }


        });




    }


});





module.exports = router ;