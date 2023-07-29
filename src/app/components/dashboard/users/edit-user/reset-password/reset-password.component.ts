import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {resetPasswordData,resetPasswordResult} from '../reset-password/reset-password.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ngForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    user: resetPasswordData = {
      oldPassword: '',
      newPassword:'',
      confirmPassword:''
    };
  sendData: boolean;
  show: boolean;
  error: boolean;
  success_message: any;
  error_message: any;
  constructor(private toastr: ToastrService,private router: Router,private formBuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      confirmPassword:['']
  });
  }

  get f() { return this.ngForm.controls; }

  reset_pass(){
    this.submitted = true;
     console.log(this.ngForm);
        // stop here if form is invalid
        if (this.ngForm.invalid) {
            return;
        }

    this.sendData = true;
    this.show = false;
    this.api.changePassword(this.f.oldPassword.value,this.f.newPassword.value,this.f.confirmPassword.value).subscribe( (result: resetPasswordResult) => {
      if (result.status == 'success') {
        this.error = false;
        console.log(result);
        //setTimeout(function() {
          //this.showMsg = false;
          //console.log(this.showMsg);
          this.success_message = result.message;
          this.toastr.success(this.success_message, 'Done');
          //this.router.navigate(['manage/users']);
        //}.bind(this), 1000);
      }else {
        // this.error = true;
        // this.error_message = result.message;
        this.error = true;
        window.scrollTo(0, 0)
        this.error_message=result.message;
        setTimeout(function() {
        this.error = false;
        console.log(this.error);
        }.bind(this), 7000);
      }
    });
  }

}
