import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { User,createWages } from './edit-user.interface';
import {Position,Location } from '../add-user/add-user.interface';
import { FlashMessagesService } from 'angular2-flash-messages';


declare  var jQuery:  any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

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
  
  

  constructor(private _flashMessagesService: FlashMessagesService, private formBuilder: FormBuilder,private api: ApiService, private router:Router, private auth: AuthService,private activatedRoute: ActivatedRoute) {
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
    window.setTimeout(function() {
      $(".alert").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove(); 
      });
  }, 2000);

 

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

    console.log(this.id);
        
  }

    

    edit_user(userid:number){
      this.router.navigate(['manage/users/profile/edit-profile',userid]);
    }
     add_Wage(userid:number){
      this.router.navigate(['manage/users/profile/wage',userid]);
    }

    add_unavailability(userid:number){
      this.router.navigate(['manage/users/profile/unavailability',userid]);
    }
     
    add_note(userid:number){
      this.router.navigate(['manage/users/profile/note',userid]);
    }
}


