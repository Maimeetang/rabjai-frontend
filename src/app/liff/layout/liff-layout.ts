import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileDockComponent } from '../../components/mobile-dock/mobile-dock';

@Component({
  selector: 'app-liff-layout',
  standalone: true,
  imports: [RouterOutlet, MobileDockComponent],
  templateUrl: './liff-layout.html',
})
export class LiffLayout {}
