import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
//import { UsersComponent } from './components/users/users.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardsService } from './guards/auth-guards.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { PositionsComponent } from './components/dashboard/positions/positions.component';
import { LocationsComponent } from './components/dashboard/locations/locations.component';
import { GroupsComponent } from './components/dashboard/groups/groups.component';
import { AddUserComponent } from './components/dashboard/users/add-user/add-user.component';
import { AddPositionComponent } from './components/dashboard/positions/add-position/add-position.component';
import { AddLocationComponent } from './components/dashboard/locations/add-location/add-location.component';
import { AddGroupComponent } from './components/dashboard/groups/add-group/add-group.component';
import { EditUserComponent } from './components/dashboard/users/edit-user/edit-user.component';
import { EditPositionComponent } from './components/dashboard/positions/edit-position/edit-position.component';
import { EditLocationComponent } from './components/dashboard/locations/edit-location/edit-location.component';
import { EditGroupComponent } from './components/dashboard/groups/edit-group/edit-group.component';
import { CompanyComponent } from './components/company/company.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { WagesComponent } from './components/dashboard/users/edit-user/wages/wages.component';
import { UnavailabilityComponent } from './components/dashboard/users/edit-user/unavailability/unavailability.component';
import { NotesComponent } from './components/dashboard/users/edit-user/notes/notes.component';
import { EditProfileComponent } from './components/dashboard/users/edit-user/edit-profile/edit-profile.component';
import { AccountComponent } from './components/account/account.component';
import { BillingComponent } from './components/account/billing/billing.component';
import { InvoicesComponent } from './components/account/invoices/invoices.component';
import { PreferencesComponent } from './components/dashboard/settings/preferences/preferences.component';
import { NotificationsComponent } from './components/dashboard/settings/notifications/notifications.component';
import { ScheduleIntervalsComponent } from './components/dashboard/settings/schedule-intervals/schedule-intervals.component';
import { CompanySettingsComponent } from './components/dashboard/settings/company-settings/company-settings.component';
import { TimeClockComponent } from './components/dashboard/settings/time-clock/time-clock.component';
import { LaborCostComponent } from './components/dashboard/settings/labor-cost/labor-cost.component';
import { TimeOffComponent } from './components/dashboard/settings/time-off/time-off.component';
import { AccountActivityComponent } from './components/dashboard/settings/account-activity/account-activity.component';
import { IntegrationsComponent } from './components/dashboard/settings/integrations/integrations.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/dashboard/users/edit-user/reset-password/reset-password.component';
import { EditWageComponent } from './components/dashboard/users/edit-user/wages/edit-wage/edit-wage.component';





const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'changePassword', component: ResetPasswordComponent,canActivate: [AuthGuardsService]},
  {path: 'company', component: CompanyComponent, canActivate: [AuthGuardsService]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuardsService]},
  // {path: 'account/billing', component: BillingComponent, canActivate: [AuthGuardsService]},
  // {path: 'account/invoice', component: InvoicesComponent, canActivate: [AuthGuardsService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardsService]},
  {path: 'me', component: MeComponent, canActivate: [AuthGuardsService]},
  {path: 'manage/users', component: UsersComponent, canActivate: [AuthGuardsService]},
  {path: 'manage/users/add-user', component: AddUserComponent,canActivate: [AuthGuardsService]},
  {path: 'manage/users/edit-user/:id', component: EditUserComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/positions', component: PositionsComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/positions/add-position', component: AddPositionComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/positions/edit-position/:id', component: EditPositionComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/locations', component: LocationsComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/locations/add-location', component: AddLocationComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/locations/edit-location/:id', component: EditLocationComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/groups', component: GroupsComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/groups/add-group', component: AddGroupComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/groups/edit-group/:id', component: EditGroupComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings', component: SettingsComponent,canActivate: [AuthGuardsService]},
   {path: 'settings', component: PreferencesComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/notifications', component: NotificationsComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/schedule-intervals', component: ScheduleIntervalsComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/company-settings', component: CompanySettingsComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/time-clock', component: TimeClockComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/labor-cost', component: LaborCostComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/time-off', component: TimeOffComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/account-activity', component: AccountActivityComponent,canActivate: [AuthGuardsService]},
  //  {path: 'settings/integrations', component: IntegrationsComponent,canActivate: [AuthGuardsService]},
   {path: 'manage/users/profile/wage/:id', component: WagesComponent,canActivate: [AuthGuardsService]}, 
   {path: 'manage/users/profile/unavailability/:id', component: UnavailabilityComponent,canActivate: [AuthGuardsService]}, 
   {path: 'manage/users/profile/note/:id', component: NotesComponent,canActivate: [AuthGuardsService]}, 
   {path: 'manage/users/profile/edit-profile/:id', component: EditProfileComponent,canActivate: [AuthGuardsService]}, 
   {path: 'manage/users/profile/edit-profile/edit-wage/:id', component: EditWageComponent,canActivate: [AuthGuardsService]},
   
  {path: '**', pathMatch: 'full', redirectTo: 'login',canActivate: [AuthGuardsService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
