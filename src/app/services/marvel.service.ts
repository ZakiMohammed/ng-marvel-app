import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  private characters: any;

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
    return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  getCharacters(): Observable<any> {
    if (!this.characters) {
      const url = `${this.url}characters?limit=50&apikey=${this.apiKey}`;
      return this.http.get<any>(url).pipe(map(response => {
        this.characters = response.data.results;
        return this.characters;
      }));
    }
    return of(this.characters);
  }
}
