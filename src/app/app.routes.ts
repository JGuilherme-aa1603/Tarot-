import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CartasComponent } from './pages/cartas/cartas';
import { ResultadoComponent } from './pages/resultado/resultado';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Tarô - Início',
  },
  {
    path: 'cartas', // Rota 'Conheça as Cartas'
    component: CartasComponent,
    title: 'Tarô - Conheça as Cartas',
  },
  {
    path: 'resultado', // Rota para o resultado da leitura
    component: ResultadoComponent,
    title: 'Tarô - Sua Leitura',
  },
  {
    path: '**', // Rota Coringa para qualquer URL não mapeada
    redirectTo: '',
    pathMatch: 'full',
  },
];
