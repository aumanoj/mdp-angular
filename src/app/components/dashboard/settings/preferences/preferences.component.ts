import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../../me/me.interface';
import {  UserResult, User, settings_preferences} from '../../users/edit-user/edit-user.interface';
import Swal from 'sweetalert2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  ngForm_settings_preferences: FormGroup;
  show: boolean;
  user: User;
  submitted: boolean;
  sendData: boolean;
  showMsg: boolean;
  error_message: string;

preferences: settings_preferences={
id:null,
companyID:null,
preference_time_format:'',
preference_name_format:'',
preference_csv_delimeter:'',
preference_world_clock:null,
preference_sound_effect:null,
preference_show_other_typing:null,
preference_google_calender_sync:null
}
  success_message: string;
  error: boolean;


  constructor(private toastr: ToastrService,private ngxLoader: NgxUiLoaderService,private http: HttpClient,private _flashMessagesService: FlashMessagesService, private formBuilder: FormBuilder,private api: ApiService, private router:Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   }

  ngOnInit(): void {
    const userID = JSON.parse(localStorage.getItem('userID'));
    const companyID = JSON.parse(localStorage.getItem('companyID'));

    this.api.getUser(userID).subscribe((result: User) => {
      this.user = result;
    });

    this.ngForm_settings_preferences = this.formBuilder.group({
      id:[userID],
      companyID:[companyID],
      preference_time_format:[''],
      preference_name_format:[''],
      preference_csv_delimeter:[''],
      preference_world_clock:[null],
      preference_sound_effect:[null],
      preference_show_other_typing:[null],
      preference_google_calender_sync:[null]
     
    });

    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });

  }

  get f() { return this.ngForm_settings_preferences.controls; }

  dashboard(){
    this.router.navigate(['dashboard']);
  }

  update() {
    this.submitted = true;
    console.log(this.ngForm_settings_preferences);
       // stop here if form is invalid
       if (this.ngForm_settings_preferences.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.settings_preferences(this.f.id.value,this.f.preference_time_format.value,this.f.preference_name_format.value,
      this.f.preference_csv_delimeter.value,this.f.preference_world_clock.value,this.f.preference_sound_effect.value,this.f.preference_show_other_typing.value,
            this.f.preference_google_calender_sync.value)
             .subscribe((result: UserResult) => {
               
       if (result.status =='success') {
         this.showMsg= true;
         this.toastr.success('Record updated successfully!', 'Done');
        this.success_message=result.message;
        // setTimeout(function() {
        //   this.showMsg = false;
        //   console.log(this.showMsg);
        //   }.bind(this), 1000);
         //this.router.navigate(['manage/users']);
        //  Swal.fire({
        //   text: 'Record updated successfully',
        //   icon: 'success',
        //   timer: 3000, 
        //   showConfirmButton: false
        // })
        this.success_message=result.message;

       }
       else{
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
