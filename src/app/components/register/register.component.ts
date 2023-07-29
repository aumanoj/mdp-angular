import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterData, RegisterResult } from './register.interface';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MustMatch } from './confirm-password.validator';
import { LoginResult } from '../login/login.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngForm: FormGroup;
  complete: boolean;
  operation: number;
  message: string;
  register_form: RegisterData = {
    fname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation:'',
    telephone:'',
  };
  submitted: boolean;
  sendData: boolean;
  show: boolean;
  error_message: any;
  error: boolean;
  errors: boolean;
  
  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService) {
    
   }

  ngOnInit() {
    //this.auth.start();
    if(localStorage.getItem('tokenJWT')){
      this.router.navigate(['/login']);
      return ;
    }
    this.ngForm = this.formBuilder.group({
      fname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      email: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
      password_confirmation:['',Validators.required],
      telephone:['',[Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]*$')]]
    },{
      validator: MustMatch('password', 'password_confirmation')
  });
  
  }

 
  get f() { return this.ngForm.controls; }

  login(){
    this.router.navigate(['login']);
  }

  register() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    } 

    this.submitted = true;
    console.log(this.ngForm);
       // stop here if form is invalid
       if (this.ngForm.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.registerData(this.f.fname.value,this.f.lname.value,this.f.email.value,this.f.password.value,this.f.password_confirmation.value,this.f.telephone.value)
             .subscribe((result: RegisterResult) => {
               
       if (result.status =='success') {
          console.log('got data', result);
       
        
        this.api.login(this.f.email.value, this.f.password.value).subscribe( (result: LoginResult) => {
          if (result.status == 'success') {
            this.error = false;
            console.log(result);
           localStorage.setItem('userID', result.user.id);
            // localStorage.setItem('tokenJWT', result.user.id);
            localStorage.setItem('tokenJWT', result.access_token);
           
            console.log('login correct');
            this.auth.updateStateSession(true);
            //this._flashMessagesService.show('Registered successfully',{ cssClass: 'alert-success' } );
            this.toastr.success('Registered successfully!', 'Done');
            //setTimeout(()=>{
              this.router.navigate(['/company']);
            //});
             
          } 
        });
         

       }
       else{
        this.errors = true;
        window.scrollTo(0, 0)
        this.error_message=result.message;
        setTimeout(function() {
          this.errors= false;
          console.log(this.errors);
        }.bind(this), 8000);
       }
       
     });
     
     }

}
