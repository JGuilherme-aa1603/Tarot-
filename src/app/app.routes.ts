import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Tarô - Conheça as Cartas'
  },
  {
    path: 'cartas', // Rota 'Conheça as Cartas'
    component: HomeComponent,
    title: 'Tarô - Conheça as Cartas'
  },
  // Aqui você adicionaria rotas para 'Tiragem de 3 Cartas'
  // { path: 'tiragem', component: TiragemComponent, title: 'Tiragem de 3 Cartas' },
  {
    path: '**', // Rota Coringa para qualquer URL não mapeada
    redirectTo: '',
    pathMatch: 'full'
  }
];