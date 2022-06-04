import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalYesNoComponentData } from 'src/app/models/ModalYesNoComponentData';

@Component({
  selector: 'mc-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styles: [
  ]
})
export class ModalYesNoComponent implements OnInit {
@Input() message:string=""
@Input() question:string=""

constructor(
  public dialogRef: MatDialogRef<ModalYesNoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: ModalYesNoComponentData,
) {}

onNoClick(): void {
  this.dialogRef.close();
}

  ngOnInit(): void {
  }

}
