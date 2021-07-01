import { Component, Input } from '@angular/core';
import { faMask } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  @Input() notFound = false;
  faMask = faMask;

}
