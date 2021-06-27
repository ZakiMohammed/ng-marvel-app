import { Component, OnInit } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelRequestOptions } from 'src/app/models/request.model';
import { MarvelService } from 'src/app/services/marvel.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: any[] = [];
  character: any;
  total = 0;
  options: MarvelRequestOptions = {
    limit: 100,
    offset: 0
  };
  faSearch = faSearch;

  searchText$ = new Subject<string>();
  scroll$ = new Subject<number>();

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getCharacters(this.scroll$);
    this.searchCharacters(this.searchText$);

    this.scroll$.next();
  }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  getCharacters(scroll: Observable<number>) {
    scroll.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      concatMap(() => this.marvelService.getCharacters(this.options))).subscribe(data => {
        this.characters = [...this.characters, ...data.results];
        this.total = data.total;
        this.options.offset = this.options.offset === 0 ? data.offset : this.options.offset;
      });
  }

  searchCharacters(text: Observable<string>) {
    text.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(() => this.marvelService.getCharacters(this.options))).subscribe(data => {
        this.characters = data.results;
        this.total = data.total;
        this.options.offset = this.options.offset === 0 ? data.offset : this.options.offset;
      });
  }

  onScroll() {
    if (this.options.offset < this.total) {
      this.options.offset += this.options.limit;
      this.scroll$.next(this.options.offset);
    }
  }

  onSearch($event: any) {
    const searchText = $event && $event.target && $event.target.value;
    this.options.nameStartsWith = searchText;
    this.characters = [];
    this.total = 0;
    this.searchText$.next(searchText);
  }

}
