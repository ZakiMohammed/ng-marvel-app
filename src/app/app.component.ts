import { Component } from '@angular/core';
import { ImageVariant } from './models/image.model';
import { MarvelService } from './services/marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  characters: any[] = [];

  constructor(private marvelService: MarvelService) { }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe(response => {
      console.log(response);
      this.characters = response && response.data && response.data.results || [];
    });
  }
}
