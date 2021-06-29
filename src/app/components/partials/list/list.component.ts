import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() items: any[] = [];
  @Output() onScrollEvent = new EventEmitter();
  @Output() onItemClickEvent = new EventEmitter();

  constructor(private marvelService: MarvelService) { }

  getImage(character: any) {
    return this.marvelService.getImage(character.thumbnail, ImageVariant.standard_xlarge);
  }

  onScroll() {
    this.onScrollEvent.emit();
  }

  onItemClick(item: any) {
    this.onItemClickEvent.emit(item);
  }

}
