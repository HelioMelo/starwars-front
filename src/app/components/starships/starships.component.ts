import { Component, OnInit, TemplateRef } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { StarshipsService } from "src/app/services/starships.service";
import { Starship } from "src/app/models/Starship";
import { ModalEditStarshipComponent } from "src/app/shared/modal-edit-starship/modal-edit-starship.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-starships",
  templateUrl: "./starships.component.html",
  styleUrls: ["./starships.component.scss"],
})
export class StarshipsComponent implements OnInit {
  modalRef!: BsModalRef;
  public starshipId!: number;
  public starshipName!: string;
  public starships: Starship[] = [];
  public starshipsFiltered: Starship[] = [];
  starship = {} as Starship;

  public pagina = 1;

  public viewButton = true;
  public nameButton = "";

  private listedFilter = "";

  public get filterList(): string {
    return this.listedFilter;
  }

  public set filterList(value: string) {
    this.listedFilter = value;
    this.starshipsFiltered = this.filterList
      ? this.filterStarships(this.filterList)
      : this.starships;
  }

  constructor(
    private spinner: NgxSpinnerService,
    private starshipService: StarshipsService,
    private dialogService: DialogService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.GetAllStarship();
    //console.log('Inicial',this.pagina);
  }

  public filterStarships(filterBy: string): Starship[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.starships.filter(
      (starships: { name: string }) =>
        starships.name.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  public GetAllStarship(): void {
    this.starshipService
      .getStarship()
      .subscribe(
        (starships: any) => {
          this.starships = starships;
          this.starshipsFiltered = this.starships;
          this.loading();

          if (this.starships.length === 0) {
            this.toastr.error("No registered starships.", "Error!");
          } else {
            this.toastr.success("Data loaded.", "Success!");
          }
        },
        (error: any) => {
          this.toastr.error("Error loading data.", "Error!");
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  // mudarPagina(): void {
  //   this.pagina++;
  //   if (this.pagina > 4){
  //       this.pagina = 1;
  //   }
  //  console.log('Mais',this.pagina);
  // }

  // mudarPagina2(): void {
  //   this.pagina--;
  //   console.log('Menos',this.pagina);
  // }

  public loading(): void {
    if (this.viewButton) {
      var viewMore = this.starshipsFiltered.slice(0, 6);
      this.starshipsFiltered = viewMore;
      this.nameButton = "View More";
    } else {
      if (this.starships.length > 6) {
        this.starshipsFiltered = this.starships;
        this.nameButton = "View Less";
      } else {
        this.toastr.error(
          `There are only: ${this.starshipsFiltered.length} registered starships.`,
          `Error!`
        );
      }
    }
  }

  public GetAllStarshipPage(): void {
    this.starshipService
      .getStarshipPage(this.pagina)
      .subscribe(
        (starships: any) => {
          this.starships = starships;
          this.starshipsFiltered = this.starships;
          this.toastr.success("Data loaded.", "Success!");
        },
        (error: any) => {
          this.toastr.error("Error loading data.", "Error!");
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  openModalAddStarship(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  openModalDelete(
    event: any,
    template: TemplateRef<any>,
    starshipId: number,
    starshipName: string
  ): void {   
    event.stopPropagation();
    this.starshipId = starshipId;
    this.starshipName = starshipName;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirmAddStarship(): void {
    this.modalRef.hide();
  }

  declineStarship(): void {
    this.modalRef.hide();
  }

  declineDeleteStarship(): void {
    this.modalRef.hide();
  }

  confirmDeleteStarship(): void {
    this.modalRef.hide();
    this.spinner.show();
    this.starshipService
      .deleteStarshipById(this.starshipId)
      .subscribe(
        () => {
          var nameStarship = "";
          this.starships.forEach((x) => {
            nameStarship = x.name;
          });

          this.toastr.success(
            `The Starship ${nameStarship} was successfully deleted.`,
            "Success!"
          );
          window.location.reload();
        },
        (error: any) => {
          this.toastr.error(
            `Error when trying to delete Starship ${this.starshipName}.`,
            "Error!"
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  detalheEditStarship(event: any, starshipId: number): void {
    event.stopPropagation();
    this.dialogService.open(ModalEditStarshipComponent, {
      header: `Edit Starship`,     
      data: {
        starshipId: starshipId
      }
    });
  }
}
