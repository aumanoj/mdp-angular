import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './graphql/graphql.module';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
//import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopNavbarComponent } from './components/layouts/top-navbar/top-navbar.component';
import { LeftMainMenuComponent } from './components/layouts/left-main-menu/left-main-menu.component';
import { LeftInnerMenuComponent } from './components/layouts/left-inner-menu/left-inner-menu.component';
import { BreadcrumbComponent } from './components/layouts/breadcrumb/breadcrumb.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
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
import { NgSelectModule } from '@ng-select/ng-select';
import { ScrollTopServiceService } from './scroll-top-service.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CompanyComponent } from './components/company/company.component';
import { SettingsComponent } from './components/dashboard/settings/settings.component';
import { WagesComponent } from './components/dashboard/users/edit-user/wages/wages.component';
import { UnavailabilityComponent } from './components/dashboard/users/edit-user/unavailability/unavailability.component';
import { NotesComponent } from './components/dashboard/users/edit-user/notes/notes.component';
import { EditProfileComponent } from './components/dashboard/users/edit-user/edit-profile/edit-profile.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ArchwizardModule } from 'angular-archwizard';
import { AccountComponent } from './components/account/account.component';
import { BillingComponent } from './components/account/billing/billing.component';
import { InvoicesComponent } from './components/account/invoices/invoices.component';
import { AccountTabComponent } from './components/account/account-tab/account-tab.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';










export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeComponent,
    UsersComponent,
    NavbarComponent,
    RegisterComponent,
    LoadingComponent,
    DashboardComponent,
    TopNavbarComponent,
    LeftMainMenuComponent,
    LeftInnerMenuComponent,
    BreadcrumbComponent,
    FooterComponent,
    PositionsComponent,
    LocationsComponent,
    GroupsComponent,
    AddUserComponent,
    AddPositionComponent,
    AddLocationComponent,
    AddGroupComponent,
    EditUserComponent,
    EditPositionComponent,
    EditLocationComponent,
    EditGroupComponent,
    CompanyComponent,
    SettingsComponent,
    WagesComponent,
    UnavailabilityComponent,
    NotesComponent,
    EditProfileComponent,
    AccountComponent,
    BillingComponent,
    InvoicesComponent,
    AccountTabComponent,
    PreferencesComponent,
    NotificationsComponent,
    ScheduleIntervalsComponent,
    CompanySettingsComponent,
    TimeClockComponent,
    LaborCostComponent,
    TimeOffComponent,
    AccountActivityComponent,
    IntegrationsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EditWageComponent,
   
 
  ],
  imports: [
    BrowserModule,
    ArchwizardModule,
    HttpClientModule,
    AppRoutingModule,
    GraphqlModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxUiLoaderModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:false
    }),
    FlashMessagesModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
  ScrollTopServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

