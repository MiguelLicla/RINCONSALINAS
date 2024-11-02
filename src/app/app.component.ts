import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'gcp';
}
