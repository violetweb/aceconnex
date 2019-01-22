import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http:  HttpClient) { }

  getSurveyResults() {
    return this.http.get('/api/surveyresults');
  }
}
