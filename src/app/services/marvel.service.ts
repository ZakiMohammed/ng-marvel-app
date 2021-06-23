import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
    return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  getCharacters(): Observable<any> {
    const url = `${this.url}characters?limit=50&apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
