import { Component, OnInit } from '@angular/core';
import { People } from 'src/app/models/People';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  people = {} as People;

  constructor() {}

  ngOnInit() {}
}
