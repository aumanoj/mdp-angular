import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute,NavigationEnd  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { companyData,companyResult,settings_company} from '../../../account/account.interface';
import Swal from 'sweetalert2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css']
})
export class CompanySettingsComponent implements OnInit {
  ngForm: FormGroup;
  show: boolean;
  company_settings: settings_company= {
    id:null,
    setting_operation_hours_from: '',
    setting_operation_hours_to: '',
    setting_enable_cutoff_time:null,
    setting_weekday_first: '',
    setting_breaks:null,
    setting_paid_unpaid_breaks: '',
      setting_default_break_length_min: '',
      setting_restrict_contact_detail:null,
      setting_restrict_coworkers_schedule_hour:null,
      setting_restrict_schedule_visible_manager:null,
      setting_restrict_schedule_visible_manager_view: '',
      setting_visible_location_coworkers:null,
      setting_message:null,
      setting_allow_staff_conversation:null,
      setting_allow_staff_converse_by: '',
      setting_task:null,
      setting_newsfeed:null,
      setting_newsfeed_staff_allow_create:null,
      setting_staff_allow_shift_give_away:null,
      setting_staff_swap_shift:null,
      setting_staff_swap_shift_restrict_location_position:null,
      setting_staff_swap_auto_approve:null,
      setting_staff_unavaliability:null,
      setting_staff_unavaliability_auto_approve:null
   };
  company: companyResult;
  submitted: boolean;
  sendData: boolean;
  error_message: String;
  error: boolean;
  showMsg: boolean;
  success_message: string;
  

  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService, private formBuilder: FormBuilder,private api: ApiService, private router:Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
    this.auth.userVar$.subscribe((data: MeData) => {
      if (data === null || data.status === false) {
        this.show = true;
      } else {
        this.show = false;
      }
    });
   }

  ngOnInit(): void {
    
    // const userID = JSON.parse(localStorage.getItem('userID'));
    const companyID = JSON.parse(localStorage.getItem('companyID'));
    this.api.getCompany(companyID).subscribe((result: companyResult) => {
      this.company = result;
    });

    this.ngForm = this.formBuilder.group({
      id:[companyID],
      setting_operation_hours_from: [''],
      setting_operation_hours_to: [''],
      setting_enable_cutoff_time:[null],
      setting_weekday_first: [''],
      setting_breaks:[null],
      setting_paid_unpaid_breaks: [''],
      setting_default_break_length_min: [''],
      setting_restrict_contact_detail:[null],
      setting_restrict_coworkers_schedule_hour:[null],
      setting_restrict_schedule_visible_manager:[null],
      setting_restrict_schedule_visible_manager_view: [''],
      setting_visible_location_coworkers:[null],
      setting_message:[null],
      setting_allow_staff_conversation:[null],
      setting_allow_staff_converse_by: [''],
      setting_task:[null],
      setting_newsfeed:[null],
      setting_newsfeed_staff_allow_create:[null],
      setting_staff_allow_shift_give_away:[null],
      setting_staff_swap_shift:[null],
      setting_staff_swap_shift_restrict_location_position:[null],
      setting_staff_swap_auto_approve:[null],
      setting_staff_unavaliability:[null],
      setting_staff_unavaliability_auto_approve:[null]
      
    });

  }

  get f() { return this.ngForm.controls; }

  update(){

    //form validation Error Scroll
    // const firstElementWithError = document.querySelector('.ng-invalid');
    // if (firstElementWithError) {
    //   firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    // } 
    

    this.submitted = true;
    console.log(this.ngForm);
       // stop here if form is invalid
       if (this.ngForm.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.settings_company(this.f.id.value,
            this.f.setting_operation_hours_from.value,
            this.f.setting_operation_hours_to.value,
            this.f.setting_enable_cutoff_time.value,
            this.f.setting_weekday_first.value,
            this.f.setting_breaks.value,
            this.f.setting_paid_unpaid_breaks.value,
            this.f.setting_default_break_length_min.value,
            this.f.setting_restrict_contact_detail.value,
            this.f.setting_restrict_coworkers_schedule_hour.value,
            this.f.setting_restrict_schedule_visible_manager.value,
            this.f.setting_restrict_schedule_visible_manager_view.value,
            this.f.setting_visible_location_coworkers.value,
            this.f.setting_message.value,
            this.f.setting_allow_staff_conversation.value,
            this.f.setting_allow_staff_converse_by.value,
            this.f.setting_task.value,
            this.f.setting_newsfeed.value,
            this.f.setting_newsfeed_staff_allow_create.value,
            this.f.setting_staff_allow_shift_give_away.value,
            this.f.setting_staff_swap_shift.value,
            this.f.setting_staff_swap_shift_restrict_location_position.value,
            this.f.setting_staff_swap_auto_approve.value,
            this.f.setting_staff_unavaliability.value,
            this.f.setting_staff_unavaliability_auto_approve.value
            )
        .subscribe((result: companyResult) => {       
       if (result.status =='success') {
          console.log('got data', result);
        this.showMsg= true;
        this.toastr.success('Record updated successfully!', 'Done');
        this.success_message=result.message;
        // setTimeout(function() {
        //   this.showMsg = false;
        //   console.log(this.showMsg);
        // }.bind(this), 1000);
          

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
