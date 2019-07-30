import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exhibitor-portal',
  templateUrl: './exhibitor-portal.component.html',
  styleUrls: ['./exhibitor-portal.component.scss']
})
export class ExhibitorPortalComponent implements OnInit {

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

    this.loggedIn = (this.authenticationService.currentUser) ? true : false;
   
  }

}
