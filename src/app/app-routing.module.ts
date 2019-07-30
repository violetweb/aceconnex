import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { ConnexComponent } from './connex/connex.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ExhibitorPortalComponent } from './exhibitor-portal/exhibitor-portal.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,  
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      { path: 'exhibitor-portal',
        canActivateChild: [AuthGuard],
        component: ExhibitorPortalComponent,
        children: [
            {
              path: 'profile',
              component: ProfileComponent
            },
            {
              path: 'connex',
              component: ConnexComponent
            },
            { path: 'login', component: LoginComponent },
          ],
        }]
      },
      { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
