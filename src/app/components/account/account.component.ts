import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { companyData, companyResult } from '../account/account.interface';
import Swal from 'sweetalert2';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';



const companyID = JSON.parse(localStorage.getItem('companyID'));

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  ngForm: FormGroup;
  loading: boolean;
  comp: companyData;
  company: companyData = {
    id:null,
    name:'',
    industry:''
   };
  company_delete: companyResult;
  submitted: boolean;
  sendData: boolean;
  show: boolean;
  error_message: string;
   
  constructor(private toastr: ToastrService,private ngxLoader: NgxUiLoaderService,private http: HttpClient,private _flashMessagesService: FlashMessagesService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

    this.auth.start();
    this.loading = true;
    this.api.getCompany(companyID).subscribe((result: companyData) => {
      this.comp = result;
      console.log(this.comp);
      this.loading = false;
    });

    this.ngForm = this.formBuilder.group({
      id:[null],
      name:['',Validators.required],
      industry:['',Validators.required],
    });

    this.ngxLoader.startLoader('loader-01'); // start non-master loader
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });
  }
  get f() { return this.ngForm.controls; }

  editCompany() {
    this.submitted = true;
    console.log(this.ngForm);
       // stop here if form is invalid
       if (this.ngForm.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.editCompany(this.f.id.value,this.f.name.value,this.f.industry.value)
        .subscribe((result: companyResult) => {       
       if (result.status =='success') {
          console.log('got data', result);
          
          //this._flashMessagesService.show('Company updated successfully',{ cssClass: 'alert-success' } );
          this.toastr.success('Company updated successfully!', 'Done');
          //setTimeout(()=>{
            this.router.navigate(['/account']);
          //});
         
       }
       else{
        this.error_message=result.message;
       }
       
     });
     
     }

  deleteCompany(id:number){
    Swal.fire({
      title: `Are you sure?`,
      text: `You will not be able to recover this record! `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
      
    }).then((company_delete) => {
      if (company_delete.value) {
        this.api.deleteCompany(id).subscribe((result: companyResult) => {
          this.company_delete=result;
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
