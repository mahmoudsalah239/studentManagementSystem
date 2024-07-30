import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app/app.routes';

// Factory function to create TranslateHttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
}).catch(err => console.error(err));
