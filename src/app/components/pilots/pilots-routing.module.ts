import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { PilotsComponent } from './pilots.component';

const pilotsRoutes: Routes = [
  { path: '', component: PilotsComponent },
  { path: 'detail', component: PilotDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(pilotsRoutes)],
  exports: [RouterModule]
})

export class PilotsRoutingModule {}
