import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header'; // Importe o Header

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent], // Inclua o Header aqui
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'tarodigital';
}