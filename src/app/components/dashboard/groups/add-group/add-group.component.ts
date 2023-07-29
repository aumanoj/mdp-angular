import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { GroupResult, createGroup,User } from './add-group.interface';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  ngForm_addGroup: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  add_group: createGroup={
    name:'',
    userid:null,
    companyID:null,

}
users: User[];

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

  this.ngForm_addGroup = this.formBuilder.group({
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

groups(){
  this.router.navigate(['manage/groups']);
}

get f() { return this.ngForm_addGroup.controls; }

save() {
  
  //form validation Error Scroll
  const firstElementWithError = document.querySelector('.ng-invalid');
  if (firstElementWithError) {
    firstElementWithError.scrollIntoView({ behavior: 'smooth' });
  } 

  this.submitted = true;
  console.log(this.ngForm_addGroup);
     // stop here if form is invalid
     if (this.ngForm_addGroup.invalid) {
         return;
     }
   this.sendData = true;
   this.show = false;
   this.api.createGroup(this.f.name.value,this.f.userid.value,this.f.companyID.value)
           .subscribe((result: GroupResult) => {
             
     if (result.status =='success') {
         //this._flashMessagesService.show('Record saved successfully',{ cssClass: 'alert-success' } );
         this.toastr.success('Record saved successfully!','Done' );
         //setTimeout(()=>{
          this.router.navigate(['manage/groups']);
        //},5000);
      //  this.router.navigate(['manage/groups']);
      //  Swal.fire({ 
      //   text: 'Record added successfully',
      //   icon: 'success',
      //   timer: 3000, 
      //   showConfirmButton: false
      // })
      
    }
    else{
      // Swal.fire({
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
