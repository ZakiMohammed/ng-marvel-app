import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image.model';
import { MarvelRequestOptions } from '../models/request.model';
import { MarvelData, MarvelResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  private dataCharacter?: MarvelData;

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
    return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  getCharacters(options?: MarvelRequestOptions): Observable<MarvelData> {
    if (this.dataCharacter && options?.offset === 0) {
      return of(this.dataCharacter);
    } else {
      let url = `${this.url}characters?apikey=${this.apiKey}`;
      if (options) {
        Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
      }
      return this.http.get<MarvelResponse>(url).pipe(map(response => {
        if (response.status === 'Ok') {
          if (this.dataCharacter) {
            this.dataCharacter = {
              ...response.data,
              results: [...this.dataCharacter.results, ...response.data.results]
            };
          } else {
            this.dataCharacter = response.data;
          }
          return response.data;
        } else {
          throw new Error('Something went wrong');
        }
      }));
    }
  }
}
