import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image.model';
import { Category, MarvelRequestOptions } from '../models/request.model';
import { MarvelCache, MarvelData, MarvelResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.apiUrl;
  private apiKey: string = environment.apiKey;

  private cache: MarvelCache = {
    characters: undefined,
    comics: undefined,
    creators: undefined,
    events: undefined,
    series: undefined,
    stories: undefined,
  }

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
    return thumbnail && `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  getData(category: Category, options?: MarvelRequestOptions): Observable<MarvelData | undefined> {
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }

    let url = `${this.url}${category}?apikey=${this.apiKey}`;
    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }
    return this.http.get<MarvelResponse>(url).pipe(map(response => {
      if (response.status === 'Ok') {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            this.cache[category] = response.data;
          }
        }

        return response.data;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }
}
