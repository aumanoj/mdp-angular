import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { LocationResult, createLocation,User, TimeZone, CountryCode } from './add-location.interface';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {


  ngForm_addLocation: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  add_location: createLocation={
    name:'',
    userid:null,
    companyID:null,
    countryCode:'',
    telephone:'',
    timeZone:''

  }
  users: User[];
  countryCodes: any[];
  timeZones: any[];

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

  this.ngForm_addLocation = this.formBuilder.group({
    name: ['', Validators.required],
    userid: [null],
    companyID:[companyID],  
    countryCode:[null], 
    telephone:[null,[Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
    timeZone:[null]
  });
  this.api.getUsers(companyID).subscribe((result: User[]) => {
    this.users = result;
    console.log(this.users);
    this.loading = false;
  });


this.api.getCountryCodes().subscribe((result: CountryCode[]) => {
  this.countryCodes = result;
  console.log(this.countryCodes);
});

this.api.getTimeZones().subscribe((result: TimeZone[]) => {
  this.timeZones = result;
  console.log(this.timeZones);
});

}

locations(){
  this.router.navigate(['manage/locations']);
}

get f() { return this.ngForm_addLocation.controls; }

  save() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    } 
    
    this.submitted = true;
    console.log(this.ngForm_addLocation);
       // stop here if form is invalid
       if (this.ngForm_addLocation.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.createLocation(this.f.name.value,this.f.userid.value,this.f.companyID.value,this.f.countryCode.value,this.f.telephone.value,this.f.timeZone.value)
             .subscribe((result: LocationResult) => {
               
       if (result.status =='success') {

         //this._flashMessagesService.show('Record saved successfully',{ cssClass: 'alert-success' } );
         this.toastr.success('Record saved successfully!', 'Done');
         //setTimeout(()=>{
          this.router.navigate(['manage/locations']);
        //},1000);
        // this.router.navigate(['manage/locations']);
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

