import { DayWithSlots } from '../../../../models/DayWithSlots';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DayWithSlot, slotPossibili } from 'src/app/models/DayWithSlot';

@Component({
  selector: 'mc-appointments-select-date',
  templateUrl: './appointments-select-date.component.html',
  styles: [],
})
export class AppointmentsSelectDateComponent implements OnInit {
  @Input() dateDisponibili: DayWithSlots[] | null = null;
  @Output() ritornaSlotSelezionato = new EventEmitter<DayWithSlot>();

  dataSelezionata: DayWithSlots | null = null;

  constructor() {}

  inputData: Date | null = null;

  dataCambiata(event: MatDatepickerInputEvent<Date>) {
    let dataSel: Date = new Date();
    if (event.value && this.dateDisponibili) {
      for (let i = 0; i < this.dateDisponibili.length; i++) {
        dataSel = new Date(this.dateDisponibili[i].day);

        if (dataSel.getTime() == event.value.getTime()) {
          this.dataSelezionata = this.dateDisponibili[i];
          return;
        }
      }
    }
  }

  oraSelezionata(slotSel: slotPossibili) {
    if (this.dataSelezionata) {
      const dataSel: DayWithSlot = {
        day: this.dataSelezionata.day,
        slot: slotSel,
      };
      this.ritornaSlotSelezionato.emit(dataSel);
    }
  }

  calendarFilter = (date: Date | null): boolean => {
    let dataSel: Date = new Date();
    if (date && this.dateDisponibili) {
      for (let i = 0; i < this.dateDisponibili.length; i++) {
        dataSel = new Date(this.dateDisponibili[i].day);

        if (dataSel.getTime() == date.getTime()) {
          return true;
        }
      }
    }
    return false;
  };

  myFilter = (date: Date): boolean => {
    return date.getMonth() % 2 === 1 && date.getDate() % 2 === 0;
  };

  ngOnInit(): void {}
}
