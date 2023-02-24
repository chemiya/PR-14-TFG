import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';

/**corregido html y ts------------------ */

@Component({
  selector: 'app-buscar-alimento',
  templateUrl: './buscar-alimento.component.html',
  styleUrls: ['./buscar-alimento.component.css']
})
export class BuscarAlimentoComponent {
  alimentos!: AlimentoDTO[];
  nombre!: string;
  formularioNombre!: FormGroup;



  constructor(private fb: FormBuilder, private alimentoDAO: AlimentoDAOService, private router: Router) { }

  busqueda() {
    this.alimentoDAO.buscarAlimentos(this.formularioNombre.value.nombre)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }




  detallesAlimento(id: any) {//voy al detalle de uno concreto
    this.router.navigate(['/detallesAlimento/' + id]);
  }


  ngOnInit(): void {//inicio el formulario
    this.formularioNombre = this.initForm();
  }



  initForm(): FormGroup {//Inicio el formulario
    return this.fb.group({
      nombre: ['', [Validators.required]],

    })
  }
}
