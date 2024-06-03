import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { People } from 'src/app/models/People';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {

  modalRef!: BsModalRef;
  peopleId: number = 0;
  pilot = {} as People;
  form!:  FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService,
    private modalService: BsModalService,
    private config: DynamicDialogConfig,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.peopleId = this.config.data.peopleId;
  }

  public carregarPilot(): void {
    if (this.peopleId !== null && this.peopleId !== 0) {
      this.spinner.show();

      this.peopleService
        .getPilotById(this.peopleId)
        .subscribe(
          (pilot: People) => {
            this.pilot = { ...pilot };
            this.form.patchValue(this.pilot);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Piloto.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarPilot();
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      id: [{ value: this.peopleId, disabled: true }],
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

  public redirect(): void {
    this.router.navigateByUrl(`/pilots`);
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  savePilot(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.pilot = { ...this.form.value };
      this.peopleService
        .updatePilot(this.pilot, this.peopleId)
        .subscribe(
          () =>
            this.toastr.success(`Piloto: ${this.pilot.name} atualizado com sucesso.`, 'Sucesso!'),
          (error: any) => {
            this.toastr.error(`Pilot: ${this.pilot.name} não foi salvo`, 'Erro!');
            console.error(error);
          }
        ).add(() => this.spinner.hide());
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
