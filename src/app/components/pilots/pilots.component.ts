import { Component, OnInit, TemplateRef } from "@angular/core";
import { People } from "src/app/models/People";
import { PeopleService } from "src/app/services/people.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ModalComponent } from "src/app/shared/modal/modal.component";
import { ModalEditComponent } from "src/app/shared/modal-edit/modal-edit.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-pilots",
  templateUrl: "./pilots.component.html",
  styleUrls: ["./pilots.component.scss"],
})
export class PilotsComponent implements OnInit {
  modalRef!: BsModalRef;
  peopleId!: number;
  peopleName!: String;
  peopleage!: String;
  peopleFilms: People[] = [];
  peoples: People[] = [];
  peoplesFiltered: People[] = [];
  people = {} as People;

  pagina = 1;

  viewButton = true;
  nameButton = "";

  private listedFilter = "";

  public get filterList(): string {
    return this.listedFilter;
  }

  public set filterList(value: string) {
    this.listedFilter = value;
    this.peoplesFiltered = this.filterList
      ? this.filterPilots(this.filterList)
      : this.peoples;
  }

  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    private dialogService: DialogService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.GetAllPilot();
  }

  public filterPilots(filterBy: string): People[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.peoples.filter(
      (peoples: { name: string }) =>
        peoples.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  public loading(): void {
    if (this.viewButton) {
      var viewMore = this.peoplesFiltered.slice(0, 6);
      this.peoplesFiltered = viewMore;
      this.nameButton = "View More";
    } else {
      if (this.peoples.length > 6) {
        this.peoplesFiltered = this.peoples;
        this.nameButton = "View Less";
      } else {
        this.toastr.error(
          `There are only: ${this.peoplesFiltered.length} registered pilots.`,
          `Error!`
        );
      }
    }
  }

  public GetAllPilot(): void {
    this.peopleService
      .getAllPilot()
      .subscribe(
        (peoples: any) => {
          this.peoples = peoples;
          this.peoplesFiltered = this.peoples;
          this.loading();
          if (this.peoples.length === 0) {
            this.toastr.error("No registered pilots.", "Error!");
          } else {
            this.toastr.success("Data loaded.", "Success!");
          }
        },
        (error: any) => {
          if (this.peoples.length === 0) {
            this.toastr.error("No registered pilots.", "Error!");
          }
          if (this.peoples.length != 0) {
            this.toastr.error("Error loading data.", "Error!");
            console.error(error);
          }
        }
      )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, people: People): void {
    event.stopPropagation();
    let initialState = {
      people,
    };
    this.modalRef = this.modalService.show(ModalComponent, {
      class: "modal-sm",
      initialState,
    });
  }

  openModalAddPilot(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModalDelete(
    event: any,
    template: TemplateRef<any>,
    peopleName: string,
    peopleId: number
  ): void {   
    event.stopPropagation();
    this.peopleName = peopleName;
    this.peopleId = peopleId;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirmAddPilot(): void {
    this.modalRef.hide();
  }

  declinePilot(): void {
    this.modalRef.hide();
  }

  detalheEditPilot(event: any, peopleId: number): void {
    event.stopPropagation();
    this.dialogService.open(ModalEditComponent, {
      header: `Edit Pilot`,   
      data: {
        peopleId: peopleId,
      },
    });   
  }

  declineDeletePilot(): void {
    this.modalRef.hide();
  }

  confirmDeletePilot(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.peopleService
      .deletePilotById(this.peopleId)
      .subscribe(
        () => {
          var namePilot = "";
          this.peoples.forEach((x) => {
            namePilot = x.name;
          });

          this.toastr.success(
            `The Pilot ${namePilot} was successfully deleted.`,
            "Success!"
          );
          window.location.reload();
        },
        (error: any) => {
          this.toastr.error(
            `Error when trying to delete Pilot ${this.peopleName}.`,
            "Error!"
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  mudarPagina(): void {
    this.pagina++;
    if (this.pagina > 9) {
      this.pagina = 1;
    }
  }

  mudarPagina2(): void {
    this.pagina--;
  }

  public GetAllPilotPage(): void {
    this.peopleService
      .getPilotPage(this.pagina)
      .subscribe(
        (peoples: any) => {
          this.peoples = peoples;
          this.peoplesFiltered = this.peoples;

          if (this.viewButton) {
            var verMais = this.peoplesFiltered.slice(0, 6);
            this.peoplesFiltered = verMais;
            this.nameButton = "Ver mais";
          } else {
            this.peoplesFiltered = this.peoples;
            this.nameButton = "Ver menos";
          }
          this.toastr.success("Data loaded", "Success!");
        },
        (error: any) => {
          this.toastr.error("Error loading data", "Error!");
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
