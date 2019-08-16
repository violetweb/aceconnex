import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSidenavModule, MatMenuModule } from '@angular/material';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenavModule;
  @ViewChild('menu') menu: MatMenuModule;

  @Output() windowopened = new EventEmitter<boolean>();

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
    this.opened = true;
   // this.loggedIn = (this.authenticationService.currentUserSubject.value) ? true : false;
  }

  onPositionChanged() {
    
    this.opened = !this.opened;
    this.windowopened.emit(this.opened);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }
}
