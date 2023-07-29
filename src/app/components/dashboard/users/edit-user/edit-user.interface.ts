export interface UserResult {
    status: any;
    message: string;
    access_token?: string;
}

export interface editUser {
    id:BigInt,
    companyID:BigInt,
    fname:string, 
    lname:string, 
    countryCode:string,
    telephone:string, 
    timeZone:string,
    dob:Date,
    hireDate:Date,
    email:string, 
    empID:BigInt,
    team:string, 
    position:string, 
    group:string
}

export interface User {
    id: number;
    companyID:BigInt,
    fname: string;
    lname: string;
    email: string;
    countryCode:string; 
    preference_time_format:String,
    preference_name_format:String,
    preference_csv_delimeter:String,
    preference_world_clock:BigInt,
    preference_sound_effect:BigInt,
    preference_show_other_typing:BigInt,
    preference_google_calender_sync:BigInt 
}

export interface CountryCode {
    id: number;
    name: string;
}

export interface TimeZone{
    id: number;
    name: string;
}

export interface createWages{
    [x: string]: any;  
    position_id: BigInt[];
    user_id:BigInt;
    effective_from:Date;
    wage:Float32Array;
    pay_type:string
}

export interface editWages{
    id:BigInt; 
    position_id: BigInt;
    user_id:BigInt;
    effective_from:Date;
    wage:Float32Array;
    pay_type:string
}

export interface Wage{
    id:BigInt; 
    position_id: BigInt;
    user_id:BigInt;
    effective_from:Date;
    wage:Float32Array;
    pay_type:string
}

export interface settings_preferences{
    id:BigInt,
    companyID:BigInt,
    preference_time_format:String,
    preference_name_format:String,
    preference_csv_delimeter:String,
    preference_world_clock:BigInt,
    preference_sound_effect:BigInt,
    preference_show_other_typing:BigInt,
    preference_google_calender_sync:BigInt

}

export interface settings_notifications{
    id:BigInt,
    companyID:BigInt,
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

}

