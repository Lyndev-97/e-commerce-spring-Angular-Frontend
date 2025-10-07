import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
   
    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("Passou no interceptor");
    
    return next.handle(req).pipe( 
        catchError(error => {
        
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }
            console.error('Erro detectado pelo interceptor:', errorObj);
            
            switch(errorObj.status){
                    case 403:
                        this.handle403();
                        break;
                }


                return throwError(() => errorObj); 
            })
        );
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
    
}

 export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    };