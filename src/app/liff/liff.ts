import { Component, inject, OnInit } from '@angular/core';
import { LiffService } from './liff.service';
import { AuthService } from '../auth/auth.service';
import { Spinner } from '../components/spinner/spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liff',
  imports: [Spinner],
  templateUrl: `./liff.html`,
})
export class Liff implements OnInit {
  private liffService = inject(LiffService);
  private authService = inject(AuthService);
  private router = inject(Router);

  async ngOnInit() {
    const isAuthenticated = await this.authService.checkAuth();
    if (isAuthenticated) {
      await this.router.navigate(['/liff/summary']);
      return;
    }

    try {
      await this.liffService.initialize();
      if (!this.liffService.isLoggedIn()) {
        this.liffService.login();
      }

      const idToken = this.liffService.getIdToken();
      if (!idToken) {
        throw new Error('ID Token not found');
      }

      await this.authService.loginWithLine(idToken);
      await this.router.navigate(['/liff/summary']);
    } catch (error) {
      console.error('LIFF Error:', error);
    }
  }
}
