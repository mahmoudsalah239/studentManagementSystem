import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, TranslateModule],
templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = 'en';
  isLogin: boolean = false;
  systemUser: string = localStorage?.getItem("systemUser")||""
  profileImageUrl: string = '../../../assets/Images/download.png';

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private translateService: TranslateService,
  
  ) {}

  ngOnInit(): void {
    this.initializeLanguage();
    this.initializeUser();
    this.subscribeToAuthStatus();

  }

  private initializeLanguage(): void {
    this.selectedLanguage = localStorage.getItem('language') || 'en';
    this.languageService.setLanguage(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  private initializeUser(): void {
    this.authService.currentUser.subscribe(
      (res)=>{

       this.systemUser = res
       localStorage.setItem('systemUser',res);

      }
    )

    
  }

  private subscribeToAuthStatus(): void {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLogin = isLoggedIn;
    });
  }

  

  logout(): void {
    this.authService.LogOut();
    localStorage.removeItem('systemUser');
    this.router.navigate(['/home']);
  }

  changeLanguage(event: Event): void {
    const selectedLang = (event.target as HTMLSelectElement).value;
    this.updateLanguage(selectedLang);
  }

  onToggleChange(event: Event): void {
    const selectedLang = (event.target as HTMLInputElement).checked ? 'ar' : 'en';
    this.updateLanguage(selectedLang);
  }

  private updateLanguage(language: string): void {
    this.selectedLanguage = language;
    this.storeLanguage(language);
    this.languageService.setLanguage(language);
    this.translateService.use(language);
   
  }

  private storeLanguage(language: string): void {
    localStorage.setItem('language', language);
  }
}
