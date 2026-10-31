import { Component, inject, OnInit } from '@angular/core';
import { LiffService } from './liff.service';
import { Spinner } from '../components/spinner/spinner';

@Component({
  selector: 'app-liff',
  imports: [Spinner],
  templateUrl: `./liff.html`,
})
export class Liff implements OnInit {
  private liffService = inject(LiffService);

  async ngOnInit() {
    try {
      await this.liffService.initialize();
      if (!this.liffService.isLoggedIn()) {
        this.liffService.login();
      }

      const idToken = this.liffService.getIdToken();
      if (!idToken) {
        throw new Error('ID Token not found');
      }

      // Sent idToken to backend to authen
      console.log('LINE Login successful');
    } catch (error) {
      console.error('LIFF Error:', error);
    }
  }
}
