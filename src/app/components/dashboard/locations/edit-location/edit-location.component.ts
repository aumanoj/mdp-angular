import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { Location } from '../locations.interface';
import { LocationResult, editLocation,User, CountryCode, TimeZone } from './edit-location.interface';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {

  
teams : any[];

  ngForm_editLocation: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  edit_location: editLocation={
    teamid:null,
    name:'',
    userid:null,
    companyID:null,
    countryCode:'',
    telephone:'',
    timeZone:''

  }
  users: User[];
  id: number;
  location: Location[];
  countryCodes: any[];
  timeZones: any[];
  seluser: any = [];
  team_users : any = [];
   

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
      this.api.getLocation(this.id).subscribe((result: Location[]) => {
         this.location = result;
         //console.log(this.location[0].team_users);
        this.teams = this.location[0].team_users;
        for (let team of this.teams) {
          this.seluser.push(team.user_id);
        }
        console.log(this.seluser);
         //seluser
        });
  
       // console.log(this.id);
      
      });

      this.api.getUsersDropdown().subscribe((result: User[]) => {
        this.users = result;
        //console.log(this.users);
        this.loading = false;
      });

      this.api.getUsers(companyID).subscribe((result: User[]) => {
        this.users = result;
       // console.log(this.users);
        this.loading = false;
      });

      this.api.getCountryCodes().subscribe((result: CountryCode[]) => {
        this.countryCodes = result;
     //   console.log(this.countryCodes);
      });
      
      this.api.getTimeZones().subscribe((result: TimeZone[]) => {
        this.timeZones = result;
        //console.log(this.timeZones);
      });

      this.ngForm_editLocation = this.formBuilder.group({
        teamid:[null],
        name: ['', Validators.required],
        userid: [null],
        companyID:[companyID],  
        countryCode:[null], 
        telephone:[null,[Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
        timeZone:[null]
    });
  }

  cancelEdit(){
    this.router.navigate(['manage/locations']);
  }

  locations(){
    this.router.navigate(['manage/locations']);
  }

  get f() { return this.ngForm_editLocation.controls; }

update() {

  //form validation Error Scroll
  const firstElementWithError = document.querySelector('.ng-invalid');
  if (firstElementWithError) {
    firstElementWithError.scrollIntoView({ behavior: 'smooth' });
  } 
  
  this.submitted = true;
  console.log(this.ngForm_editLocation);
     // stop here if form is invalid
     if (this.ngForm_editLocation.invalid) {
         return;
     }
   this.sendData = true;
   this.show = false;
   this.api.editLocation(this.f.teamid.value,this.f.name.value,this.f.userid.value,this.f.companyID.value,this.f.countryCode.value,this.f.telephone.value,this.f.timeZone.value)
           .subscribe((result: LocationResult) => {
             
     if (result.status =='success') {
         //this._flashMessagesService.show('Record updated successfully',{ cssClass: 'alert-success' } );
         this.toastr.success('Record updated successfully!', 'Done');
         setTimeout(()=>{
          this.router.navigate(['manage/locations']);
        },1000);
      //  this.router.navigate(['manage/locations']);
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
      //   text: 'Location Update Failed!',
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
