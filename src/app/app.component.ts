import { Component } from '@angular/core';
import { MarvelService } from './services/marvel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  characters: any[] = [];

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe(response => {
      console.log(response);
      this.characters = response && response.data && response.data.results || [];
    });
  }
}
