import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-enav',
  templateUrl: './exhibitor-nav.component.html',
  styleUrls: ['./exhibitor-nav.component.scss']
})
export class ExhibitorNavComponent implements OnInit {

  constructor(  
    private authenticationService: AuthenticationService,    
    private router: Router
    ) { }

  ngOnInit() {
  }

   logOff() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }

}
