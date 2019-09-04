import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatSidenavModule, MatMenuModule } from '@angular/material';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


import {
  trigger,
  state,
  style,
  animate,
transition
} from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('openit', style({
        opacity: 1.0,
        
      })),
      state('closeit', style({
        opacity: 0.65,
        
      })),
      transition('openit => closeit', [
        animate('1.5s')
      ]),
      transition('closeit => openit', [
        animate('1.5s')
      ]),
    ]),
  ],
})

export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenavModule;

  colorStart = 'primary';
  colorEnd = 'accent';

  events: string[] = [];
  loggedIn = true;
  currentUser: User;
  currentUserSubscription: Subscription;
  opened: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
) {
}

  ngOnInit() {
    this.loggedIn = (this.authenticationService.currentUserValue) ? true : false;

  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  openChange() {
    this.opened = !this.opened;
  }
}
