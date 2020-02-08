import { Component } from '@angular/core';
import { SetService } from './sets/set.service';
import { PartService } from './parts/part.service';
import { ImageService } from './shared/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SetService, PartService, ImageService]
})
export class AppComponent {
  title = 'Brickfinder';
  showNavBar: boolean = false;

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

}
