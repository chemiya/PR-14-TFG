import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UsuarioDAOService } from 'src/app/DAO/UsuarioDAO/usuario-dao.service';
import {  UsuarioDTO } from 'src/app/modelo/app.model';

import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';


//corregido html y ts-------------------

@Component({
  selector: 'app-tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent {
  usuarios: UsuarioDTO[] = [];

  constructor(private usuarioDAO:UsuarioDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, username: any,event:Event): void {//abro dialigo
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {//pongo el mensaje
      texto:"¿deseas eliminar el usuario "+username+" con el id "+id+" y todas sus publicaciones asociadas?",
      titulo:"Eliminar usuario"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//abro el dialogo

    dialogRef.afterClosed().subscribe(//al cerrar
      data => {
        if (data == "si") {//si recibo si
          this.usuarioDAO.borrarUsuario(id)//elimino el usuario
            .subscribe({
              next: (data) => {
                this.toastr.success('usuario eliminado');
                this.busqueda();//vuelvo a buscar los usuarios
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.usuarioDAO.buscarTodosUsuarios()//busco todos los usuarios
      .subscribe({
        next: (data) => {
          this.usuarios= data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesUsuario(id: any) {//voy al usuario concreto
    this.router.navigate(['/detallesUsuario/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()//al iniciar busco todos los usuarios
  }

}
