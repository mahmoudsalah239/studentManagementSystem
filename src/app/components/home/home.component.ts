import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTypedWriterModule } from 'ngx-typed-writer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule ,NgxTypedWriterModule],

templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent {
  strings: string[] = ['Welcome to our website!', 'Enjoy your stay.', 'Feel free to explore.'];
  typeSpeed: number = 50;
  backSpeed: number = 50;
  backDelay: number = 1000;
  loop: boolean = true;
}
