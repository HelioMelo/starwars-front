import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  loadChildren: () => import('./components/home/home.module').then(p => p.HomeModule)},
  { path: 'pilots', loadChildren: () => import('./components/pilots/pilots.module').then(p => p.PilotsModule)},
  { path: 'starships', loadChildren: () => import('./components/starships/starships.module').then(p => p.StarshipsModule)},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
