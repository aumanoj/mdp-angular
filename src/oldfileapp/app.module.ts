import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    GroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphqlModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
