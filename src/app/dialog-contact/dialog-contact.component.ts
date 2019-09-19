import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../dialog-contact/dialog-data';


@Component({
  selector: 'app-dialog-contact',
  templateUrl: './dialog-contact.component.html',
  styleUrls: ['./dialog-contact.component.scss']
})

export class DialogContactComponent {

  action;
  local_data: any;
  firstfield;

  constructor(
    public dialogRef: MatDialogRef<DialogContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.local_data =  data;
      this.action = this.local_data.action;
       
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

}
