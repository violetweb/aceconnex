import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attendee } from '../attendee-register/attendee';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {


  url = environment.baseUrl;

  constructor(private http:  HttpClient) { }

  getAttendees() {
    return this.http.get<Attendee[]>(this.url + '/attendee/all' );
  }

  insertAttendee(first_name, last_name, company, title, email, phone) {
    //  return this.http.post<any>(this.url + '/attendee/insert',{});
    return this.http.post<any>(environment.baseUrl + '/attendee/insert', { first_name, last_name, company, title, email, phone });

  }

  sendEmail() {
    return this.http.post<any>(this.url + '/attendee/email');
  }

  updateAttendee(id){
    return this.http.get(this.url + '/attendee/update/' + id);
  }

  deleteAttendee(id){
    return this.http.post(this.url + '/attendee/delete', { id } );
  }

}
