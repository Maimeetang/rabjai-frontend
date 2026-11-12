import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MobileDockComponent } from '../../components/mobile-dock/mobile-dock';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet, MobileDockComponent, RouterLink, RouterLinkActive],
  templateUrl: './liff-layout.html',
})
export class LiffLayout {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  userProfile = this.authService.userProfile;
  accountId = this.route.snapshot.paramMap.get('accountId')!;
}
