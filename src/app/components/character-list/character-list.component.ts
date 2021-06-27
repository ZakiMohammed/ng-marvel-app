import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelRequestOptions } from 'src/app/models/request.model';
import { MarvelService } from 'src/app/services/marvel.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare let bootstrap: any;

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, AfterViewInit {

  characters: any[] = [];
  character: any;
  total = 0;
  notFound = false;
  initialLoad = true;
  faSearch = faSearch;
  offcanvas: any;
  options: MarvelRequestOptions = {
    limit: 50,
    offset: 0
  };

  searchText$ = new Subject<string>();
  scroll$ = new Subject<number>();

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getCharacters(this.scroll$);
    this.searchCharacters(this.searchText$);

    this.scroll$.next();
  }

  ngAfterViewInit(): void {
    this.offcanvas = new bootstrap.Offcanvas(document.getElementById('viewOffcanvas'));
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
        this.initialLoad = false;
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
        this.notFound = data.results.length ? false : true;
      });
  }

  onScroll() {
    if (this.options.offset + this.options.limit < this.total) {
      this.options.offset += this.options.limit;
      this.scroll$.next(this.options.offset);
    }
  }

  onSearch($event: any) {
    const searchText = $event && $event.target && $event.target.value;
    if (searchText !== this.options.nameStartsWith) {
      if (searchText) {
        this.options.nameStartsWith = searchText;
      } else {
        this.options = {
          limit: 50,
          offset: 0
        };
      }
      this.characters = [];
      this.total = 0;
      this.notFound = false;
      this.searchText$.next(searchText);
    }
  }

  onCharacterClick(character: any) {
    this.character = character;
    if (this.offcanvas) {
      this.offcanvas.show();
    }
  }

}
