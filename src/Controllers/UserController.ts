
import { pipeline } from 'stream'
import Student from '../Models/StudentModel'

export class UserController {

    static async addStudent(req: any, res: any, next: any) {
        try {
            console.log('addstudent', req.body)
            const data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                rollno: req.body.rollno,
                subjects: req.body.subjects,
                age: req.body.age,
                class: req.body.class,
                section: req.body.section,
                address: {
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state
                },
                personalInfo: {
                    fathername: req.body.fathername,
                    phonenumber: req.body.mothername,
                    familyname: req.body.familyname
                },
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const student = await new Student(data).save()
            return res.status(201).json({ msg: "Add Student Successfully", student })
        } catch (error) {
            return res.status(500).json({ msg: "Student Not Added", error })
        }
    }

    static async getStudents(req: any, res: any, next: any) {
        try {

            const students = await Student.find()
            return res.status(200).json({ msg: "Students Lists", students })
        } catch (error) {
            return res.status(500).json({ msg: "Not Listed", error })
        }
    }

    static async update(req: any, res: any, next: any) {
        try {
            const student = await Student.findOne({
                _id: req.body._id
            })
            if (!student) {
                res.send('User Not Found')
            }
            student.age = req.body.age
            student.updatedAt = new Date()
            await student.save()
            return res.status(200).json({ msg: 'Updated Stuednt', student })
        } catch (error) {
            return res.status(500).json({ msg: 'Not Updated', error })
        }

    }

    static async deleteStudent(req: any, res: any, next: any) {
        try {
            const student = await Student.deleteOne({
                _id: req.body._id
            })
            return res.status(200).json({ msg: "Delete Student Succcessfully", student })
        } catch (error) {
            return res.status(500).json({ msg: "Not Deleted", error })
        }
    }


    static async searchSort(req: any, res: any, next: any) {
        try {
            const search = req.query.search
            const student = await Student.find({
                firstname: { $regex: search}
            }).sort({ class: 1 })
            return res.status(200).json({ msg: "Name Found", student })
        } catch (error) {
            //console.log(error)
            return res.status(500).json({ msg: 'Not Found', error })
        }
    }


     static async filter(req:any,res:any,next:any){
         try {
             const student = await Student.find({
                $filter: { input: 'age' , as: String, cond: {$or : [
                    {$gte : 10 , $lte : 20}
                ]
             } }
             })
             return res.status(200).json({msg:"filtered Data",student})
         } catch (error) {
            return res.status(500).json({msg:" Not Filtered",error})
         }
     }
}