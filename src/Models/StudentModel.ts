import {model} from 'mongoose'
import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({

    firstname:{ type : String},
    lastname : { type : String},
    name:{ type : String},
    rollno : { type : String},
    subjects : { type : String},
    age : { type : String},
    class:{type : String},
    section : {type : String},
    address:{
        _id : false,
        street : { type : String},
        city : { type : String},
        state :{ type : String }
    },
    personalInfo : {
        _id : false,
        fathername : { type : String},
        phonenumber : { type : String},
        familyname : { type : String}
    },
    createdAt : { type : Date , default : new Date()},
    updatedAt : { type : Date , default : new Date()}

})
export default model('students',StudentSchema)