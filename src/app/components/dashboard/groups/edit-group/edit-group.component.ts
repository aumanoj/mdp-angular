import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeData } from '../../../me/me.interface';
import { GroupResult, editGroup, User } from './edit-group.interface';
import { Group } from '../groups.interface';
import Swal from 'sweetalert2';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  editGroupStatus = true;

  ngForm_editGroup: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  //  error = '';
  sendData: boolean;
  error: any;
  show: boolean;
  error_message: string;
  edit_group: editGroup = {
    groupid: null,
    name: '',
    userid: null,
    companyID: null,

  }
  users: User[];
  id: number;
  group: Group[];
  grp: any[];
  seluser: any = [];



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
      this.api.getGroup(this.id).subscribe((result: Group[]) => {
        this.group = result;
        this.grp = this.group[0].group_users;
        for (let g of this.grp) {

          this.seluser.push(g.user_id);

        }
        console.log(this.seluser);
        //  console.log(this.group);
      });

      console.log(this.id);

    });

    this.ngForm_editGroup = this.formBuilder.group({
      groupid: [null],
      name: ['', Validators.required],
      userid: [null, Validators.required],
      companyID: [companyID]
    });
    this.api.getUsers(companyID).subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
      this.loading = false;
    });
  }

  cancelEdit() {
    this.router.navigate(['manage/groups']);
  }

  groups() {
    this.router.navigate(['manage/groups']);
  }

  get f() { return this.ngForm_editGroup.controls; }



  update() {

    //form validation Error Scroll
    const firstElementWithError = document.querySelector('.ng-invalid');
    if (firstElementWithError) {
      firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    }

    this.submitted = true;
    console.log(this.ngForm_editGroup);
    // stop here if form is invalid
    if (this.ngForm_editGroup.invalid) {
      return;
    }
    this.sendData = true;
    this.show = false;
    this.api.editGroup(this.f.groupid.value, this.f.name.value, this.f.userid.value, this.f.companyID.value)
      .subscribe((result: GroupResult) => {
        if (result.status == 'success') {
          //this._flashMessagesService.show('Record updated successfully', { cssClass: 'alert-success' });
          this.toastr.success('Record updated successfully!','Done');
          //setTimeout(() => {
            this.router.navigate(['manage/groups']);

          //}, 1000);
          //  this.router.navigate(['manage/groups']);
          //  Swal.fire({
          //   text: 'Record updated successfully',
          //   icon: 'success',
          //   timer: 3000, 
          //   showConfirmButton: false
          // })

        }
        else {
          //  Swal.fire({
          //   title:'Failed',
          //   text: 'Group Update Failed!',
          //   icon: 'error',
          //   timer: 3000, 
          //   showConfirmButton: false
          // })
          this.error = true;
          window.scrollTo(0, 0)
          this.error_message = result.message;
          setTimeout(function () {
            this.error = false;
            console.log(this.error);
          }.bind(this), 8000);
        }

      });

  }

}
