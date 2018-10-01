const express = require('express')
const router = express.Router();
const Class = require('../models/Class');




router.get('/',(req,res)=>{

    Class.find({}).then(classes=>{

        res.render('classes/index',{classes:classes});

    })

})


//Class Details
router.get('/:id/details',(req,res)=>{


    Class.findOne({_id:req.params.id}).then(classes=>{

        res.render('classes/details',{classes:classes});

    })
})

module.exports = router ;