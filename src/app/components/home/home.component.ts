import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxTypedJsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent {

  typedOptions = {
    strings: ['Welcome to Angular 17!', 'Enjoy using ngx-typed-js.'],
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1000,
    startDelay: 500,
    loop: true
  };
}
