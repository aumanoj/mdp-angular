import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { editUser, UserResult, User, settings_notifications } from '../../users/edit-user/edit-user.interface';
import Swal from 'sweetalert2';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  ngForm_settings_notifications: FormGroup;
  show: boolean;
  user: User;
  submitted: boolean;
  sendData: boolean;
  showMsg: boolean;
  error_message: string;

  notifications: settings_notifications={
    id:null,
    companyID:null,
    notification_shift_alarm:null,
    notification_time_before_shift: "",
    notification_shift_sms: null,
    notification_shift_push: null,
    notification_shift_email: null,
    notification_dashboard: "",
    notification_dashboard_push: null,
    notification_dashboard_email: null,
    notification_message: "",
    notification_message_push: null,
    notification_message_email: null,
    notification_message_browser: null,
    notification_newsfeed: "",
    notification_newsfeed_push: null,
    notification_newsfeed_email: null,
    notification_newsfeed_browser: null,
    notification_daily_email_report: null,
    notification_daily_time: "",
    notification_timeclock_timesheet_edit: null,
    notification_timeclock_checkin: "",
    notification_timeclock_checkin_define_last_minutes: "",
    notification_timeclock_checkout: "",
    notification_timeclock_checkout_define_last_minutes: "",
    }
  success_message: string;
  error: boolean;

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
    const userID = JSON.parse(localStorage.getItem('userID'));
    const companyID = JSON.parse(localStorage.getItem('companyID'));
    this.api.getUser(userID).subscribe((result: User) => {
      this.user = result;
    });

    this.ngForm_settings_notifications = this.formBuilder.group({
    id:[userID],
    companyID:[companyID],
    notification_shift_alarm:[null],
    notification_time_before_shift: [''],
    notification_shift_sms: [null],
    notification_shift_push: [null],
    notification_shift_email: [null],
    notification_dashboard: [''],
    notification_dashboard_push: [null],
    notification_dashboard_email: [null],
    notification_message: [''],
    notification_message_push: [null],
    notification_message_email: [null],
    notification_message_browser: [null],
    notification_newsfeed: [''],
    notification_newsfeed_push: [null],
    notification_newsfeed_email: [null],
    notification_newsfeed_browser: [null],
    notification_daily_email_report: [null],
    notification_daily_time: [''],
    notification_timeclock_timesheet_edit: [null],
    notification_timeclock_checkin: [''],
    notification_timeclock_checkin_define_last_minutes: [''],
    notification_timeclock_checkout: [''],
    notification_timeclock_checkout_define_last_minutes: [''],
    });

  }

  get f() { return this.ngForm_settings_notifications.controls; }

  update(){

    this.submitted = true;
    console.log(this.ngForm_settings_notifications);
       // stop here if form is invalid
       if (this.ngForm_settings_notifications.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.settings_notifications(
          this.f.id.value,
          this.f.notification_shift_alarm.value,
          this.f.notification_time_before_shift.value,
          this.f.notification_shift_sms.value,
          this.f.notification_shift_push.value,
          this.f.notification_shift_email.value,
          this.f.notification_dashboard.value,
          this.f.notification_dashboard_push.value,
          this.f.notification_dashboard_email.value,
          this.f.notification_message.value,
          this.f.notification_message_push.value,
          this.f.notification_message_email.value,
          this.f.notification_message_browser.value,
          this.f.notification_newsfeed.value,
          this.f.notification_newsfeed_push.value,
          this.f.notification_newsfeed_email.value,
          this.f.notification_newsfeed_browser.value,
          this.f.notification_daily_email_report.value,
          this.f.notification_daily_time.value,
          this.f.notification_timeclock_timesheet_edit.value,
          this.f.notification_timeclock_checkin.value,
          this.f.notification_timeclock_checkin_define_last_minutes.value,
          this.f.notification_timeclock_checkout.value,
          this.f.notification_timeclock_checkout_define_last_minutes.value
          )
             .subscribe((result: UserResult) => {
               
       if (result.status =='success') {
        this.showMsg= true;
        this.toastr.success('Record updated successfully!', 'Done');
        this.success_message=result.message;
        // setTimeout(function() {
        //   this.showMsg = false;
        //   console.log(this.showMsg);
        // }.bind(this), 1000);
        
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


