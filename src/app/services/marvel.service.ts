import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  getCharacters(): Observable<any> {
    const url = `${this.url}characters?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
