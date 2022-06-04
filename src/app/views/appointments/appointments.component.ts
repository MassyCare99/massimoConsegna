import { BehaviorSubject, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { ApointmentsService } from '../../core/api/apointments.service';
import { DayWithSlot } from 'src/app/models/DayWithSlot';
import { DayWithSlots } from './../../models/DayWithSlots';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Location } from './../../models/Location';
import { ModalYesNoComponentData } from 'src/app/models/ModalYesNoComponentData';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalYesNoComponent } from '../modal-yes-no/modal-yes-no.component';
import { DatePipe } from '@angular/common';
import { Coords } from 'leaflet';

@Component({
  selector: 'mc-appointments',
  templateUrl: './appointments.component.html',
  styles: [],
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer | null = null;

  locations$ = new BehaviorSubject<Location[]>([]);
  selectedLocationId$ = new BehaviorSubject<string>('');
  selectedLocation$ = combineLatest([
    this.locations$,
    this.selectedLocationId$,
  ]).pipe(
    map(([locations, id]) => {
      const index: number = locations.findIndex((i) => i._id == id);
      return locations[index];
    })
  );
  daysWithSlots$ = this.selectedLocationId$.pipe(
    switchMap((x) => {
      if (x) {
        return this.apointmentsService.getSlotsDisponibili(x);
      }
      return of(null);
    })
  );
  getCoords$ = this.selectedLocation$.pipe(
    map((r) => {
      if (r) {
        return r.coords;
      }
      return null;
    })
  );
  //sedeSelezionata: Location | null = null;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private apointmentsService: ApointmentsService
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  selezionaSede(idSede: string) {
    // const index: number = this.sedi.findIndex((i) => i._id == idSede);
    // this.sedeSelezionata = this.sedi[index];
    this.selectedLocationId$.next(idSede);
    this.drawer?.open();
    //this.getSlotsDisponibili();
  }
  toogle() {
    this.drawer?.toggle();
  }

  ritornaSlotSelezionato(dataSel: DayWithSlot) {
    let data: ModalYesNoComponentData = {
      title: "Confermi l'Appuntamento?",
      message: `l'Appuntamento sarà fissato il
      ${this.datepipe.transform(dataSel.day, 'dd/MM/YYYY')}
      alle ore ${dataSel.slot}:00`,
      noCaption: 'Annulla',
      yesCaption: 'Conferma',
    };

    let dialogRef = this.dialog.open(ModalYesNoComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //answer yes
        this.apointmentsService.saveApointment(dataSel).subscribe((res) => {
          if (res) {
            let snackBarRef = this.snackBar.open(
              'Prenotazione avvenuta con successo',
              '',
              {
                duration: 3000,
              }
            );
          }
        });
      }
    });
  }

  //dateDisponibili: DayWithSlots[] = [];

  // getSlotsDisponibili() {
  //   this.apointmentsService
  //     .getSlotsDisponibili(this.sedeSelezionata?._id)
  //     .subscribe((result) => (this.dateDisponibili = result));
  // }

  //sedi: Location[] = [];

  getLocation() {
    this.apointmentsService.getLocations().subscribe(this.locations$);
  }
}
