import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})
export class ListGroupComponent {

  @Input() items: any[] = [];
  @Input() title: string = '';
  @Input() isLink: boolean = false;
  @Input() key: string = 'name';
  @Input() link: string = '';

}
