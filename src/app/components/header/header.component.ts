import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private _AuthService: AuthService, private router:Router) {}
  IsLogin: boolean = false;
  FullName: string = ' System User';
  profileImageUrl: string = '../../../assets/Images/download.png';
  ngOnInit(): void {
    this._AuthService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.IsLogin = isLoggedIn;
    });
  }

  logout() {
    this.router.navigate(['/home']);

    this._AuthService.LogOut();
  }
}
