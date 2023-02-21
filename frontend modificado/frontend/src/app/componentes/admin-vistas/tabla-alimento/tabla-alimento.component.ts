import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';

import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';


@Component({
  selector: 'app-tabla-alimento',
  templateUrl: './tabla-alimento.component.html',
  styleUrls: ['./tabla-alimento.component.css']
})
export class TablaAlimentoComponent {
  alimentos: AlimentoDTO[] = [];

  constructor(private alimentoDAO:AlimentoDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

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
          this.alimentoDAO.borrarAlimento(id)//busco todos
            .subscribe({
              next: (data) => {
                this.toastr.success('alimento eliminado');
                this.busqueda();
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.alimentoDAO.buscarTodosAlimentos()//busco todos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
        
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
