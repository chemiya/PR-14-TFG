import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ResumenUsuario, Usuario } from '../modelo/app.model';

@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private conexionAPI: ConexionAPIService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, username: any,event:Event): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      texto:"¿deseas eliminar el usuario "+username+" con el id "+id+" y todas sus publicaciones asociadas?"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data == "si") {
          this.conexionAPI.borrarUsuario(id)//busco todos
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
    this.conexionAPI.buscarTodosUsuarios()//busco todos
      .subscribe({
        next: (data) => {
          this.usuarios= data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesUsuario(id: any) {
    this.router.navigate(['/detallesUsuario/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()
  }

}
