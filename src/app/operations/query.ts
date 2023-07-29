import gql from 'graphql-tag';

export const meData = gql`
query meData($userID: Int)
{ 
  users (id: $userID)
  { 
    id  fname lname  company_id  status
  }
}
`;

/* 
export const meData = gql`
query {
  me {
    status
    message
    user {
      id
      name
      lastname
      email
      registerDate
    }
  }
}
`;



export const login = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    token
  }
}
`;  */

export const login = gql`
mutation login($username: String!, $password: String!) {
  login(input:{username: $username, password: $password}) {
    status,
    message,
    access_token,  
    refresh_token,  
    token_type,  
    user {id, email, fname, lname created_at, updated_at}
   }
}
`; 


export const getUsersDropdown = gql`
query {
  users (is_deleted:0){
    id
    name
    fname
    lname
  }
}
`;

export const getUsers = gql`
query($companyID:Int) {
  users (is_deleted:0,companyID:$companyID){
    id
    name
    fname
    lname
    email
    country_code
    telephone
    status
    is_deleted
    teams 
    {id, name, country_code, contact_no, time_zone, company_id},  
    positions 
    {id, name, owner_id, company_id},  
    groups  
    {id, name, owner_id, company_id}
    company
    {id, company_name, industry}
  }
}
`;

export const getUser = gql`
query getUser($id: Int) {
  users(is_deleted:0,id:$id) {
    id
    name
    fname
    lname
    email
    country_code
    telephone
    dob
    status
    emp_id
    time_zone
    hire_date
    company_id
    teams 
    {id, name, country_code, contact_no, time_zone, company_id},  
    positions 
    {id, name, owner_id, company_id},  
    groups  
    {id, name, owner_id, company_id}
    company
    {id, company_name, industry}
    preference_time_format,
    preference_name_format,
    preference_world_clock,
    preference_sound_effect,
    preference_show_other_typing,
    preference_csv_delimeter,
    preference_google_calender_sync,
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
    activity_user_ip_address,
    activity_user_last_active,
    activity_status
  }
}
`;


export const getPositions = gql`
query($companyID:Int)
{
  positions(companyID:$companyID)
        {
          id,
          name,
          owner_id
          company_id
    position_users {position_id, user_id}
        }
}
`; 

export const getPosition = gql`
query positions($id: Int)
{
  positions(id:$id)
        {
          id,
          name,
          owner_id
          company_id
          position_users {position_id, user_id}
        }
}
`; 

export const getLocations = gql`
query($companyID:Int)
{
  teams(companyID:$companyID)
  {
    id
    name
    owner_id
    company_id
    time_zone
    country_code
    contact_no
    team_users{team_id, user_id}
  }
}
`; 

export const getLocation = gql`
query teams($id: Int)
{
  teams (id: $id)
  {
    id
    name
    owner_id
    company_id
    time_zone
    country_code
    contact_no
    team_users{team_id, user_id}
  }
}
`; 

export const getGroups = gql`
query($companyID:Int)
{
  groups(companyID:$companyID)
  {
    id,
    name,
    owner_id,
    company_id
    group_users
    {group_id, user_id}
  }
}
`; 

export const getGroup = gql`
query($id:Int)
{
  groups(id:$id)
  {
    id,
    name,
    owner_id,
    company_id
    group_users
    {group_id, user_id}
  }
}
`; 

export const getCountryCodes = gql`
query{
  countrycodes
  { id, 
    name, 
    phonecode
  }
}
`; 

export const getTimeZones = gql`
query{
  timezones 
  { id, 
    id_name, 
    name
  }
}
`; 

export const getWage= gql`
query($userID:Int)
{
wages(userID: $userID)
  {
  id,
  employee_id,
  position_id,
  effective_from,
  wage,
  pay_type,
  created_By,
  created_at,
  updated_at 
  } 
 }
`; 

export const getWages= gql`
query
{
wages
  {
  id,
  employee_id,
  position_id,
  effective_from,
  wage,
  pay_type,
  created_By,
  created_at,
  updated_at 
  } 
 }
`; 


export const getCompany = gql`
query($id:Int)
{
  companies(isDeleted:0,id:$id)
  {
  id,
  company_name,
  industry,
  employee_range,
  created_at,
  updated_at,
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
}
`;