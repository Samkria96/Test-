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
                    phonenumber: req.body.phonenumber,
                    familyname: req.body.familyname
                },
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const student = await new Student(data).save()
            return res.status(201).json({ msg: "Add Student Successfully", student })
        } catch (error) {
            //res.status(500).json({ msg: "Student Not Added", error })
            return next(error)
        }
    }

    static async getStudents(req: any, res: any, next: any) {
        try {  
            const students = await Student.find({})
            return res.status(200).json({ msg: "Students Lists", students })
        } catch (error) {
            return //res.status(500).json({ msg: "Not Listed"})

        }
    }

    static async update(req: any, res: any, next: any) {
        try {
            const userId = req.params.userId
            console.log("user", userId)
            const student = await Student.findOne({
                '_id': userId
            })
            if (!student) {
                res.send('User Not Found')
            }
            student.firstname = req.body.firstname ? req.body.firstname : student.firstname,
                student.lastname = req.body.lastname ? req.body.lastname : student.lastname,
                student.age = req.body.lastname ? req.body.lastname : student.age
            student.updatedAt = new Date()
            await student.save()
            return res.status(200).json({ msg: 'Updated Student', student })
        } catch (error) {
            // res.status(500).json({ msg: 'Not Updated', error })
            return next(error)
        }

    }

    static async deleteStudent(req: any, res: any, next: any) {
        try {
            const userId = req.params.userId
            const student = await Student.deleteOne({
                '_id': userId
            })
            return res.status(200).json({ msg: "Delete Student Succcessfully", student })
        } catch (error) {
            //res.status(500).json({ msg: "Not Deleted", error })
            return next(error)
        }
    }

    static async searchSortFilter(req: any, res: any, next: any) {
        try {
            const queryString = req.query
            console.log(queryString.filter)
            const limit = parseInt(queryString.limit)
            const page = queryString.page
            const skip = (page - 1) * limit
            let pipeLine = [];
            let matchSearch = {}
            let sortBy = {}
            let matchFilter: any = {}
            const getSort = (field: any) => {
                let sort
                if (field.startsWith('-')) {
                    field = field.replace('-', '');
                    sort = {
                        [field]: -1
                    }
                } else {
                    sort = {
                        [field]: 1
                    }
                }
                return sort;
            }

            if (queryString.search) {
                matchSearch = { 'firstname': { '$regex': queryString.search } }
                pipeLine.push({'$match': matchSearch})

            }
            if (queryString.classFilter) {
                matchFilter = {
                    'class': queryString?.classFilter
                }
                pipeLine.push({'$match': matchFilter})
            }
            if (queryString.sectionFilter) {
                matchFilter = {
                    "section": queryString?.sectionFilter
                }
                pipeLine.push({'$match': matchFilter})
            }
            if (queryString.ageFilter) {
                matchFilter = {
                    'age': queryString?.ageFilter
                }
                pipeLine.push({'$match': matchFilter})
            }
            if (queryString.sort) {
                sortBy = getSort(queryString.sort);
                pipeLine.push({'$sort': sortBy})
            }

            pipeLine.push({
                '$skip': skip
            })
            pipeLine.push({
                '$limit': limit
            })



            // const student = await Student.aggregate([
            //     { '$match': matchSearch },
            //     { '$match': matchFilter },
            //     { '$sort': sortBy },
            //     {
            //         '$skip': skip
            //     },
            //     {
            //         '$limit': limit
            //     }
            // ])
            const student = await Student.aggregate([
                ...pipeLine
            ])
            return res.status(200).json({ msg: "Name Found", student })
        } catch (error) {
            //res.status(500).json({ msg: 'Not Found', error })
            return next(error)
        }
    }

}