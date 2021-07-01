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
  @Input() key: string = 'name';
  @Input() imageVariant: ImageVariant = ImageVariant.standard_fantastic;
  @Output() onScrollEvent = new EventEmitter();
  @Output() onItemClickEvent = new EventEmitter();

  constructor(private marvelService: MarvelService) { }

  getImage(item: any) {
    return item.thumbnail && this.marvelService.getImage(item.thumbnail, this.imageVariant);
  }

  onScroll() {
    this.onScrollEvent.emit();
  }

  onItemClick(item: any) {
    this.onItemClickEvent.emit(item);
  }

}
