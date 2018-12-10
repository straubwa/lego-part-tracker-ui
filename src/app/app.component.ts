import { Component } from '@angular/core';
import { SetService } from './sets/set.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SetService]
})
export class AppComponent {
  title = 'Brickfinder';
}
