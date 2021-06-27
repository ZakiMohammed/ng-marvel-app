import { Component, OnInit } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelRequestOptions } from 'src/app/models/request.model';
import { MarvelService } from 'src/app/services/marvel.service';

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
    limit: 50,
    offset: 0
  };

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getCharacters(this.options);
  }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  getCharacters(options?: MarvelRequestOptions) {
    this.marvelService.getCharacters(options).subscribe(data => {
      console.log(data);
      this.characters = [...this.characters, ...(data.results || [])];
      this.total = data.total;
      this.options.offset = this.options.offset === 0 ? data.offset : this.options.offset;
    }, error => alert(error));
  }

  onScroll() {
    console.log('scrolled!!');
    if (this.options.offset < this.total) {
      this.options.offset += this.options.limit;
      this.getCharacters(this.options);
    }
  }

}
