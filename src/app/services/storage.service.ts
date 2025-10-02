import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/stotage_keys.config";

@Injectable()
export class StorageService{

    getLocalUser(): LocalUser | null{
       let usr = localStorage.getItem(STORAGE_KEYS.localUser);
       if(usr == null){
        return null;
       }else{
            return JSON.parse(usr);
       }
    }

    setLocalUser(obj: LocalUser | null){
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}