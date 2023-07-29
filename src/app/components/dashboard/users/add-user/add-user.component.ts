import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { CreateUser, UserResult,Position,Location,Group, CountryCode, TimeZone} from './add-user.interface';
import { first } from 'rxjs/operators';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

declare var config: any;
declare  var jQuery:  any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  
  ngForm_addUser: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    //error = '';
    sendData: boolean;
    error: any;
    show: boolean;
    error_message: string;
    add_user: CreateUser={
  companyID:null,
  fname: '',
  lname: '',
  email: '',
  countryCode:'',
  telephone: '',
  timeZone: '',
  password:'',
  empID: null,
  team:'',
  position: '',
  group:''
}
  positions: Position[];
  locations: Location[];
  groups: Group[];
  countryCodes: CountryCode[];
  timeZones: CountryCode[];

  showMsg: boolean;

  success_Msg:number=1;
 

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
    this.api.getPositions(companyID).subscribe((result: Position[]) => {
      this.positions = result;
      //console.log(items);
      console.log(this.positions);

    });

   

    this.api.getLocations(companyID).subscribe((result: Location[]) => {
      this.locations = result;
      //console.log(items);
      console.log(this.locations);

    });

    this.api.getGroups(companyID).subscribe((result: Group[]) => {
      this.groups = result;
      //console.log(items);
      console.log(this.groups);

    });

    this.api.getCountryCodes().subscribe((result: CountryCode[]) => {
      this.countryCodes = result;
      console.log(this.countryCodes);
    });

    this.api.getTimeZones().subscribe((result: TimeZone[]) => {
      this.timeZones = result;
      console.log(this.timeZones);
    });

    this.ngForm_addUser = this.formBuilder.group({
      companyID:[companyID],
      fname: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      lname:['', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      email: ['', Validators.required],
      countryCode:[null],
      telephone: [null,[Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      timeZone:[null],
      password:['', [Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
      empID: [null],
      team:[null],
      position:[null],
      group:[null]
  });
  }

  get f() { return this.ngForm_addUser.controls; }

  users(){
    this.router.navigate(['manage/users']);
  }

  save() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    }

     this.submitted = true;
     console.log(this.ngForm_addUser);
        // stop here if form is invalid
        if (this.ngForm_addUser.invalid) {
            return;
        }
      this.sendData = true;
      this.show = false;
      this.api.createUser(this.f.companyID.value,this.f.fname.value,this.f.lname.value,this.f.email.value,this.f.countryCode.value,this.f.telephone.value,
              this.f.timeZone.value,this.f.password.value,this.f.empID.value,this.f.team.value,this.f.position.value,this.f.group.value)
              .subscribe((result: UserResult) => {
                
        if (result.status =='success') {
          //this.error = false;
          //console.log(result.access_token);
          //localStorage.setItem('tokenJWT', result.access_token);
          // alert('User Added');
          // console.log('got data', result);
          // this.auth.updateStateSession(true);
          // this.router.navigate(['manage/users']);

          this.showMsg= true;
          //this._flashMessagesService.show('Record saved successfully',{ cssClass: 'alert-success' } );
          this.toastr.success('Record saved successfully!', 'Done');
          //setTimeout(()=>{
            this.router.navigate(['manage/users']);
          //},1000);
          // Swal.fire({ 
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
