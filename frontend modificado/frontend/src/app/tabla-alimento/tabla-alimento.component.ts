import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ResumenAlimento } from '../modelo/app.model';

@Component({
  selector: 'app-tabla-alimento',
  templateUrl: './tabla-alimento.component.html',
  styleUrls: ['./tabla-alimento.component.css']
})
export class TablaAlimentoComponent {
  alimentos: ResumenAlimento[] = [];

  constructor(private conexionAPI: ConexionAPIService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, nombre: any,event:Event): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      texto:"¿deseas eliminar el alimento "+nombre+" con el id "+id+" y todas sus publicaciones asociadas?"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == "si") {
          this.conexionAPI.borrarAlimento(id)//busco todos
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
    this.conexionAPI.buscarTodosAlimentos()//busco todos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesAlimento(id: any) {
    this.router.navigate(['/detallesAlimento/' + id]);
  }

  editarAlimento(id: any) {
    this.router.navigate(['/crearAlimento/' + id+"/editar"]);
  }

  ngOnInit(): void {
    this.busqueda()
  }

}
