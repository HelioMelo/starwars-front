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
import { Starship } from 'src/app/models/Starship';
import { StarshipsService } from 'src/app/services/starships.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.scss']
})
export class StarshipDetailComponent implements OnInit {

  modalRef!: BsModalRef;
  starshipId!: number;
  starship = {} as Starship;
  form!: FormGroup;

   get f(): any {
    return this.form.controls;
  }


  constructor(
    private fb: FormBuilder,
    private starshipService: StarshipsService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.validation();
  }


  public validation(): void {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['',
          [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      ],
      size: ['', [Validators.required, Validators.max(400)]],
      passengers: ['', [Validators.required, Validators.max(2000)]]
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

  saveStarship(template: any): void {
    this.spinner.show();
    if (this.form.valid) {

        this.starship = { ...this.form.value };
        this.starshipService.postStarship(this.starship).subscribe(
            () => {
              this.toastr.success(`Starship: ${this.starship.name} salva com sucesso.`, 'Sucesso!');
              this.resetForm();
            },
            (error: any) => {
              this.toastr.error(`Starship: ${this.starship.name} não foi salva`, 'Erro!');
              console.error(error);
            }
          ).add(() => this.spinner.hide());
          this.openModal(template);
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

}
