import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UploadService {

  SERVER_URL: string = "http://api.acetronic.com";

  constructor(private httpClient: HttpClient) { }

  public upload(data, userId) {


    const uploadURL = '${this.SERVER_URL}/upload';

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    });
  }
 }