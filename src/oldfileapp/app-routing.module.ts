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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardsService]},
  {path: 'me', component: MeComponent, canActivate: [AuthGuardsService]},
  {path: 'manage/users', component: UsersComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/positions', component: PositionsComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/locations', component: LocationsComponent, canActivate: [AuthGuardsService]},
   {path: 'manage/groups', component: GroupsComponent, canActivate: [AuthGuardsService]},
  {path: 'register', component: RegisterComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
