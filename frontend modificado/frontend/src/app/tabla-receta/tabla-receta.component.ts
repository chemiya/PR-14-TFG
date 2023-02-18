import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ResumenReceta } from '../modelo/app.model';

@Component({
  selector: 'app-tabla-receta',
  templateUrl: './tabla-receta.component.html',
  styleUrls: ['./tabla-receta.component.css']
})
export class TablaRecetaComponent {
  recetas: ResumenReceta[] = [];

  constructor(private conexionAPI: ConexionAPIService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, titulo: any,event:Event): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      texto:"¿deseas eliminar la receta "+titulo+" con el id "+id+" y todas sus publicaciones asociadas?"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == "si") {
          this.conexionAPI.borrarReceta(id)//busco todos
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
    this.conexionAPI.buscarTodasRecetas()//busco todos
      .subscribe({
        next: (data) => {
          this.recetas = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesReceta(id: any) {
    this.router.navigate(['/detallesReceta/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()
  }


}
