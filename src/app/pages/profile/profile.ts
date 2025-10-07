import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  
  cliente: ClienteDTO | undefined;
  
  constructor(public storage: StorageService, public clienteService: ClienteService, private router: Router){}

  ngOnInit(): void {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response;
        //buscar imagem do bucket s2
      },
    error => {
      if(error.status == 403){
          this.router.navigate(['']); 
      }
    });
    
  }else{
      this.router.navigate(['']);
    }
  }

  getImageIfExists(){
    
    if(this.cliente){
        this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
        this.cliente!.imageUrl = `${API_CONFIG.bucketBaseUrl}cp${this.cliente!.id}.jpg`;
    },
  error => {});
    }
  }

}
