import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {
  
  constructor(  private dialogRef: MatDialogRef<DialogBodyComponent>,@Inject(MAT_DIALOG_DATA) public data: any ) {
  }

  eliminar() {
    this.dialogRef.close("si");
}

cancelar() {
    this.dialogRef.close("no");
}
}
