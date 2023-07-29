import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Position } from './positions.interface';
import { MeData } from '../../me/me.interface';
import { PositionResult } from './add-position/add-position.interface';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Position[];
  loading: boolean;
  position: PositionResult;

  constructor(private api: ApiService, private auth: AuthService,private router: Router,private ngxLoader: NgxUiLoaderService,private http: HttpClient) { }
  add_position(){
    this.router.navigate(['manage/positions/add-position']);
}

ngOnInit(): void {

  const companyID = JSON.parse(localStorage.getItem('companyID'));
  this.ngxLoader.startLoader('loader-01'); // start non-master loader
  this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
    console.log(res);
    this.ngxLoader.stopLoader('loader-01');
  });
  this.auth.start();
  this.loading = true;
  this.api.getPositions(companyID).subscribe((result: Position[]) => {
    this.positions = result;
    console.log(this.positions);
    this.loading = false;
  });
}

edit_position(position_id:number){
  this.router.navigate(['manage/positions/edit-position',position_id]);
 
}

 delete_position(id:number,i:number,name:string){


Swal.fire({
  title: `Are you sure?`,
  text: `You will not be able to recover this record! `,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
  
}).then((position) => {
  if (position.value) {
    this.api.deletePosition(id).subscribe((result: PositionResult) => {
      this.position=result;
    this.positions.splice(i, 1);
    Swal.fire({
      title:`Deleted! ${name}`,
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
