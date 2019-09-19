import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AttendeeService } from '../attendee-register/attendee.service';
import { Attendee } from '../attendee-register/attendee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendee-register',
  templateUrl: './attendee-register.component.html',
  styleUrls: ['./attendee-register.component.scss']
})
export class AttendeeRegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerData: Attendee[] = [];

  constructor(private aService: AttendeeService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

  
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      company: ['', [Validators.required]],
      title: [''],
      phone: [''],
      email: ['', [Validators.required]]
    });

   }

  get r() { return this.registerForm.controls; }

  registerAttendee() {

      this.aService.insertAttendee(this.r.firstname.value,
        this.r.lastname.value, this.r.company.value,
        this.r.title.value, this.r.email.value, this.r.phone.value).subscribe(data => {
          const registrant = data['data'].slice();
          this.registerData.push(registrant[0]);
          this.registerForm.reset();
      });
    }
}
