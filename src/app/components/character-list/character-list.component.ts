import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelRequestOptions } from 'src/app/models/request.model';
import { MarvelService } from 'src/app/services/marvel.service';
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
  offCanvas: any;
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

    this.scroll$.next(0);
  }

  ngAfterViewInit(): void {
    this.offCanvas = new bootstrap.Offcanvas(document.getElementById('viewOffcanvas'));
  }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  getCharacters(scroll: Observable<number>) {
    scroll.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      concatMap(offset => {
        this.options.offset = offset;
        return this.marvelService.getCharacters(this.options);
      })).subscribe(data => this.handleResponse(data));
  }

  searchCharacters(text: Observable<string>) {
    text.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(() => this.marvelService.getCharacters(this.options))).subscribe(data => this.handleResponse(data, true));
  }

  onScroll() {
    const offset = this.options.offset + this.options.limit;
    if (offset < this.total) {
      this.scroll$.next(offset);
    }
  }

  onSearch(searchText: string) {
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
    if (this.offCanvas) {
      const offCanvasBody = document.querySelector('.offcanvas-body');
      if (offCanvasBody) {
        offCanvasBody.scrollTop = 0;
      }
      this.offCanvas.show();
    }
  }

  handleResponse(data: any, reset: boolean = false) {
    this.characters = reset ? data.results : [...this.characters, ...data.results];
    this.total = data.total;
    this.options.offset = this.options.offset || data.offset;
    this.notFound = !!!data.results.length;
  }

}
