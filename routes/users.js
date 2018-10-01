const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const async = require('async');


router.get('/register',(req,res,next)=>{


res.render('users/register');

})

router.get('/login',(req,res)=>{

    res.send('login now');
})






router.post('/register', (req,res)=>{

    let errors = [];




    if(!req.body.firstName) {

        errors.push({message: 'please enter your first name'});

    }


    if(!req.body.lastName) {

        errors.push({message: 'please add a last name'});

    }
    if(!req.body.username) {

        errors.push({message: 'please enter your username'});

    }



    if(!req.body.email) {

        errors.push({message: 'please add an email'});

    }

    if(!req.body.password) {

        errors.push({message: 'please enter a password'});

    }


    if(!req.body.passwordConfirm) {

        errors.push({message: 'Please re-enter password'});

    }


    if(req.body.password !== req.body.passwordConfirm) {

        errors.push({message: "Password fields don't match"});

    }
    const firstName    	= req.body.firstName;

    const lastName    	= req.body.lastName;
	const street_address  = req.body.street_address;
	const city     		= req.body.city;
	const state    		= req.body.state;
	const zip     		= req.body.zip;
	const email    		= req.body.email;
	const username 		= req.body.username;
	const password 		= req.body.password;
	const passwordConfirm		= req.body.passwordConfirm;
	const type            = req.body.type;


    if(errors.length > 0){
        console.log(errors.length);

        res.render('users/register', {
            

            errors: errors,
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,

        })

    } else {


        User.findOne({email: req.body.email}).then(user=>{

            if(!user){

                const newUser = new User({

                    username: username,
                    email: email,
                    password: password,
                    type: type,


                });

                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        newUser.password = hash;

                        if(type=='student')
                        {
                            console.log("it is student");

                            const newStudent = new Student({
                                firstName: firstName,
                                lastName: lastName,
                                address: [{
                                    street_address: street_address,
                                    city: city,
                                    state: state,
                                    zip: zip
                                }],
                                email: email,
                                username:username
                            });

                            // async.parallel([newUser.save(),newStudent.save()]).then(savedUser=>{
                            //     req.flash('success_message', 'You are now registered, please login');
                                
                            // })
                            newUser.save().then(savedUser=>{

                                newStudent.save().then(savedStudent=>{
                                    req.flash('success_message', 'You are now registered, please login');
                                })
                            })

                            
                        }
                        else if(type=='instructor')
                        {
                            
                            const newInstructor = new Instructor({
                                firstName: firstName,
                                lastName: lastName,
                                address: [{
                                    street_address: street_address,
                                    city: city,
                                    state: state,
                                    zip: zip
                                }],
                                email: email,
                                username:username
                            });

                            // async.parallel([newUser.save(),newInstructor.save()]).then(savedUser=>{
                            //     req.flash('success_message', 'You are now registered, please login');
                                
                            // })
                            newUser.save().then(savedUser=>{

                                newInstructor.save().then(savedInstructor=>{
                                    req.flash('success_message', 'You are now registered, please login');
                                })
                            })
                           
                        }

                        res.redirect('/');




                        

                        // newUser.save().then(savedUser=>{


                        //     req.flash('success_message', 'You are now registered, please login')


                        //     res.redirect('/users/login');

                        // });


                    })


                });

            } 
            else {

                req.flash('error_message', 'That email exist please login');


                res.redirect('/');

            }


        });




    }


});


module.exports = router;