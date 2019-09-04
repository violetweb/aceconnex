import { Component, OnInit, EventEmitter} from '@angular/core';
import { User } from '../user';
import { Presentation } from '../presentation';
import { AuthenticationService } from '../authentication.service';
import { ExhibitorService } from '../exhibitor.service';
import { AlertService } from '../alert.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogContactComponent } from '../dialog-contact/dialog-contact.component';
import { ExhibitorNavComponent } from './exhibitor-nav.component';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatExpansionPanel, MatTableDataSource, MatTabLabel  } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs'; 
import { MatButton } from '@angular/material/button'; 
import { first, share } from 'rxjs/operators';
import { Subscription  } from 'rxjs';
import { Router } from '@angular/router';
import { Exhibitor } from '../exhibitor';
import { Exhibitorcontact } from '../exhibitorcontact';
import { Contacttypes } from '../dialog-contact/contacttypes';
import { DymoLabelComponent } from '../dymo-label/dymo-label.component';
import { setFullname, renderPreview } from 'src/assets/PreviewandPrintLabel';


@Component({
  selector: 'app-exhibitor-portal',
  templateUrl: './exhibitor-portal.component.html',
  styleUrls: ['./exhibitor-portal.component.scss']
})
export class ExhibitorPortalComponent implements OnInit {

  displayedColumns = ['id', 'contactname', 'email', 'title', 'phone', 'ext', 'contacttype'];
  badgeColumns = ['id', 'contactname', 'company_name', 'title', 'contacttype'];
  loggedIn: boolean = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  opened: boolean;
  published: boolean = false;
  companyForm: FormGroup;
  contactsForm: FormGroup;
  saveContactForm: FormGroup;
  loading: boolean = false;
  logoIsSet: boolean = false;
  logosrc: string = null;
  contactsexist: boolean = false;
  contactedit: boolean = false;
  submitted: boolean = false;
  exhibitorid;
  exhibitorData: [];
  panelOpenState = true;
  contactsData;
  presentationData: Presentation[];
  addcontact: boolean = false;
  exhibitorEdit: boolean = false;
  clientid = '';
  event = new EventEmitter();
  fullname = 'John Doe';
  company = 'Acetronic Industrial Controls';
  title = 'Testing Label';
  badge = '12345';
  tabIndex = 0 ;
  exhibitoractive = false;
  presentationid: any;

  contacttypes: Contacttypes[] = [
    {value: 'marketing', viewValue: 'Marketing'},
    {value: 'exhibitor', viewValue: 'Exhibitor'},
    {value: 'presenter', viewValue: 'Presenter'},
    {value: 'attendee', viewValue: 'Attendee'}
  ];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private exhibitorService: ExhibitorService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialog: MatDialog
   
) {
}

changeTab(event){
  this.tabIndex = event.index;
  if (event.index === 1) {
    this.exhibitoractive = true;
  }
  
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


    this.clientid = localStorage.getItem('client_id'); // replace this with a lookup of the exhibitor id... or get from login info.

    this.exhibitorService.getById(this.clientid).
    pipe(first())
    .subscribe(
        data => {
          this.exhibitorData = data['data'].slice();
          
          this.exhibitorid = data['data'][0]['id'];
          this.logosrc = data['data'][0]['logosrc'];
          if (this.exhibitorid !== ''){
            this.panelOpenState = true;
            this.getContacts();
            this.getPresentation();
           
          }
       },
        error => {
            this.alertService.error(error);
            this.loading = false;
        });
}

  getContacts() {
    this.exhibitorService.getContactsById(this.exhibitorid).
    pipe(first())
    .subscribe(
      data => {
        this.contactsexist = true;
        const ELEMENT_DATA: Exhibitorcontact[] = data['data'].slice();
        this.contactsData = new MatTableDataSource(ELEMENT_DATA);
        if (this.contactsData) {
          this.contactsexist = true;
        }
     },
      error => {
          this.alertService.error(error);
          this.loading = false;
    });
  }

  getPresentation() {

    if (this.exhibitorid !== '') {
      this.exhibitorService.getPresentation(this.exhibitorid).
      pipe(first())
      .subscribe(
        data => {
          if (data['data'].length > 0) {
            const ELEMENT_DATA: Presentation[] = data['data'].slice();
            this.presentationData = ELEMENT_DATA;
            this.presentationid = this.presentationData[0].id;
          }
      },
        error => {
            this.alertService.error(error);
            this.loading = false;
      });
    } else {
      console.log('Something went wrong; no exhibitor id');
    }
  }

  updateContact(element) {
    this.exhibitorService.updateContact(element).subscribe(data => this.contactsData = this.getContacts());
  }

  updatePresentation(element) {
    this.exhibitorService.updatePresentation(element).subscribe(
      data => {
          this.getPresentation();
      });
  }



  updateExhibitor(element) {
    this.exhibitorService.update(element).subscribe(data => 
      console.log(data));
  }

  deleteContact(id) {
    this.exhibitorService.deleteContact(id).subscribe(
      data => this.contactsData = this.getContacts());

  }

  openDialog(action, obj): void {
    const dialogRef = this.dialog.open(DialogContactComponent, {
      width: '850px',
      data: {contactname: '', title: '', phone: '', ext: '', email: '', contacttypes: this.contacttypes }
        });

    dialogRef.afterClosed().subscribe(result => {
      this.exhibitorService.insertContact(this.exhibitorid, result.contactname, result.title, 
        result.email, result.phone, result.ext, result.contacttype)
      .subscribe(data => this.getContacts());
    });
  }

 // Coming from any file uploads
  onFileComplete(data) {

    this.logoIsSet = true;
    this.logosrc = 'http://api.acetronic.com/uploads/' + data['filename'];
    this.exhibitorService.updateLogo(this.exhibitorid, this.logosrc).subscribe(result => {
      console.log(result['result']);
    });

  }
  replaceLogo(){
    this.logosrc = '';
  }

  onPublish() {

    this.published = true;

  }

  onAddContact() {
    this.addcontact = true;

  }

  onExhibitorEdit(){
    this.exhibitorEdit = true;
  }
  // convenience getter for easy access to form fields
    get f() { return this.companyForm.controls; }
    get c() { return this.contactsForm.controls; }



   // When we click "print badge button" from the list of contacts,
   // Update the label for the print badge.
   onPrintBadge(element) {
      this.fullname = element.contactname;
      this.company = element.company_name;
      this.title = element.title;
      this.badge = element.badge;
   }

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

                 },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });

    }

    onEditContact(id) {
      this.contactedit = true;
    }


    onSaveContact(id) {
      this.exhibitorService.saveContact(this.exhibitorid, this.c.contactname.value, this.c.title.value, this.c.email.value, 
        this.c.phone.value, this.c.ext.value, this.c.contacttype.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.loading = false;
                  this.addcontact = false;
                  this.getContacts();
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

        this.loading = true;
        this.exhibitorService.insertContact(this.exhibitorid, this.c.contactname.value, this.c.title.value, this.c.email.value, 
          this.c.phone.value, this.c.ext.value, this.c.contacttype.value)
              .pipe(first())
              .subscribe(
                  data => {
                    this.addcontact = false;
                    this.getContacts();
                 },
                  error => {
                      this.alertService.error(error);
                      this.loading = false;
                  });

    }

}
