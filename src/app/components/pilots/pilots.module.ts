import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotsRoutingModule } from './pilots-routing.module';
import { PilotsComponent } from './pilots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PeopleService } from 'src/app/services/people.service';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { ModalEditComponent } from 'src/app/shared/modal-edit/modal-edit.component';

@NgModule({
  declarations: [PilotsComponent, ModalComponent, PilotDetailComponent, ModalEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PilotsRoutingModule,
    TooltipModule.forRoot()
  ],
  providers: [PeopleService],
})
export class PilotsModule { }
