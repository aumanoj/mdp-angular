import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location,LocationResult } from './locations.interface';
import { MeData } from '../../me/me.interface';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations: Location[];
  loading: boolean;
  location: LocationResult;

  
  

  constructor(private api: ApiService, private auth: AuthService,private router: Router,private ngxLoader: NgxUiLoaderService,private http: HttpClient) { }
  
  ngOnInit(): void {

    const companyID = JSON.parse(localStorage.getItem('companyID'));
    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });

    this.auth.start();
    this.loading = true;
    this.api.getLocations(companyID).subscribe((result: Location[]) => {
      this.locations = result;
      console.log(this.locations);
      this.loading = false;
    });
  }
  add_location(){
    this.router.navigate(['manage/locations/add-location']);
  }

  edit_location(location_id:number){
    this.router.navigate(['manage/locations/edit-location',location_id]);
   
  }

  delete_location(id:number,i:number,name:string){
    
    Swal.fire({
      title: `Are you sure?`,
      text: `You will not be able to recover this record! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      
    }).then((location) => {
      if (location.value) {
        this.api.deleteLocation(id).subscribe((result: LocationResult) => {
          this.location=result;
        this.locations.splice(i, 1);
        Swal.fire({
          title:`Deleted! ${name}`,
          text: 'Your record has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false 
        })
      });
      } else if ( Swal.DismissReason.cancel) {
        Swal.fire(
          'Keep it',
          'Your record is safe :)',
          
        )
      }
    })
  
  }

  

}
