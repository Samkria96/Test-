import {body , validationResult } from "express-validator";
import Student from '../Models/StudentModel'

 export  class Uservalidator {
      
     static student(){
         return [
            body('firstname', 'Frist Name must be at least 2 chars long.').isLength({ min: 2 }),
            body('lastname', 'Last name must be at least 2 chars long.').isLength({ min: 2 }),
            body ('rollno', 'Please Provide Rollno').isNumeric().withMessage('integers only').custom((rollno , {req})=>{
                return Student.findOne({rollno:rollno}).then((student)=>{
                    if(!student){
                       return true
                    }else {
                        throw (new Error("RollNo  Already Exist"))
                    }
                })
            }),
            body ('age', 'Please Provide Age').isInt().withMessage('integers only'), 
            body('fathername', 'Frist Name must be at least 2 chars long.').isLength({ min: 2 }),
            body('phonenumber', 'Phonenumber is Required').isInt().withMessage('Integers Only'),
            body('familyname', 'Last name must be at least 2 chars long.').isLength({ min: 2 })           
         ]
     }
 }

