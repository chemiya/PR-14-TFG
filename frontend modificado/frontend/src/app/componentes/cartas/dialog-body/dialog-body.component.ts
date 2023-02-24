import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//corregido html y ts-----------------------


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {
  
  constructor(  private dialogRef: MatDialogRef<DialogBodyComponent>,@Inject(MAT_DIALOG_DATA) public data: any ) {//recibo los datosa
  }

  eliminar() {
    this.dialogRef.close("si");//cierro con si
}

cancelar() {
    this.dialogRef.close("no");//cierro con no
}
}
