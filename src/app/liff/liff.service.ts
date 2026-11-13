import { Injectable } from '@angular/core';
import liff from '@line/liff';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LiffService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await liff.init({
      liffId: environment.liffId,
    });

    this.initialized = true;
  }

  isLoggedIn(): boolean {
    return liff.isLoggedIn();
  }

  login(): void {
    liff.login();
  }

  getIdToken(): string | null {
    return liff.getIDToken();
  }

  logout(): void {
    if (liff.isLoggedIn()) {
      liff.logout();
    }
  }
}
