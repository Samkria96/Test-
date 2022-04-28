import { Router } from "express";
import { textChangeRangeIsUnchanged } from "typescript";
import { UserController } from "../Controllers/UserController";


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
       this.router.post('/add-student',UserController.addStudent);
       this.router.post('/search-sort',UserController.searchSort);
       this.router.post('/filter',UserController.filter)
    }

    putRoutes(){
        this.router.put('/update-student',UserController.update);
    }
    patchRoutes(){

    }
    deleteRoutes(){
           this.router.delete('/delete-student',UserController.deleteStudent);
    }
}

export default new UserRoutes().router