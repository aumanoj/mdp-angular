import { Component, OnInit } from '@angular/core';
import { LoginData, LoginResult } from './login.interface';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../me/me.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
  //  error = '';
  user: LoginData = {
    email: '',
    password: ''
  };
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  constructor(public translate: TranslateService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   

  }

   

  ngOnInit() {
    this.ngForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(15)]]
        });
   // this.auth.start();
  }

   get f() { return this.ngForm.controls; }

   register(){
    this.router.navigate(['register']);
  }

    forgot_pass(){
      this.router.navigate(['forgot-password']);
    }

    login() {
     this.submitted = true;
     console.log(this.ngForm);
        // stop here if form is invalid
        if (this.ngForm.invalid) {
            return;
        }

    this.sendData = true;
    this.show = false;
    this.api.login(this.f.email.value, this.f.password.value).subscribe( (result: LoginResult) => {
      if (result.status == 'success') {
        this.error = false;
        console.log(result);
       localStorage.setItem('userID', result.user.id);
       localStorage.setItem('companyID', result.user.company.id);
      //  console.log(localStorage.getItem('companyID'));
        // localStorage.setItem('tokenJWT', result.user.id);
        localStorage.setItem('tokenJWT', result.access_token);
       
        console.log('login correcto');
        this.auth.updateStateSession(true);
        this.router.navigate(['/dashboard']);
        
      } else {
        this.error = true;
        this.error_message = result.message;
        this.show = true;
        this.auth.updateStateSession(false);
        localStorage.removeItem('tokenJWT');
        console.log('login incorrecto');
        this.sendData = false;
      }
    });
  }

}
