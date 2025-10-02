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
        
        const authorizationValue = response.headers.get('Authorization');

        if (authorizationValue) {
        this.auth.successfulLogin(authorizationValue);
        this.router.navigate(['/categories']); 
        }
      }, 
      error => {}
    );

      
}
}
