import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../../me/me.interface';
import { editUser, UserResult, User, CountryCode ,TimeZone,createWages } from '../edit-user.interface';
import Swal from 'sweetalert2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Group,Position,Location } from '../../add-user/add-user.interface';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selected=[]; 
  ngForm_editUser: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    //  error = '';
    sendData: boolean;
    error: any;
    show: boolean;
    error_message: string;
    add_user: editUser={
      id:null,
  companyID:null,
  fname: '',
  lname: '',
  email:'',
  countryCode:'',
  telephone: '',
  timeZone: '',
  dob:null,
  hireDate:null,
  empID: null,
  team:'',
  position: '',
  group:''
}
ngForm_createWage:FormGroup;
add_wage:createWages={
  position_id:null,
  user_id:null,
  effective_from:null,
  wage:null,
  pay_type:''

}
  id: any;
  user: User;
  countryCodes: any[];
  timeZones: any[];
  selectedItem: any;
  positions: Position[];
  locations: Location[];
  groups: any[];
  showMsg: boolean;
  team: any;
  selteam: any=[];
  pos: any;
  selposition: any=[];
  grp: any;
  selgroup: any=[];
  wages: createWages;
  success_message: string;
  
  

  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService,private ngxLoader: NgxUiLoaderService,private http: HttpClient, private formBuilder: FormBuilder,private api: ApiService, private router:Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
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
    this.api.getUser(this.id).subscribe((result: User) => {
       this.user = result;

       //for selected locations
       this.team = this.user[0].teams;
       for (let t of this.team) {
         this.selteam.push(t.name);
       }
       console.log(this.selteam);

       //for selected positions
       this.pos = this.user[0].positions;
       for (let p of this.pos) {
         this.selposition.push(p.name);
       }
       console.log(this.selposition);

       //for selected positions
       this.grp = this.user[0].groups;
       for (let p of this.grp) {
         this.selgroup.push(p.name);
       }
       console.log(this.selgroup);
       
      });

    //   this.api.getWage(this.id).subscribe((result: createWages) => {
    //     this.wages = result;
    //     console.log(this.wages);
    //   });

    });

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

    console.log(this.id);
    this.ngForm_editUser = this.formBuilder.group({
      id:[null],
      companyID:[companyID],
      fname: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      lname:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*'),Validators.maxLength(16)]],
      email:['',Validators.required],
      countryCode:[null],
      telephone: [null,[Validators.minLength(10),Validators.pattern('^[0-9]*$')]],
      timeZone:[null],
      dob:[null],
      hireDate:[null],
      empID: [null],
      team:[null],
      position:[null],
      group:[null]
    });

    this.ngForm_createWage= this.formBuilder.group({
      position_id:[null],
      user_id:[null],
      effective_from:[null],
      wage:[null],
      pay_type:['']
    });

    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });

      
  }

  reset_pass(){
    this.router.navigate(['changePassword']);
  }

  cancelEdit(){
    this.router.navigate(['manage/users']);
  }

  get f() { return this.ngForm_editUser.controls; }

  

  users(){
    this.router.navigate(['manage/users']);
  }

  update() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    } 
    
    this.submitted = true;
    console.log(this.ngForm_editUser);
       // stop here if form is invalid
       if (this.ngForm_editUser.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.editUser(this.f.id.value,this.f.companyID.value,this.f.fname.value,this.f.lname.value,this.f.email.value,this.f.countryCode.value,this.f.telephone.value,
             this.f.timeZone.value,this.f.dob.value,this.f.hireDate.value,this.f.empID.value,this.f.team.value,this.f.position.value,this.f.group.value)
             .subscribe((result: UserResult) => {
               
       if (result.status =='success') {
         this.showMsg= true;
         this.toastr.success('Record updated successfully!','Done' );
        this.success_message=result.message;
        // setTimeout(function() {
        //   this.showMsg = false;
        //   console.log(this.showMsg);
          this.router.navigate(['manage/users']);
        //}.bind(this), 1000);
         //this.router.navigate(['manage/users']);
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
        //   text: 'User Update Failed!',
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

     get f_wage() { return this.ngForm_createWage.controls; }

     employees(){
       this.router.navigate(['manage/users']);
     }
    //  edit_user(userid:number){
    //   this.router.navigate(['manage/users/edit-user',userid]);
    // }
    //  add_Wage(userid:number){
    //   this.router.navigate(['manage/users/profile/wage',userid]);
    // }

    // add_unavailability(userid:number){
    //   this.router.navigate(['manage/users/profile/unavailability',userid]);
    // }
     
    // add_note(userid:number){
    //   this.router.navigate(['manage/users/profile/note',userid]);
    // }

   

}
