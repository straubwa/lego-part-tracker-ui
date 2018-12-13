import { Component } from '@angular/core';
import { SetService } from './sets/set.service';
import { PartService } from './parts/part.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SetService, PartService]
})
export class AppComponent {
  title = 'Brickfinder';
}
