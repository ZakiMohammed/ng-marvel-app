import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  faSearch = faSearch;
  
  @Input() title: string = '';
  @Output() searchEvent = new EventEmitter();

  onSearch($event: any) {
    const searchText = $event && $event.target && $event.target.value || '';
    this.searchEvent.emit(searchText);
  }

}
