import { Component, OnInit, Output, Input, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Group, GroupResult } from './groups.interface';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { EditGroupComponent } from './edit-group/edit-group.component';



@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  @ViewChildren(EditGroupComponent) child: EditGroupComponent;
  groups: Group[];
  loading: boolean;
  group: GroupResult;
  status: any;
  error: boolean;
  editGroupStatus: boolean = true;

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private ngxLoader: NgxUiLoaderService, private http: HttpClient) {

  }

  ngOnInit(): void {

    // this.error = this.editGroupStatus;
    // setTimeout(function() {
    //   this.error = false;
    //   console.log(this.error);
    //   }.bind(this), 2000);

    const companyID = JSON.parse(localStorage.getItem('companyID'));
    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });
    this.auth.start();
    this.loading = true;

    this.api.getGroups(companyID).subscribe((result: Group[]) => {
      this.groups = result;
      console.log(this.groups);
      this.loading = false;
    });
  }



  add_group() {
    this.router.navigate(['manage/groups/add-group']);
  }

  edit_group(group_id: number) {
    this.router.navigate(['manage/groups/edit-group', group_id]);

  }

  delete_group(id: number, i: number, name: string) {


    Swal.fire({
      title: `Are you sure?`,
      text: `You will not be able to recover this record! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'

    }).then((group) => {

      if (group.value) {
        this.api.deleteGroup(id).subscribe((result: GroupResult) => {
          this.group = result;
          this.groups.splice(i, 1);
          Swal.fire({
            title: `Deleted! ${name}`,
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
