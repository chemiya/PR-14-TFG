import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';

import { DialogBodyComponent } from '../../cartas/dialog-body/dialog-body.component';

//corregido html y ts-----------

@Component({
  selector: 'app-tabla-alimento',
  templateUrl: './tabla-alimento.component.html',
  styleUrls: ['./tabla-alimento.component.css']
})
export class TablaAlimentoComponent {
  alimentos: AlimentoDTO[] = [];

  constructor(private alimentoDAO:AlimentoDAOService,private toastr:ToastrService, private router: Router, private dialog: MatDialog) { }

  openDialog(id: any, nombre: any,event:Event): void {//creo el dialog
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {//pogno el mensaje
      texto:"¿deseas eliminar el alimento "+nombre+" con el id "+id+" y todas sus publicaciones asociadas?",
      titulo:"Eliminar alimento"
    }

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);//abro el dialog

    dialogRef.afterClosed().subscribe(//al cerrar
      data => {
        if (data == "si") {//si recibo mensaje de si
          this.alimentoDAO.borrarAlimento(id)//borro el alimento
            .subscribe({
              next: (data) => {
                this.toastr.success('Alimento eliminado');
                this.busqueda();//vuelvo a buscar todos
              },
              error: (e) => console.error(e)
            });
        }
      }
    );


  }

  busqueda() {
    this.alimentoDAO.buscarTodosAlimentos()//busco todos los alimentos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
        
        },
        error: (e) => console.error(e)
      });
  }

  detallesAlimento(id: any) {//voy al alimento concreto
    this.router.navigate(['/detallesAlimento/' + id]);
  }

  editarAlimento(id: any) {//ediatrt el alimento
    this.router.navigate(['/crearAlimento/' + id+"/editar"]);
  }

  ngOnInit(): void {
    this.busqueda()//busco todos los alimentos
  }

}
