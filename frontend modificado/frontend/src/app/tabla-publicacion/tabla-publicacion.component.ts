import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ResumenPublicacion } from '../modelo/app.model';

@Component({
  selector: 'app-tabla-publicacion',
  templateUrl: './tabla-publicacion.component.html',
  styleUrls: ['./tabla-publicacion.component.css']
})
export class TablaPublicacionComponent {
  publicaciones: ResumenPublicacion[] = [];

  constructor(private conexionAPI: ConexionAPIService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, titulo: any,event:Event): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      texto:"¿deseas eliminar la publicacion "+titulo+" con el id "+id+" ?"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == "si") {
          this.conexionAPI.borrarPublicacion(id)//busco todos
            .subscribe({
              next: (data) => {
                this.busqueda();
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.conexionAPI.buscarTodasPublicaciones()//busco todos
      .subscribe({
        next: (data) => {
          this.publicaciones= data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesPublicacion(id: any) {
    this.router.navigate(['/detallesPublicacion/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()
  }
}
