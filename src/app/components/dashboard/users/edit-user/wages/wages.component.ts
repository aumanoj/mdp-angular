import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../../me/me.interface';
import { editUser, UserResult, User, CountryCode, TimeZone, createWages } from '../../../../dashboard/users/edit-user/edit-user.interface';
import Swal from 'sweetalert2';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wages',
  templateUrl: './wages.component.html',
  styleUrls: ['./wages.component.css']
})
export class WagesComponent implements OnInit {
  
  selected = [];
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  ngForm_createWage: FormGroup;
  add_wage: createWages = {
    position_id: null,
    user_id: null,
    effective_from: null,
    wage: null,
    pay_type: ''

  }
  id: any;
  user: User;
  countryCodes: any[];
  positions: Position[];
  locations: Location[];
  groups: any[];
  showMsg: boolean;

  wages: createWages;

  public addrates: any[] = [{
    effective_from: '',
    wage: ''

  }];
  wage: UserResult;
  pos: any;
  selposition: any=[];
  isShown:boolean=false;

  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService, private formBuilder: FormBuilder, private api: ApiService, private router: Router, private auth: AuthService, private activatedRoute: ActivatedRoute) {
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
        this.pos = this.user[0].positions;
        for (let p of this.pos) {
          this.selposition.push(p.id);
        }
        console.log(this.selposition);
      });

      this.api.getWage(this.id).subscribe((result: createWages) => {
        this.wages = result;
        console.log(this.wages);
      });

    });

    this.api.getPositions(companyID).subscribe((result: Position[]) => {
      this.positions = result;
      //console.log(items);
      console.log(this.positions);

    });

    this.ngForm_createWage = this.formBuilder.group({
      position_id: [null],
      user_id: [null],
      effective_from: [null, Validators.required],
      wage: [null, Validators.required],
      pay_type: ['', Validators.required]
    });

  }

  /* fields repeater*/

  addRate() {
    this.addrates.push({
      id: this.addrates.length + 1,
      effective_from: '',
      wage: ''

    });
  }

  removeAddRate(i: number) {
    this.addrates.splice(i, 1);
  }

  //end repeater

  get f_wage() { return this.ngForm_createWage.controls; }

  create_wage() {
    this.submitted = true;
    console.log(this.ngForm_createWage);
    // stop here if form is invalid
    if (this.ngForm_createWage.invalid) {
      return;
    }
    this.sendData = true;
    this.show = false;

    this.api.createWages(this.f_wage.position_id.value, this.f_wage.user_id.value, this.f_wage.effective_from.value, this.f_wage.wage.value, this.f_wage.pay_type.value)
      .subscribe((result: UserResult) => {

        if (result.status == 'success') {
          this.showMsg = true;
          //this._flashMessagesService.show(' Wage added successfully', { cssClass: 'alert-success' });
          this.toastr.success(' Wage added successfully!', 'Done');
          //setTimeout(() => {
            this.router.navigate(['manage/users']);
          //}, 1000);
        }
        else {

          this.error_message = result.message;
          this.showMsg = false;
        }

      });
  }

  edit_wage(wageid:number){
    this.router.navigate(['manage/users/profile/edit-profile/edit-wage',wageid]);
   
  }

  delete_wage(id:number,i:number){
    Swal.fire({
      title: `Are you sure?`,
      text: `You will not be able to recover this record! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      
    }).then((wage) => {
      if (wage.value) {
        this.api.deleteWage(id).subscribe((result: UserResult) => {
          this.wage=result;
        this.wages.splice(i, 1);
        Swal.fire({
          title:`Deleted!`,
          text: 'Your record has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false 
        })
      });
      } else if (Swal.DismissReason.cancel) {
        Swal.fire(
          'Keep it',
          'Your record is safe :)',
          
        )
      }
    })
    
    }

}
