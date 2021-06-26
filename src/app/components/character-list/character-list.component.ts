import { Component, OnInit } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelService } from 'src/app/services/marvel.service';

declare let bootstrap: any;

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: any[] = [];
  character: any;

  constructor(private marvelService: MarvelService) { }

  ngOnInit(): void {
    this.marvelService.getCharacters().subscribe(characters => {
      console.log(characters);
      this.characters = characters || [];
    });
    
  }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  onCharacterClick(character: any) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    this.character = character;
    modal.show();
  }

}
