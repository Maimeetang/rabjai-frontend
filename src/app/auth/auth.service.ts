import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface UserProfile {
  id: number;
  lineUserId: string;
  name: string;
  pictureUrl: string;
  role: string;
}

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  authStatus = signal<AuthStatus>('checking');
  userProfile = signal<UserProfile | null>(null);

  async loginWithLine(idToken: string) {
    try {
      await firstValueFrom(
        this.http.post<{ token: string }>('/api/auth/line', { idToken }, { withCredentials: true }),
      );
      this.authStatus.set('authenticated');
    } catch (error) {
      this.authStatus.set('unauthenticated');
      throw error;
    }
  }

  async checkAuth(): Promise<boolean> {
    this.authStatus.set('checking');

    try {
      const profile = await firstValueFrom(
        this.http.get<UserProfile>('/api/users/profile', {
          withCredentials: true,
        }),
      );

      this.userProfile.set(profile);
      this.authStatus.set('authenticated');

      return true;
    } catch {
      this.userProfile.set(null);
      this.authStatus.set('unauthenticated');

      return false;
    }
  }
}
