import { Router } from "express";
import UserRoutes from "./UserRoutes";

export class Routes{
    public router : Router

    constructor(){
        this.router = Router()
        this.app()
    }
    app(){
        this.router.use('/user',UserRoutes)
    }
}
export default new Routes().router