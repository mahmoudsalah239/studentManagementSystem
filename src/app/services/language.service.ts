import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private  languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  public   currentLanguage: Observable<string> = this.languageSubject.asObservable();
  private  rtlLanguages: string[] = ['ar'];

  setLanguage(language: string): void {
    this.languageSubject.next(language);
    this.updateDirection(language);
  }

  private updateDirection(language: string): void {
    const isRtl: boolean = this.rtlLanguages.includes(language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }
}
