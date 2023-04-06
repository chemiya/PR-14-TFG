import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogBodyComponent } from 'src/app/componentes/cartas/dialog-body/dialog-body.component';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO} from 'src/app/modelo/app.model';

//corregido html y ts-------------

@Component({
  selector: 'app-tabla-receta',
  templateUrl: './tabla-receta.component.html',
  styleUrls: ['./tabla-receta.component.css']
})
export class TablaRecetaComponent {
  recetas: RecetaDTO[] = [];

  constructor(private recetaDAO:RecetaDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, titulo: any,event:Event): void {//abro el dialog
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {//pongo el mensaje
      texto:"¿deseas eliminar la receta "+titulo+" con el id "+id+" y todas sus publicaciones asociadas?",
      titulo:"Eliminar receta"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//abro el dialog

    dialogRef.afterClosed().subscribe(//al cerrar
      data => {
        if (data == "si") {//si recibo mensaje de si
          this.recetaDAO.borrarReceta(id)//elimino la receta
            .subscribe({
              next: (data) => {
                this.toastr.success('Receta eliminada');
                this.busqueda();//vuelvo a buscar recetas
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.recetaDAO.buscarTodasRecetas()//busco todas las recetas
      .subscribe({
        next: (data) => {
          this.recetas = data;//las guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  detallesReceta(id: any) {//voy a la receta concreta
    this.router.navigate(['/detallesReceta/' + id]);
  }

  ngOnInit(): void {
    this.busqueda()//busco todas las recetas
  }


}
