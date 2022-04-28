import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environments {
    db_url : string;
}

export function envron():Environments{
     if('Production'){
         return ProdEnvironment;
     }else {
         return DevEnvironment;
     }
}