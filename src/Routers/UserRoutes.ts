import { Router } from "express";
import { UserController } from "../Controllers/UserController";
import { GlobalMiddleware } from "../Middlewares/GlobalMiddleware";
import { Uservalidator } from "../Validators/UserValidator";

export class UserRoutes{
    public router : Router

    constructor(){
        this.router = Router()
        this.getRoutes()
        this.postRoutes()
        this.putRoutes()
        this.patchRoutes()
        this.deleteRoutes()
    }

    getRoutes(){
        this.router.get('/get-students',UserController.getStudents);
    }

    postRoutes(){
       this.router.post('/add-student',Uservalidator.student(),GlobalMiddleware.checkError,UserController.addStudent);   
       this.router.post('/search-sort-filter',UserController.searchSortFilter)
    }

    putRoutes(){
        this.router.put('/update-student/:userId',UserController.update);
    }
    patchRoutes(){

    }
    deleteRoutes(){
           this.router.delete('/delete-student/:userId',UserController.deleteStudent);
    }
}

export default new UserRoutes().router