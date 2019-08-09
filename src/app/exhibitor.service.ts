import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exhibitor } from './exhibitor';
import { Exhibitorcontact } from './exhibitorcontact';

@Injectable({
  providedIn: 'root'
})

export class ExhibitorService {

  constructor(private http:  HttpClient) { }

  url = '/api';

  getAll() {
    return this.http.get<Exhibitor[]>(this.url + '/exhibitors');
  }

  getById(id: string) {
    return this.http.get<Exhibitor[]>(this.url + '/exhibitors/get?id=' + id);
  }

  getContactsById(id: string){
    return this.http.get<Exhibitorcontact[]>(this.url + '/exhibitors/getContacts?id=' + id);
  }

  insertContact(contactname, title, email, phone, ext, contacttype) {
    return this.http.post(this.url + '/exhibitors/insertcontact', {contactname, title, email, phone, ext, contacttype });
  }

  insert(company, logosrc, address1, address2, city, prov, postal, phone1, phone2, phone3, companyabout) {
    return this.http.post(this.url + '/exhibitors/insert', {company,logosrc, address1,address2, city, prov, postal, phone1, phone2, phone3, companyabout });
  }


  update(exhibitor: Exhibitor) {
    return this.http.put(this.url + '/exhibitors/' + exhibitor.id, exhibitor);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/exhibitors/' + id);
  }



}