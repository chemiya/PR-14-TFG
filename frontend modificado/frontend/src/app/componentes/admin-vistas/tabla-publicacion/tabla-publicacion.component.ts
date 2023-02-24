import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PublicacionDAOService } from 'src/app/DAO/PublicacionDAO/publicacion-dao.service';
import { PublicacionDTO } from 'src/app/modelo/app.model';

import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';


//corregido html y ts---------------------

@Component({
  selector: 'app-tabla-publicacion',
  templateUrl: './tabla-publicacion.component.html',
  styleUrls: ['./tabla-publicacion.component.css']
})
export class TablaPublicacionComponent {
  publicaciones: PublicacionDTO[] = [];

  constructor(private publicacionDAO:PublicacionDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, titulo: any,event:Event): void {//abor dialog
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {//pongo el mensaje
      texto:"¿deseas eliminar la publicacion "+titulo+" con el id "+id+" ?"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//creo el dialog

    dialogRef.afterClosed().subscribe(//al cerrar
      data => {
        if (data == "si") {//si recibo mensaje de si
          this.publicacionDAO.borrarPublicacion(id)//borro la publicacion
            .subscribe({
              next: (data) => {
                this.toastr.success('publicacion eliminada');
                this.busqueda();//vuelvo a buscar todas
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.publicacionDAO.buscarTodasPublicaciones()//busco todas las publicaciones
      .subscribe({
        next: (data) => {
          this.publicaciones= data;//las guardo en el array
          console.log(data[0].tituloReceta);
        },
        error: (e) => console.error(e)
      });
  }

  detallesPublicacion(id: any) {//voy a la publicacion concreta
    this.router.navigate(['/detallesPublicacion/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()//busco todas las publicaciones
  }
}
