import { Component, inject, OnInit } from '@angular/core';
import { LiffService } from './liff.service';
import { AuthService } from '../auth/auth.service';
import { Spinner } from '../components/spinner/spinner';

@Component({
  selector: 'app-liff',
  imports: [Spinner],
  templateUrl: `./liff.html`,
})
export class Liff implements OnInit {
  private liffService = inject(LiffService);
  private authService = inject(AuthService);

  async ngOnInit() {
    try {
      await this.liffService.initialize();
      if (!this.liffService.isLoggedIn()) {
        this.liffService.login();
      }

      const idToken = await this.liffService.getIdToken();
      console.log(idToken);
      if (!idToken) {
        throw new Error('ID Token not found');
      }

      await this.authService.loginWithLine(idToken);
    } catch (error) {
      console.error('LIFF Error:', error);
    }
  }
}
