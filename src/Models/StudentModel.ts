import {model} from 'mongoose'
import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({

    firstname:{ type : String , required : true},
    lastname : { type : String , required : true},   
    rollno : { type : String , required : true},
    subjects : [{type : Object}], 
    age : { type : String , required : true},
    class:{type : String },
    section : {type : String},
    address:{
        _id : false,
        street : { type : String},
        city : { type : String},
        state :{ type : String }
    },
    personalInfo : {
        _id : false,
        fathername : { type : String , required : true},
        phonenumber : { type : String , required : true},
        familyname : { type : String , required : true}
    },
    createdAt : { type : Date , default : new Date()},
    updatedAt : { type : Date , default : new Date()}

})
export default model('students',StudentSchema)