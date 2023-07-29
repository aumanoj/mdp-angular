import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  account(){
    this.router.navigate(['/account']);
  }

  billing(){
    this.router.navigate(['/account/billing']);
  }

  invoice(){
    this.router.navigate(['/account/invoice']);
  }

}
