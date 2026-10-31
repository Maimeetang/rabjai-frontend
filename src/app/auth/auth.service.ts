import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  isAuthenticated = signal<boolean>(false);

  async loginWithLine(idToken: string) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>('/api/auth/line', { idToken }, { withCredentials: true }),
      );
      this.isAuthenticated.set(true);
      console.log('Login Success');
    } catch (error) {
      console.error('Login Fail:', error);
      this.isAuthenticated.set(false);
    }
  }
}
