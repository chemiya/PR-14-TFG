import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogBodyComponent } from 'src/app/componentes/cartas/dialog-body/dialog-body.component';

import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO} from 'src/app/modelo/app.model';


@Component({
  selector: 'app-tabla-receta',
  templateUrl: './tabla-receta.component.html',
  styleUrls: ['./tabla-receta.component.css']
})
export class TablaRecetaComponent {
  recetas: RecetaDTO[] = [];

  constructor(private recetaDAO:RecetaDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

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
          this.recetaDAO.borrarReceta(id)//busco todos
            .subscribe({
              next: (data) => {
                this.toastr.success('receta eliminada');
                this.busqueda();
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.recetaDAO.buscarTodasRecetas()//busco todos
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
