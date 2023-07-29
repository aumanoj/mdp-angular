import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { companyData, companyResult } from './company.interface';
import { PositionResult, createPosition,User } from '../dashboard/positions/add-position/add-position.interface';
import { ToastrService } from 'ngx-toastr';


declare  var jQuery:  any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  ngForm: FormGroup;
  ngForm_addPosition: FormGroup;
  complete: boolean;
  operation: number;
  message: string;
  company: companyData = {
   name:'',
   industry:'',
   employeeRange:''
  };

  add_position: createPosition={
    name:'',
    userid:null,
    companyID:null,
  }
  submitted: boolean;
  sendData: boolean;
  show: boolean;
  error_message: any;

  constructor(private toastr: ToastrService,private _flashMessagesService: FlashMessagesService,private formBuilder: FormBuilder,private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.ngForm = this.formBuilder.group({
      name:['',Validators.required],
      industry:['',Validators.required],
      employeeRange: ['', Validators.required],
    });
    this.ngForm_addPosition = this.formBuilder.group({
      name: ['', Validators.required],
      userid: [null],
      companyID:[1, Validators.required]   
  });

  }

  get f() { return this.ngForm.controls; }

  get fn() { return this.ngForm_addPosition.controls; }

  company_reg() {
    this.submitted = true;
    console.log(this.ngForm);
       // stop here if form is invalid
       if (this.ngForm.invalid) {
           return;
       }
     this.sendData = true;
     this.show = false;
     this.api.createCompany(this.f.name.value,this.f.industry.value,this.f.employeeRange.value)
        .subscribe((result: companyResult) => {       
       if (result.status =='success') {
          console.log('got data', result);
          
          //this._flashMessagesService.show('Company created successfully',{ cssClass: 'alert-success' } );
          this.toastr.success('Company created successfully!', 'Done');
          //setTimeout(()=>{
            this.router.navigate(['/dashboard']);
          //});
         
       }
       else{
        this.error_message=result.message;
       }
       
     });
     
     }

    //  position_save() {
    //   this.submitted = true;
    //   console.log(this.ngForm_addPosition);
    //      // stop here if form is invalid
    //      if (this.ngForm_addPosition.invalid) {
    //          return;
    //      }
    //    this.sendData = true;
    //    this.show = false;
    //    this.api.createPosition(this.f.name.value,this.f.userid.value,this.f.companyID.value)
    //            .subscribe((result: PositionResult) => {
    //      if (result.status =='success') {
    //       this._flashMessagesService.show('Record saved successfully',{ cssClass: 'alert-success' } );
    //       setTimeout(()=>{
    //         this.router.navigate(['/dashboard']);
    //       },3000);
    //      }
    //      else{
    //       this.error_message=result.message;
    //      } 
    //    });
  
    //    }

 
}
