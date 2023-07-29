import gql from 'graphql-tag';

export const registerData = gql`
    mutation register($fname:String!, $lname:String!, $email:String!, $password:String!, $password_confirmation:String!, $telephone:String!) {
        register(input:{fname:$fname, lname:$lname, email:$email, password:$password, password_confirmation:$password_confirmation, telephone:$telephone}) {
            status
            message
            tokens {
                access_token
                refresh_token
                token_type
                user {
                  id
                  fname
                  lname
                  email
                }
            }
        }
    }
`;

export const login = gql`
    mutation login($username: String!, $password: String!) {
        login(input:{username: $username, password: $password}) {
            status
            message
            access_token 
            refresh_token 
            token_type 
            user {id, email, fname, lname created_at, updated_at
                company {id, company_name, industry}
            }
        }
    }
`;

export const createUser = gql`
    mutation createUser($companyID:Int,$fname:String, $lname:String,
         $email:String,$countryCode:String, $telephone:String, $timeZone:String,
         $password:String, $empID:Int, $team:[String],$position:[String],$group:[String]) {
             
        createUser(companyID:$companyID,fname:$fname, lname:$lname, email:$email,
             countryCode:$countryCode,telephone:$telephone, timeZone:$timeZone, password:$password,
             empID:$empID,team:$team, position:$position, group:$group) {
            status
            message
                
        }
    }
`;

export const editUser = gql`
    mutation editUser($id:Int,$companyID:Int,$fname:String, $lname:String,$email:String,$countryCode:String, $telephone:String, $timeZone:String, $dob:Date,$hireDate:Date,$empID:Int, $team:[String],$position:[String],$group:[String]) {
        editUser(id:$id,companyID:$companyID,fname:$fname, lname:$lname,email:$email, countryCode:$countryCode, telephone:$telephone, timeZone:$timeZone,dob:$dob,hireDate:$hireDate,empID:$empID,team:$team, position:$position, group:$group) {
            status
            message
                
        }
    }
`;

export const editUserSettings = gql`
    mutation editUserSettings($id:Int,

         $preference_time_format:String, 
         $preference_name_format:String,
         $preference_csv_delimeter:String,
         $preference_world_clock:Int,
         $preference_sound_effect:Int,
         $preference_show_other_typing:Int,
         $preference_google_calender_sync:Int,
         $notification_shift_alarm:Int,
         $notification_time_before_shift:String,
         $notification_shift_push:Int,
         $notification_shift_email:Int,
         $notification_dashboard:String,
         $notification_dashboard_push:Int,
         $notification_dashboard_email:Int,
         $notification_message:String,
         $notification_message_push:Int,
         $notification_message_email:Int,
         $notification_message_browser:Int,
         $notification_newsfeed:String,
         $notification_newsfeed_push:Int,
         $notification_newsfeed_email:Int,
         $notification_newsfeed_browser:Int,
         $notification_daily_email_report:Int,
         $notification_daily_time:String,
         $notification_timeclock_timesheet_edit:Int,
         $notification_timeclock_checkin:String,
         $notification_timeclock_checkin_define_last_minutes:String,
         $notification_timeclock_checkout:String,
         $notification_timeclock_checkout_define_last_minutes:String,


         ) {


            editUserSettings(id:$id,
              
              preference_time_format:$preference_time_format,
              preference_name_format:$preference_name_format,
              preference_csv_delimeter:$preference_csv_delimeter,
              preference_world_clock:$preference_world_clock,
              preference_sound_effect:$preference_sound_effect,
              preference_show_other_typing:$preference_show_other_typing,
              preference_google_calender_sync:$preference_google_calender_sync,
              notification_shift_alarm:$notification_shift_alarm,
              notification_time_before_shift:$notification_time_before_shift,
              notification_shift_push:$notification_shift_push,
              notification_shift_email:$notification_shift_email,
              notification_dashboard:$notification_dashboard,
              notification_dashboard_push:$notification_dashboard_push,
              notification_dashboard_email:$notification_dashboard_email,
              notification_message:$notification_message,
              notification_message_push:$notification_message_push,
              notification_message_email:$notification_message_email,
              notification_message_browser:$notification_message_browser,
              notification_newsfeed:$notification_newsfeed,
              notification_newsfeed_push:$notification_newsfeed_push,
              notification_newsfeed_email:$notification_newsfeed_email,
              notification_newsfeed_browser:$notification_newsfeed_browser,
              notification_daily_email_report:$notification_daily_email_report,
              notification_daily_time:$notification_daily_time,
              notification_timeclock_timesheet_edit:$notification_timeclock_timesheet_edit,
              notification_timeclock_checkin:$notification_timeclock_checkin,
              notification_timeclock_checkin_define_last_minutes:$notification_timeclock_checkin_define_last_minutes,
              notification_timeclock_checkout:$notification_timeclock_checkout,
              notification_timeclock_checkout_define_last_minutes:$notification_timeclock_checkout_define_last_minutes

              ) {

            status
            message
                
        }
    }
`;



export const deleteUser = gql`
mutation deleteUser($id:Int) { 
    deleteUser (id:$id) {
        status
        message
    }
}
`;


export const createPosition = gql`
    mutation createPosition($name:String!,$userid:[Int],$companyID:Int!) {
        createPosition(name:$name,userid:$userid,companyID:$companyID) {
            status
            message
               
        }
    }
`;

export const editPosition = gql`
    mutation editPosition($positionid:Int!,$name:String!,$userid:[Int],$companyID:Int!) {
        editPosition(positionid:$positionid,name:$name,userid:$userid,companyID:$companyID) {
            status
            message
               
        }
    }
`;

export const deletePosition = gql`
mutation deletePosition($id:Int!){
    deletePosition(id:$id){
        status
        message
    }}
`;

export const createLocation = gql`
    mutation createTeam($name:String!,$userid:[Int],$companyID:Int!,$countryCode:String,$telephone:String,$timeZone:String) {
        createTeam(name:$name,userid:$userid,companyID:$companyID,countryCode:$countryCode,telephone:$telephone,timeZone:$timeZone) {
            status
            message
                   
        }
    }
`;

export const editLocation = gql`
    mutation editTeam($teamid:Int!,$name:String!,$userid:[Int],$companyID:Int!,$countryCode:String,$telephone:String,$timeZone:String) {
        editTeam(teamid:$teamid,name:$name,userid:$userid,companyID:$companyID,countryCode:$countryCode,telephone:$telephone,timeZone:$timeZone) {
            status
            message
                     
        }
    }
`;

export const deleteLocation = gql`
mutation deleteTeam($id:Int!){
    deleteTeam(id:$id)
    {
        status
        message
    }}
`;

export const createGroup = gql`
    mutation createGroup($name:String!,$userid:[Int],$companyID:Int!) {
        createGroup(name:$name,userid:$userid,companyID:$companyID) {
            status
            message
               
        }
    }
`;

export const editGroup = gql`
    mutation editGroup($groupid:Int!,$name:String!,$userid:[Int],$companyID:Int!) {
        editGroup(groupid:$groupid,name:$name,userid:$userid,companyID:$companyID) {
            status
            message
                
        }
    }
`;

export const deleteGroup = gql`
mutation deleteGroup($id:Int!){
    deleteGroup(id:$id)
    {
        status
        message
    }}
`;

export const createWages = gql`
    mutation createWages($position_id:[Int]!,$user_id:Int,$effective_from:Date!,$wage:Float!,$pay_type:String) {
        createWages(position_id:$position_id,user_id:$user_id,effective_from:$effective_from,wage:$wage,pay_type:$pay_type) {
            status
            message
               
        }
    }
`;

export const editWages = gql`
    mutation editWages($id:Int!,$position_id:Int!,$user_id:Int,$effective_from:Date!,$wage:Float!,$pay_type:String) {
        editWages(id:$id,position_id:$position_id,user_id:$user_id,effective_from:$effective_from,wage:$wage,pay_type:$pay_type) {
            status
            message
               
        }
    }
`;

export const deleteWages = gql`
mutation deleteWages($id:Int!){
    deleteWages(id:$id){
        status
        message
    }}
`;


export const createCompany = gql`
    mutation createCompany($name:String!,$industry:String!,$employeeRange:String!) {
        createCompany(name:$name, industry:$industry,employeeRange:$employeeRange) {
            status
            message
               
        }
    }
`;

export const editCompany = gql`
    mutation editCompany($id:Int,
      $name:String,
      $industry:String,
      $setting_operation_hours_from: String,
      $setting_operation_hours_to: String,
      $setting_enable_cutoff_time: Int,
      $setting_weekday_first: String,
      $setting_breaks: Int,
      $setting_paid_unpaid_breaks: String,
      $setting_default_break_length_min: String,
      $setting_restrict_contact_detail: Int,
      $setting_restrict_coworkers_schedule_hour: Int,
      $setting_restrict_schedule_visible_manager: Int,
      $setting_restrict_schedule_visible_manager_view: String,
      $setting_visible_location_coworkers: Int,
      $setting_message: Int,
      $setting_allow_staff_conversation: Int,
      $setting_allow_staff_converse_by: String,
      $setting_task: Int,
      $setting_newsfeed: Int,
      $setting_newsfeed_staff_allow_create: Int,
      $setting_staff_allow_shift_give_away: Int,
      $setting_staff_swap_shift: Int,
      $setting_staff_swap_shift_restrict_location_position: Int,
      $setting_staff_swap_auto_approve: Int,
      $setting_staff_unavaliability: Int,
      $setting_staff_unavaliability_auto_approve: Int
      ) {
        editCompany(id:$id,
      name:$name, 
      industry:$industry,
      setting_operation_hours_from:$setting_operation_hours_from,
      setting_operation_hours_to:$setting_operation_hours_to,
      setting_enable_cutoff_time:$setting_enable_cutoff_time,
      setting_weekday_first:$setting_weekday_first,
      setting_breaks: $setting_breaks,
      setting_paid_unpaid_breaks: $setting_paid_unpaid_breaks,
      setting_default_break_length_min:$setting_default_break_length_min,
      setting_restrict_contact_detail: $setting_restrict_contact_detail,
      setting_restrict_coworkers_schedule_hour:$setting_restrict_coworkers_schedule_hour,
      setting_restrict_schedule_visible_manager: $setting_restrict_schedule_visible_manager,
      setting_restrict_schedule_visible_manager_view: $setting_restrict_schedule_visible_manager_view,
      setting_visible_location_coworkers:$setting_visible_location_coworkers,
      setting_message:$setting_message,
      setting_allow_staff_conversation:$setting_allow_staff_conversation,
      setting_allow_staff_converse_by:$setting_allow_staff_converse_by,
      setting_task:$setting_task,
      setting_newsfeed:$setting_newsfeed,
      setting_newsfeed_staff_allow_create: $setting_newsfeed_staff_allow_create,
      setting_staff_allow_shift_give_away: $setting_staff_allow_shift_give_away,
      setting_staff_swap_shift:  $setting_staff_swap_shift,
      setting_staff_swap_shift_restrict_location_position: $setting_staff_swap_shift_restrict_location_position,
      setting_staff_swap_auto_approve:$setting_staff_swap_auto_approve,
      setting_staff_unavaliability: $setting_staff_unavaliability,
      setting_staff_unavaliability_auto_approve:  $setting_staff_unavaliability_auto_approve
            ) {
            status
            message
               
        }
    }
`;

export const deleteCompany = gql`
mutation  deleteCompany($id:Int!){
     deleteCompany(id:$id)
    {
        status
        message
    }}
`;

export const forgotPassword = gql`
mutation forgotPassword($email:String!)
{
  forgotPassword(input:{email:$email})
  {
    status,
    message
  }
}
`;

export const changePassword = gql`
mutation changePassword($oldPassword:String!,$newPassword:String!,$confirmPassword:String!)
{
  changePassword(oldPassword:$oldPassword,newPassword:$newPassword,confirmPassword:$confirmPassword)
  {
    status,
    message
  }
}
`;