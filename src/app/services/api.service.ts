import { Injectable, Query } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, meData,getPositions ,getLocations,getGroups,getUser,getPosition,getLocation,getGroup,getUsersDropdown,getCountryCodes,
        getTimeZones,getWage,getCompany,getWages} from '../operations/query';
import { map } from 'rxjs/operators';
import { RegisterData } from '../components/register/register.interface';
import { registerData, login, createUser, createPosition,createLocation,createGroup,editUser,deleteUser,deletePosition,editPosition,
        deleteLocation,editLocation,editGroup,deleteGroup,createWages,createCompany,editCompany,deleteCompany,forgotPassword, 
        editUserSettings,changePassword,deleteWages,editWages} from '../operations/mutation';
import { CreateUser } from '../components/dashboard/users/add-user/add-user.interface';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService { 
  [x: string]: any;


  constructor(private apollo: Apollo) { }


  registerData(fname:string,lname:string,email:string,password:string,password_confirmation:string,telephone:string) {
    return this.apollo
      .mutate({
        mutation: registerData,
        variables: {
          fname,
          lname,
          email,
          password,
          password_confirmation,
          telephone
        }
      }).pipe(map(result => {
       return registerReturn(result);
      }));
  }


  login(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: login,
        variables: {
          username,
          password
        }
      }).pipe(map(result => {
    //   console.log(result.data.login);
    //   // return result.data;
    //  return result.data.login;

     return loginReturn(result);

    }));
  }  

  forgotPassword(email:string) {
    return this.apollo
      .mutate({
        mutation: forgotPassword,
        variables: {
          email
        }
      }).pipe(map(result => {
   

     return forgotPasswordReturn(result);

    }));
  }

  changePassword(oldPassword:string,newPassword:string,confirmPassword:string) {
    return this.apollo
      .mutate({
        mutation:changePassword,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          oldPassword,
          newPassword,
          confirmPassword
        }
      }).pipe(map(result => {
        
       return changePasswordReturn(result); 
      }));
  } 

   // Lista de usuarios
  getUsersDropdown() {
    return this.apollo
    .watchQuery(
      {
        query: getUsersDropdown,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }


  // Lista de usuarios
  getUsers(companyID:number) {
    return this.apollo
    .watchQuery(
      {
        query: getUsers,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          companyID
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }

  getUser(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: getUser,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }

  /*deleteUser(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: deleteUser,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      console.log(result);
      return result.data.deleteUser;
    }));
  }*/

  deleteUser(id:number) {
    return this.apollo
      .mutate(
        {
        mutation: deleteUser,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
      ).pipe(map((result: any) => {
        return result.data.deleteUser;
      }));
  } 



  // Login
  /*   login(email: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.login;
    }));
  } */




  // Login
  /* login(username: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          username,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      console.log(result.data.login);
      // return result.data;
     return result.data.login;
    }));
  }  */



  createUser(companyID:BigInt,fname:string, lname:string, email:string, countryCode:string,telephone:string, timeZone:string, password:string,empID:BigInt,team:string ,position:string, group:string) {
    return this.apollo
      .mutate({
        mutation: createUser,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          companyID,
          fname,
          lname,
          email,
          countryCode,
          telephone,
          timeZone,
          password,
          empID,
          team,
          position,
          group
        }
      }).pipe(map(result => {
        //console.log(result.data.createUser);
        // return result.data;
       return createUserReturn(result);
      }));
  }  

  editUser(id:BigInt,companyID:BigInt,fname:string, lname:string,email:string,countryCode:string, telephone:string, 
    timeZone:string,dob:Date,hireDate:Date,empID:BigInt,team:string ,position:string, group:string) {
    return this.apollo
      .mutate({
        mutation: editUser,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id,
          companyID,
          fname,
          lname,
          email,
          countryCode,
          telephone,
          dob,
          hireDate,
          timeZone,
          empID,
          team,
          position,
          group,
        }
      }).pipe(map(result => {
       return editUserReturn(result);
      }));

  }  

  settings_preferences(id:BigInt,preference_time_format:string, preference_name_format:string,preference_csv_delimeter:string,
                  preference_world_clock:BigInt,preference_sound_effect:BigInt,preference_show_other_typing:BigInt,preference_google_calender_sync:BigInt) {
    return this.apollo
      .mutate({
        mutation: editUserSettings,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id,
          preference_time_format,
          preference_name_format,
          preference_csv_delimeter,
          preference_world_clock,
          preference_sound_effect,
          preference_show_other_typing,
          preference_google_calender_sync
        }
      }).pipe(map(result => {
       return settings_preferencesReturn(result);
      }));

  }  

  settings_notifications(
    id:BigInt,
    notification_shift_alarm: BigInt,
      notification_time_before_shift: String,
      notification_shift_sms: BigInt,
      notification_shift_push: BigInt,
      notification_shift_email: BigInt,
      notification_dashboard: String,
      notification_dashboard_push: BigInt,
      notification_dashboard_email: BigInt,
      notification_message: String,
      notification_message_push: BigInt,
      notification_message_email: BigInt,
      notification_message_browser: BigInt,
      notification_newsfeed: String,
      notification_newsfeed_push: BigInt,
      notification_newsfeed_email: BigInt,
      notification_newsfeed_browser: BigInt,
      notification_daily_email_report: BigInt,
      notification_daily_time: String,
      notification_timeclock_timesheet_edit: BigInt,
      notification_timeclock_checkin: String,
      notification_timeclock_checkin_define_last_minutes: String,
      notification_timeclock_checkout: String,
      notification_timeclock_checkout_define_last_minutes: String,
    ) {
return this.apollo
.mutate({
mutation: editUserSettings,
context: {
headers: new HttpHeaders({
authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
})
},
variables: {
id,
notification_shift_alarm,
    notification_time_before_shift,
    notification_shift_sms,
    notification_shift_push,
    notification_shift_email,
    notification_dashboard,
    notification_dashboard_push,
    notification_dashboard_email,
    notification_message,
    notification_message_push,
    notification_message_email,
    notification_message_browser,
    notification_newsfeed,
    notification_newsfeed_push,
    notification_newsfeed_email,
    notification_newsfeed_browser,
    notification_daily_email_report,
    notification_daily_time,
    notification_timeclock_timesheet_edit,
    notification_timeclock_checkin,
    notification_timeclock_checkin_define_last_minutes,
    notification_timeclock_checkout,
    notification_timeclock_checkout_define_last_minutes,

}
}).pipe(map(result => {
return settings_notificationsReturn(result);
}));

}

  getPositions(companyID) {
    return this.apollo
    .watchQuery(
      {
        query: getPositions,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          companyID
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.positions;
    }));
  }

  getPosition(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: getPosition,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          id
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.positions;
    }));
  }

  createPosition(name:string,userid:BigInt,companyID:BigInt) {
    return this.apollo
      .mutate({
        mutation: createPosition,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          name,
          userid,
          companyID
        }
      }).pipe(map(result => {
        //console.log(result.data.createPosition);
        // return result.data;
       return createPositionReturn(result); 
      }));
  }  

  editPosition(positionid:BigInt,name:string,userid:BigInt,companyID:BigInt) {
    return this.apollo
      .mutate({
        mutation: editPosition,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          positionid,
          name,
          userid,
          companyID
        }
      }).pipe(map(result => {
        //console.log(result.data.createPosition);
        // return result.data;
       return editPositionReturn(result); 
      }));
  } 
  
  deletePosition(id:number) {
    return this.apollo
    .mutate(
      {
      mutation: deletePosition,
      context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).pipe(map((result: any) => {
      return result.data.deletePosition;
    }));
  }

  getLocations(companyID) {
    return this.apollo
    .watchQuery(
      {
        query: getLocations,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          companyID
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.teams;
    }));
  }

  getLocation(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: getLocation,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          id
        }

      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.teams;
    }));
  }

  createLocation(name:string,userid:BigInt,companyID:BigInt,countryCode:string,telephone:string,timeZone:string) {
    return this.apollo
      .mutate({
        mutation: createLocation,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          name,
          userid,
          companyID,
          countryCode,
          telephone,
          timeZone
        }
      }).pipe(map(result => {
        //console.log(result.data.createPosition);
        // return result.data;
       return createLocationReturn(result); 
      }));
  }  

  editLocation(teamid:BigInt,name:string,userid:BigInt,companyID:BigInt,countryCode:string,telephone:string,timeZone:string) {
    return this.apollo
      .mutate({
        mutation: editLocation,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          teamid,
          name,
          userid,
          companyID,
          countryCode,
          telephone,
          timeZone
        }
      }).pipe(map(result => {
        //console.log(result.data.createPosition);
        // return result.data;
       return editLocationReturn(result); 
      }));
  }  

  deleteLocation(id:number) {
    return this.apollo
    .mutate(
      {
      mutation: deleteLocation,
      context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).pipe(map((result: any) => {
      return result.data.deleteTeam;
    }));
  }

  getGroups(companyID) {
    return this.apollo
    .watchQuery(
      {
        query: getGroups,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          companyID
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.groups;
    }));
  }

  getGroup(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: getGroup,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          id
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.groups;
    }));
  }


  createGroup(name:string,userid:BigInt,companyID:BigInt) {
    return this.apollo
      .mutate({
        mutation: createGroup,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          name,
          userid,
          companyID
        }
      }).pipe(map(result => {
        
       return createGroupReturn(result); 
      }));
  }  

  editGroup(groupid:BigInt,name:string,userid:BigInt,companyID:BigInt) {
    return this.apollo
      .mutate({
        mutation: editGroup,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          groupid,
          name,
          userid,
          companyID
        }
      }).pipe(map(result => {
       return editGroupReturn(result); 
      }));
  }  

  deleteGroup(id:number) {
    return this.apollo
    .mutate(
      {
      mutation: deleteGroup,
      context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).pipe(map((result: any) => {
      return result.data.deleteGroup;
    }));
  }

  getCountryCodes() {
    return this.apollo
    .watchQuery(
      {
        query: getCountryCodes,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.countrycodes;
    }));
  }

  getTimeZones() {
    return this.apollo
    .watchQuery(
      {
        query: getTimeZones,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.timezones;
    }));
  }

  getWage(userID:number) {
    return this.apollo
    .watchQuery(
      {
        query: getWage,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          userID
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.wages;
    }));
  }

  getWages() {
    return this.apollo
    .watchQuery(
      {
        query: getWages,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.wages;
    }));
  }

  createWages(position_id:BigInt,user_id:BigInt,effective_from:Date,wage:Float32Array,pay_type:String) {
    return this.apollo
      .mutate({
        mutation:createWages,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          position_id,
          user_id,
          effective_from,
          wage,
          pay_type
        }
      }).pipe(map(result => {
        
       return createWagesReturn(result); 
      }));
  } 

  editWages(id:BigInt,position_id:BigInt,user_id:BigInt,effective_from:Date,wage:Float32Array,pay_type:String) {
    return this.apollo
      .mutate({
        mutation:editWages,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id,
          position_id,
          user_id,
          effective_from,
          wage,
          pay_type
        }
      }).pipe(map(result => {
        
       return editWagesReturn(result); 
      }));
  } 

  deleteWage(id:number) {
    return this.apollo
    .mutate(
      {
      mutation: deleteWages,
      context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).pipe(map((result: any) => {
      return result.data.deleteCompany;
    }));
  }

  createCompany(name:string,industry:string,employeeRange:string) {
    return this.apollo
      .mutate({
        mutation:createCompany,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          name,
          industry,
          employeeRange
        }
      }).pipe(map(result => {
        
       return createCompanyReturn(result); 
      }));
  } 

  editCompany(id:BigInt,name:string,industry:string) {
    return this.apollo
      .mutate({
        mutation:editCompany,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id,
          name,
          industry
        }
      }).pipe(map(result => {
        
       return editCompanyReturn(result); 
      }));
  } 

  settings_company(id:BigInt,
      setting_operation_hours_from: String,
      setting_operation_hours_to: String,
      setting_enable_cutoff_time: BigInt,
      setting_weekday_first: String,
      setting_breaks: BigInt,
      setting_paid_unpaid_breaks: String,
      setting_default_break_length_min: String,
      setting_restrict_contact_detail: BigInt,
      setting_restrict_coworkers_schedule_hour: BigInt,
      setting_restrict_schedule_visible_manager: BigInt,
      setting_restrict_schedule_visible_manager_view: String,
      setting_visible_location_coworkers: BigInt,
      setting_message: BigInt,
      setting_allow_staff_conversation: BigInt,
      setting_allow_staff_converse_by: String,
      setting_task: BigInt,
      setting_newsfeed: BigInt,
      setting_newsfeed_staff_allow_create: BigInt,
      setting_staff_allow_shift_give_away: BigInt,
      setting_staff_swap_shift: BigInt,
      setting_staff_swap_shift_restrict_location_position: BigInt,
      setting_staff_swap_auto_approve: BigInt,
      setting_staff_unavaliability: BigInt,
      setting_staff_unavaliability_auto_approve: BigInt
    ) {
    return this.apollo
      .mutate({
        mutation:editCompany,
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
      id,
      setting_operation_hours_from,
      setting_operation_hours_to,
      setting_enable_cutoff_time,
      setting_weekday_first,
      setting_breaks,
      setting_paid_unpaid_breaks,
      setting_default_break_length_min,
      setting_restrict_contact_detail,
      setting_restrict_coworkers_schedule_hour,
      setting_restrict_schedule_visible_manager,
      setting_restrict_schedule_visible_manager_view,
      setting_visible_location_coworkers,
      setting_message,
      setting_allow_staff_conversation,
      setting_allow_staff_converse_by,
      setting_task,
      setting_newsfeed,
      setting_newsfeed_staff_allow_create,
      setting_staff_allow_shift_give_away,
      setting_staff_swap_shift,
      setting_staff_swap_shift_restrict_location_position,
      setting_staff_swap_auto_approve,
      setting_staff_unavaliability,
      setting_staff_unavaliability_auto_approve
         
        }
      }).pipe(map(result => {
        
       return settings_companyReturn(result); 
      }));
  } 


  getCompany(id:number) {
    return this.apollo
    .watchQuery(
      {
        query: getCompany,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables:{
          id
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.companies;
    }));
  }

  deleteCompany(id:number) {
    return this.apollo
    .mutate(
      {
      mutation: deleteCompany,
      context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        },
        variables: {
          id
        }
      }
    ).pipe(map((result: any) => {
      return result.data.deleteCompany;
    }));
  }


}//end class



function registerReturn(result): any {
  console.log(result.data.register);
  return result.data.register;
}



function createUserReturn(result): any {
  console.log(result.data.createUser);
  return result.data.createUser;
}

function editUserReturn(result): any {
  console.log(result.data.editUser);
  return result.data.editUser;
}

function settings_preferencesReturn(result): any {
  console.log(result.data.editUserSettings);
  return result.data.editUserSettings;
}

function settings_notificationsReturn(result): any {
  console.log(result.data.editUserSettings);
  return result.data.editUserSettings;
}

function createPositionReturn(result): any {
  console.log(result.data.createPosition);
  return result.data.createPosition;
}

function editPositionReturn(result): any {
  console.log(result.data.editPosition);
  return result.data.editPosition;
}

function loginReturn(result): any {
  console.log(result.data.login);
  return result.data.login;
}

function forgotPasswordReturn(result): any {
  console.log(result.data.forgotPassword);
  return result.data.forgotPassword;
}

function changePasswordReturn(result): any {
  console.log(result.data.changePassword);
  return result.data.changePassword;
}

function createLocationReturn(result): any {
  console.log(result.data.createTeam);
  return result.data.createTeam;
}

function editLocationReturn(result): any {
  console.log(result.data.editTeam);
  return result.data.editTeam;
}

function createGroupReturn(result): any {
  console.log(result.data.createGroup);
  return result.data.createGroup;
}

function editGroupReturn(result): any {
  console.log(result.data.editGroup);
  return result.data.editGroup;
}

function createWagesReturn(result): any {
  console.log(result.data.createWages);
  return result.data.createWages;
}
function editWagesReturn(result): any {
  console.log(result.data.editWages);
  return result.data.editWages;
}

function createCompanyReturn(result): any {
  console.log(result.data.createCompany);
  return result.data.createCompany;
}

function editCompanyReturn(result): any {
  console.log(result.data.editCompany);
  return result.data.editCompany;
}

function settings_companyReturn(result): any {
  console.log(result.data.editCompany);
  return result.data.editCompany;
}