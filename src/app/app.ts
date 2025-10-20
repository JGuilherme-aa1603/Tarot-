import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.css', // <-- MUDANÇA: .css
})
export class AppComponent {
  title = 'tarodigital';
}

// Alias para compatibilidade com testes existentes
export const App = AppComponent;
