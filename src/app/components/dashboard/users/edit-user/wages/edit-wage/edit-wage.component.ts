import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../../../me/me.interface';
import { editUser, UserResult, User, CountryCode, TimeZone, createWages,editWages,Wage } 
from '../../../../../dashboard/users/edit-user/edit-user.interface';
import Swal from 'sweetalert2';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-wage',
  templateUrl: './edit-wage.component.html',
  styleUrls: ['./edit-wage.component.css']
})
export class EditWageComponent implements OnInit {
 
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  ngForm_editWage: FormGroup;
  edit_wages: editWages = {
    id:null,
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
  wages: Wage[];
  wage: any;

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
      // this.api.getUser(this.id).subscribe((result: User) => {
      //   this.user = result;
      // });

      this.api.getWages().subscribe((result: Wage[]) => {
        this.wages = result;
        for (let w of this.wages) {
          this.id==w.id;
        }
        console.log(this.id);
      });

    });

    this.api.getPositions(companyID).subscribe((result: Position[]) => {
      this.positions = result;
      //console.log(items);
      console.log(this.positions);

    });

    this.ngForm_editWage = this.formBuilder.group({
      id:[null],
      position_id: [null],
      user_id: [null],
      effective_from: [null, Validators.required],
      wage: [null, Validators.required],
      pay_type: ['', Validators.required]
    });

  }

  get f_wage() { return this.ngForm_editWage.controls; }

  employees(){
    this.router.navigate(['manage/users']);
  }

  cancel(){
      this.router.navigate(['manage/users']);
    
  }

  update() {
    this.submitted = true;
    console.log(this.ngForm_editWage);
    // stop here if form is invalid
    if (this.ngForm_editWage.invalid) {
      return;
    }
    this.sendData = true;
    this.show = false;

    this.api.editWages(this.f_wage.id.value,this.f_wage.position_id.value, this.f_wage.user_id.value, this.f_wage.effective_from.value, this.f_wage.wage.value, this.f_wage.pay_type.value)
      .subscribe((result: UserResult) => {

        if (result.status == 'success') {
          this.showMsg = true;
          //this._flashMessagesService.show(' Wage Updated successfully', { cssClass: 'alert-success' });
          this.toastr.success('Wage Updated successfully!', 'Done');
          //setTimeout(() => {
            this.router.navigate(['manage/users']);
         // }, 1000);
        }
        else {
          this.error_message = result.message;
          this.showMsg = false;
        }

      });
  }


}
