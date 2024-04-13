import { Component, OnInit } from '@angular/core';
import { TokenResponsePayload, getDecoded } from '../../util/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  token?: TokenResponsePayload;

  constructor(private router: Router){}
  
  ngOnInit(): void {
    this.token = getDecoded();
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
