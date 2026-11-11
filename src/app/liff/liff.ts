import { Component, inject, OnInit } from '@angular/core';
import { LiffService } from './liff.service';
import { AuthService } from '../auth/auth.service';
import { Spinner } from '../components/spinner/spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from './accounts/account.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-liff',
  imports: [Spinner],
  templateUrl: `./liff.html`,
})
export class Liff implements OnInit {
  private liffService = inject(LiffService);
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    try {
      const isAuthenticated = await this.authService.checkAuth();

      let accountId: number;

      if (isAuthenticated) {
        const account = await firstValueFrom(this.accountService.getPersonalAccount());
        accountId = account.id;
      } else {
        await this.liffService.initialize();

        if (!this.liffService.isLoggedIn()) {
          this.liffService.login();
          return;
        }

        const idToken = this.liffService.getIdToken();

        if (!idToken) {
          throw new Error('ID Token not found');
        }

        await this.authService.loginWithLine(idToken);
        const account = await firstValueFrom(this.accountService.getPersonalAccount());
        accountId = account.id;
      }

      const redirectUrl = returnUrl?.startsWith('/liff/')
        ? returnUrl
        : `/liff/${accountId}/summaries`;

      await this.router.navigateByUrl(redirectUrl);
    } catch (error) {
      console.error('LIFF Error:', error);
    }
  }
}
