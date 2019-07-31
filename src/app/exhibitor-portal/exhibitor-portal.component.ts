import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-exhibitor-portal',
  templateUrl: './exhibitor-portal.component.html',
  styleUrls: ['./exhibitor-portal.component.scss']

})
export class ExhibitorPortalComponent implements OnInit {

  loggedIn: boolean = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  opened: boolean;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
}
  ngOnInit() {

    this.loggedIn = (this.authenticationService.currentUserSubject.value) ? true : false;
   
  }

}
