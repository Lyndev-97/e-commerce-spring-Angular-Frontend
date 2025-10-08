import { NgModule } from "@angular/core";
import { CidadeService } from "../../services/domain/cidade.service";
import { EstadoService } from "../../services/domain/estado.service";
import { Signup } from "./signup";

@NgModule({
    declarations: [
  ],
  imports: [  
    
  ],
  providers: [
    //CidadeService, => Isso não funcionou, devo verificar o motivo em breve, como contorno, adicionei os providers no app-module.ts
    //EstadoService
  ]
  })
  export class SignupPageModule { }