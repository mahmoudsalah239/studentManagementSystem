import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Fixed typo from styleUrl to styleUrls
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = '';
  isLogin: boolean = false;
  systemUser: string = '';
  profileImageUrl: string = '../../../assets/Images/download.png';

  constructor(private renderer: Renderer2, private el: ElementRef,
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en';
    this.systemUser = localStorage.getItem('systemUser') || 'System User';
    this.languageService.setLanguage(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);

    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });
    this.applyClassBasedOnLanguage();

  }

  applyClassBasedOnLanguage(): void {
    // قراءة اللغة من localStorage
    const language = localStorage.getItem('language') || 'en'; // افتراضي 'en' إذا لم تكن موجودة
console.log(
  language
);

    // تحديد الكلاس بناءً على اللغة
    let className = '';
    if (language == 'ar') {
      className = 'ms-auto';
    } else if(language == 'en') {
      className = 'me-auto';
    }

    // إضافة الكلاس إلى العنصر
    this.renderer.addClass(this.el.nativeElement.querySelector('.direction'), className);
  }

  logout(): void {
    this.authService.LogOut();
    localStorage.removeItem('systemUser');
    this.router.navigate(['/home']);
  }

  changeLanguage(event: Event): void {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.selectedLanguage = selectedLang;
    this.storeLanguage(selectedLang);
    this.updateLanguage(selectedLang);
    this.applyClassBasedOnLanguage();

    
  }

  onToggleChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const selectedLang = isChecked ? 'ar' : 'en';
    this.selectedLanguage = selectedLang;
    this.storeLanguage(selectedLang);
    this.updateLanguage(selectedLang);
  }

  private storeLanguage(language: string): void {
    localStorage.setItem('language', language);
  }

  private updateLanguage(language: string): void {
    this.languageService.setLanguage(language);
    this.translateService.use(language);
  }
}
