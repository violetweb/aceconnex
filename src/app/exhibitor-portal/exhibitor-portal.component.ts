import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { ExhibitorService } from '../exhibitor.service';
import { AlertService } from '../alert.service';

import { ExhibitorNavComponent } from './exhibitor-nav.component';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
//import { ProfileComponent } from '../profile/profile.component';
import { MatTab, MatExpansionPanel  } from '@angular/material';
import { MatButton } from '@angular/material/button'; 
import { MatFileUploadQueue } from 'angular-material-fileupload';
import { first } from 'rxjs/operators';
import { Subscription  } from 'rxjs';
import { Router } from '@angular/router';
import { Exhibitor } from '../exhibitor';


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
  logosrc = '';
  contactsexist: boolean = false;
  submitted: boolean = false;
  exhibitorid;
  exhibitorData: [];
  panelOpenState = true;
  contactsData: [];
  addcontact: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private exhibitorService: ExhibitorService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
) {
}
  ngOnInit() {

    this.loggedIn = (this.authenticationService.currentUserSubject.value) ? true : false;

    this.companyForm = this.formBuilder.group({
      companyname: ['', [Validators.required, Validators.minLength(2)]],
      address1: ['', [Validators.required, Validators.minLength(2)]],
      address2: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      prov: ['', [Validators.required, Validators.minLength(2)]],
      postal_zip: ['', [Validators.required, Validators.minLength(2)]],
      phone1: ['', [Validators.required, Validators.minLength(9)]],
      phone2: [''],
      phone3: [''],
      logo: [''],
      companyabout: ['']
    });

    this.contactsForm = this.formBuilder.group({
      contactname: ['', [Validators.required, Validators.minLength(5)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(10)]],
      phone: [''],
      ext: [''],
      contacttype: ['']
    });

    //Grab the exhibitor id, if user is logged in.
    this.exhibitorService.getById('2').
    pipe(first())
    .subscribe(
        data => {
          this.exhibitorData = data['data'].slice();
          console.log(this.exhibitorData);
       },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });

      this.panelOpenState = true;
      this.exhibitorid = '2'; // replace this with a lookup of the exhibitor id... or get from login info.
      this.exhibitorService.getContactsById(this.exhibitorid).
      pipe(first())
      .subscribe(
        data => {
          this.contactsData = data['data'].slice();
          if (this.contactsData.length < 1) {
            this.contactsexist = false;
          }
       },
        error => {
            this.alertService.error(error);
            this.loading = false;
      });
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

  onAddContact() {
    this.addcontact = true;
  }

  // convenience getter for easy access to form fields
    get f() { return this.companyForm.controls; }
    get c() { return this.contactsForm.controls; }


    onSubmit() {

      this.submitted = true;

        // stop here if form is invalid
        if (this.companyForm.invalid) {
            return;
        }
        this.loading = true;
        this.exhibitorService.insert(this.f.companyname.value, this.logosrc, this.f.address1.value, this.f.address2.value, 
          this.f.city.value, this.f.prov.value, this.f.postal_zip.value, this.f.phone1.value, this.f.phone2.value, 
          this.f.phone3.value, this.f.companyabout.value)
              .pipe(first())
              .subscribe(
                  data => {
                    this.loading = false;
                    console.log(data);
                 },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });

    }

    onContactsSubmit() {

      this.submitted = true;
        // stop here if form is invalid
        if (this.contactsForm.invalid) {
            return;
        }
        //contactname, title, email, phone, ext, contacttype
        this.loading = true;
        this.exhibitorService.insertContact(this.exhibitorid, this.c.contactname.value, this.c.title.value, this.c.email.value, 
          this.c.phone.value, this.c.ext.value, this.c.contacttype.value)
              .pipe(first())
              .subscribe(
                  data => {
                    this.loading = false;
                    console.log(data);
                 },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });

    }

}