import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';
declare  var jQuery:  any;

@Component({
  selector: 'app-left-inner-menu',
  templateUrl: './left-inner-menu.component.html',
  styleUrls: ['./left-inner-menu.component.css']
})
export class LeftInnerMenuComponent implements OnInit {

	// user: any;
  constructor(private router: Router) {
   }

	
  ngOnInit() {

  	(function ($) {

       $(document).ready(function(){
          $('#dashboardinid').trigger('click');
        }); 

	})(jQuery)
  
  }

}
