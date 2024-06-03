import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.scss'],
})
export class PilotDetailComponent implements OnInit {

  modalRef!: BsModalRef;
  peopleId!: number;
  pilot = {} as People;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}


  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.max(100)]],
      height: ['', [Validators.required, Validators.max(1000)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  savePilot(template: any): void {
    this.spinner.show();
    if (this.form.valid) {

      this.pilot = { ...this.form.value };
      this.peopleService
        .postPilot(this.pilot)
        .subscribe(
          () => {
            this.toastr.success(`Pilot: ${this.pilot.name} salvo com sucesso.`, 'Sucesso!');
            this.resetForm();
          },
          (error: any) => {
            this.toastr.error(`Pilot: ${this.pilot.name} não foi salvo`, 'Erro!');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
      this.openModal(template);
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
