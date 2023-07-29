import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User,UserResult } from './user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../../me/me.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { title } from 'process';
import { type } from 'jquery';


import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];
  loading: boolean;
  error: any;
  user: UserResult;

 

  
  constructor(private api: ApiService, private auth: AuthService,private router: Router,private ngxLoader: NgxUiLoaderService,private http: HttpClient) { }


  ngOnInit() {

    // window.setTimeout(function() {
    //   $(".alert").fadeTo(500, 0.8).slideUp(500, function(){
    //       $(this).remove(); 
    //   });
    // }, 2000);

    const companyID = JSON.parse(localStorage.getItem('companyID'));

    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });

    this.auth.start();
    this.loading = true;
    this.api.getUsers(companyID).subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
      this.loading = false;
    });

  }


  add_user(){
    this.router.navigate(['manage/users/add-user']);
  }
  edit_user(userid:number){
       this.router.navigate(['manage/users/profile/edit-profile',userid]);   
  }

  delete_user(userid:number,username:string,i: number){
    
    Swal.fire({
      title: `Are you sure?`,
      text: `You will not be able to recover this record! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      
    }).then((user) => {
      if (user.value) {
        this.api.deleteUser(userid).subscribe((result: UserResult) => {
          this.user=result;
        this.users.splice(i, 1);
        Swal.fire({
          title:`Deleted! ${username}`,
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
