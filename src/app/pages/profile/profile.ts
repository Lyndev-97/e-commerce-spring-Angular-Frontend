import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit{
  
  email: string = "";
  
  constructor(public storage: StorageService){}

  ngOnInit(): void {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email){
      this.email = localUser.email;
    }
  }

}
