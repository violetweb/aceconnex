import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { ExhibitorNavComponent } from './exhibitor-nav.component';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProfileComponent } from '../profile/profile.component';
import { MatTab } from '@angular/material';
import { MatButton } from '@angular/material/button'; 
import { MatFileUploadQueue } from 'angular-material-fileupload';

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
  published: boolean = false;
  companyForm: FormGroup;
  contactsForm: FormGroup;
  loading: boolean = false;
  logoIsSet: boolean = false;
  logosrc: string;
  contactsexist: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
) {
}
  ngOnInit() {

    this.loggedIn = (this.authenticationService.currentUserSubject.value) ? true : false;
    this.companyForm = this.formBuilder.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      streetaddress: ['', [Validators.required, Validators.minLength(2)]],
      unit: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      prov: ['', [Validators.required, Validators.minLength(2)]],
      postal: ['', [Validators.required, Validators.minLength(2)]],
      phone1: ['', [Validators.required, Validators.minLength(9)]],
      phone2: [''],
      phone3: [''],
    });
    this.contactsForm = this.formBuilder.group({
      contactname: ['', [Validators.required, Validators.minLength(2)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(10)]],
      phone: [''],
      ext: [''],
    });

    //Add -- load contacts, company info... turn off or on any "existance elements";
}

 // Coming from any file uploads
  onFileComplete(data: any) {
    //Grab the logo name.
    //Show the image
    //Save the image name
    this.logoIsSet = true;
    this.logosrc = data['file']['name'];

  }
  onPublish(){

    this.published = true;
   
  }


  // convenience getter for easy access to form fields
    get f() { return this.companyForm.controls; }



    onSubmit() {

    //  this.submitted = true;

        // stop here if form is invalid
        if (this.companyForm.invalid) {
            return;
        }

        this.loading = true;
        /*
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    console.log(data);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
            */
    }

}