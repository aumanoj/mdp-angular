export interface companyResult {
    status: any;
    message: string;
    access_tocken?:string;
    
}

export interface companyData {
    id:number;
    name:string;
    industry:string;
    
}

export interface settings_company{
    id:BigInt,
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
   
}