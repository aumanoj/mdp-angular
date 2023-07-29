import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { Position } from '../positions.interface';
import { PositionResult,editPosition,User } from './edit-position.interface';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {

  ngForm_editPosition: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  edit_position: editPosition={
    positionid:null,
    name:'',
    userid:null,
    companyID:null,

}
users:User[];
position: Position[];
  id: number;
  seluser: any=[];
  pos: any[];
  
constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
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

  this.activatedRoute.params.subscribe(paramsId => {
    this.id = +paramsId.id;
    this.api.getPosition(this.id).subscribe((result: Position[]) => {
       this.position = result;
       this.pos = this.position[0].position_users;
        for (let p of this.pos) {
          this.seluser.push(p.user_id);
        }
        console.log(this.seluser);
         //seluser
      //  console.log(this.position);
      });

      console.log(this.id);
    
    });

    this.api.getUsers(companyID).subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
      this.loading = false;
    });
  this.ngForm_editPosition = this.formBuilder.group({
    positionid:[null],
    name: ['', Validators.required],
    userid: [null, Validators.required],
    companyID:[companyID]   
});

}

cancelEdit(){
  this.router.navigate(['manage/positions']);
}

positions(){
  this.router.navigate(['manage/positions']);
}

get f() { return this.ngForm_editPosition.controls; }

update() {

  //form validation Error Scroll
  const firstElementWithError = document.querySelector('.ng-invalid');
  if (firstElementWithError) {
    firstElementWithError.scrollIntoView({ behavior: 'smooth' });
  } 
  
  this.submitted = true;
  console.log(this.ngForm_editPosition);
     // stop here if form is invalid
     if (this.ngForm_editPosition.invalid) {
         return;
     }
   this.sendData = true;
   this.show = false;
   this.api.editPosition(this.f.positionid.value,this.f.name.value,this.f.userid.value,this.f.companyID.value)
           .subscribe((result: PositionResult) => {
            
     if (result.status =='success') {
      
      //this._flashMessagesService.show('Record updated successfully',{ cssClass: 'alert-success' } );
      this.toastr.success('Record updated successfully!', 'Done');
      //setTimeout(()=>{
        this.router.navigate(['manage/positions']);
      //},1000);
      //  Swal.fire({
      //   text: 'Record updated successfully',
      //   icon: 'success',
      //   timer: 3000, 
      //   showConfirmButton: false
      // })
       
     }
     else{
      //  Swal.fire({
      //   title:'Failed',
      //   text: 'User Updated Failed!',
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
