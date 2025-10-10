import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { StorageService } from "../services/storage.service";
import { FieldMessage } from "../models/fieldMessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log("Passou no interceptor");
    
    return next.handle(req).pipe( 
        catchError((error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) => {
        
            let errorObj: any = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                try {
                        errorObj = JSON.parse(errorObj);
                    } catch (e) {
                        errorObj = error;
                    }
            }
            console.error('Erro detectado pelo interceptor:', errorObj);
            
            switch(errorObj.status){
                    
                    case 401:
                        this.handle401();
                        break;
                
                    case 403:
                        this.handle403();
                        break;

                    case 422:
                        this.handle422(errorObj);
                        break;
                    
                    default:
                        this.handleDefaultError(errorObj);
                }


                return throwError(() => errorObj); 
            })
        );
    }

    handle403(){
        this.storage.setLocalUser(null);
    }

     handle401() {
        alert('Erro 401: falha de autenticação\nEmail ou senha incorretos');
    }

    handleDefaultError(errorObj: any){
        alert('Erro: ' + errorObj.status + ': ' + errorObj.error + 'mensagem de erro: ' + errorObj.message);
    }

    handle422(errorObj: any) {
        alert("Erro 422 de validação" + this.listErrors(errorObj.errors))
    }

    listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for(var i=0; i<messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " +messages[i].message + '</p>';
        }
        return s;
    }
    
}

 export const ErrorInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    };