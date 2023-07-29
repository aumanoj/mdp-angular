import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {forgotPasswordData,forgotPasswordResult} from '../forgot-password/forgotPassword.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ngForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: forgotPasswordData = {
      email: '',
    };
  sendData: boolean;
  show: boolean;
  error: boolean;
  error_message: string;
  success_message: any;

  constructor(private router: Router,private formBuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem('tokenJWT')){
      this.router.navigate(['/login']);
      return ;
    }
    this.ngForm = this.formBuilder.group({
      email: ['', Validators.required],
  });
  }

  get f() { return this.ngForm.controls; }

  login(){
    this.router.navigate(['login']);
  }

  forgot_pass(){
    this.submitted = true;
     console.log(this.ngForm);
        // stop here if form is invalid
        if (this.ngForm.invalid) {
            return;
        }

    this.sendData = true;
    this.show = false;
    this.api.forgotPassword(this.f.email.value).subscribe( (result: forgotPasswordResult) => {
      if (result.status == 'EMAIL_SENT') {
        this.error = false;
        this.success_message = result.message;
        console.log(result);
       
      }else {
        this.error = true;
        this.error_message = result.message;
        
      }
    });
       
  }



}
