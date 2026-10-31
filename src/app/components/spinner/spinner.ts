import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: `./spinner.html`,
  styleUrl: './spinner.css',
})
export class Spinner {
  @Input() message: string = '';
}
