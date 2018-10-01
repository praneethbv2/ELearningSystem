const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema(
    {

        title: {
            type: String
        },
        description: {
            type: String
        },
        instructor:{
            type:String
        },
        lessons:[{
            lesson_number: {type: Number},
            lesson_title: {type: String},
            lesson_body:{type: String}
        }]




    }
)

module.exports= mongoose.model('classes',classSchema);