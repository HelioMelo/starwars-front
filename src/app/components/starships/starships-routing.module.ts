import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { StarshipsComponent } from './starships.component';

const starshipsRoutes: Routes = [
  { path: '', component: StarshipsComponent },
  { path: 'detail', component: StarshipDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(starshipsRoutes)],
  exports: [RouterModule]
})

export class StarshipsRoutingModule {}
