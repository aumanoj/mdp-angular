import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { PositionResult, createPosition,User } from './add-position.interface';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

 
  ngForm_addPosition: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    sendData: boolean;
    error: any;
    show: boolean;
    error_message: string;
    add_position: createPosition={
      name:'',
      userid:null,
      companyID:null,
    }

  users: User[];
  user: User[];
 
  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   }

   ngOnInit(): void {
     
    const companyID = JSON.parse(localStorage.getItem('companyID'));
    this.ngForm_addPosition = this.formBuilder.group({
      name: ['', Validators.required],
      userid: [null],
      companyID:[companyID]   
  });

  this.api.getUsers(companyID).subscribe((result: User[]) => {
    this.users = result;
    console.log(this.users);
    this.loading = false;
  });


  }

  positions(){
    this.router.navigate(['manage/positions']);
  }

  get f() { return this.ngForm_addPosition.controls; }

  save() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    } 
    
    this.submitted = true;
    console.log(this.ngForm_addPosition);
       // stop here if form is invalid
       if (this.ngForm_addPosition.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.createPosition(this.f.name.value,this.f.userid.value,this.f.companyID.value)
             .subscribe((result: PositionResult) => {       
       if (result.status =='success') {
        //this._flashMessagesService.show('Record saved successfully',{ cssClass: 'alert-success' } );
        this.toastr.success('Record saved successfully!', 'Done!');
        //setTimeout(()=>{
         this.router.navigate(['manage/positions']);
       //},1000);
         //this.error = false;
         //console.log(result.access_token);
         //localStorage.setItem('tokenJWT', result.access_token);
         // alert('User Added');
         // console.log('got data', result);
         // this.auth.updateStateSession(true);
        //  this.router.navigate(['manage/positions']);
         
         
        //  Swal.fire({
        //   text: 'Record added successfully',
        //   icon: 'success',
        //   timer: 3000, 
        //   showConfirmButton: false
        // })
         
       }
       else{
        //  Swal.fire({
        //   title:'Failed',
        //   text: 'Added Record Failed!',
        //   icon: 'error',
        //   timer: 3000, 
        //   showConfirmButton: false
        // })
          this.error = true;
          window.scrollTo(0, 0)
          this.error_message=result.message;
          setTimeout(function() {
          this.error = false;
          console.log(this.error);
          }.bind(this), 8000);
       }
       
     });
     

     }

}
