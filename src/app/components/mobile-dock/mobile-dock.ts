import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-dock',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-dock.html',
})
export class MobileDockComponent {
  accountId = input.required<string>();
}
