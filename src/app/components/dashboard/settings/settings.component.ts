import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  dashboard(){
    this.router.navigate(['/dashboard']);
  }

  preferences(){
    this.router.navigate(['settings/preferences']);
  }

  notifications(){
    this.router.navigate(['settings/notifications']);
  }

  schedule(){
    this.router.navigate(['settings/schedule-intervals']);
  }

  company_settings(){
    this.router.navigate(['settings/company-settings']);
  }

  time_clock(){
    this.router.navigate(['settings/time-clock']);
  }

  labor_cost(){
    this.router.navigate(['settings/labor-cost']);
  }

  time_off(){
    this.router.navigate(['settings/time-off']);
  }

  account_activity(){
    this.router.navigate(['settings/account-activity']);
  }

  integrations(){
    this.router.navigate(['settings/integrations']);
  }

}
