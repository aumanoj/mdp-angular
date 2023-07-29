import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../me/me.interface';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  user: any;
  access: boolean;
  constructor(private auth: AuthService, private router: Router,public translate: TranslateService) {
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

    //dynamic translation
    // translate.addLangs(['en', 'fr']);
    // translate.setDefaultLang('en');
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.start();
  }
  users(){
    this.router.navigate(['manage/users']);
  }

  edit_user(userid:number){
    this.router.navigate(['manage/users/profile/edit-profile',userid]);
   
  }

  account(){
    this.router.navigate(['/account']);
  }

  settings(){
    this.router.navigate(['/settings']);
  }

}
