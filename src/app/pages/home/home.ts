import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }
  constructor(private router: Router, public auth: AuthService) {} 
   

    login() {
      this.auth.authenticate(this.creds).subscribe(response => {
        console.log(response.headers.get('Authrization'));
        this.router.navigate(['/categories']); 
      }, 
      error => {}
    );

      
}
}
