import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],

templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {
}
