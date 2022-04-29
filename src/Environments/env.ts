import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";

export interface Environments {
    db_url:any;
}

export function envron() {
    if (process.env.NODE_ENV==='prod') {
        return ProdEnvironment;
    } else {
        return DevEnvironment;
    }
}