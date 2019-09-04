import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ExhibitorPortalComponent } from './exhibitor-portal/exhibitor-portal.component';
import { PresentationComponent } from './presentation/presentation.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '',
        component: AboutComponent
      },
      { path: 'login',
        component: LoginComponent
      },
      {
        path: 'presentations',
        component: PresentationComponent
      },
      { path: 'exhibitor-portal',
        component: ExhibitorPortalComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'profile',
            component: ProfileComponent
          },
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
