import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../me/me.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  user: any;
  access: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.user = data;
      }
    });
    this.auth.accessVar$.subscribe((data: boolean) => {
    console.log('session state', data);
      if ( data === false && this.access) {
        this.access = false;
        this.logout();
      } else {
        this.access = data;
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.start();
  }

}
