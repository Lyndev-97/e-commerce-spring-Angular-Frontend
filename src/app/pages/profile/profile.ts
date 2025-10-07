import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  
  cliente: ClienteDTO | undefined;
  
  constructor(public storage: StorageService, public clienteService: ClienteService){}

  ngOnInit(): void {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response;
        //buscar imagem do bucket s2
      },
    error => {});
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
