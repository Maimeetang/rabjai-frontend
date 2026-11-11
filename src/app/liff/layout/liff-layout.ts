import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileDockComponent } from '../../components/mobile-dock/mobile-dock';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet, MobileDockComponent],
  templateUrl: './liff-layout.html',
})
export class LiffLayout {
  private authService = inject(AuthService);

  userProfile = this.authService.userProfile;
}
