import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlimentoDAOService } from 'src/app/DAO/AlimentoDAO/alimento-dao.service';
import { AlimentoDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-buscador-alimento',
  templateUrl: './buscador-alimento.component.html',
  styleUrls: ['./buscador-alimento.component.css']
})
export class BuscadorAlimentoComponent {
  alimentos!: AlimentoDTO[];
  nombre!: string;
  formularioNombre!: FormGroup;
  @Input() mostrarAnadirAlimento!:boolean;
  @Input() mostrarComprarAlimento!:boolean;
  @Input() mostrarSeleccionarAlimento!:boolean;//parametros que recibe seran para darselos a las cartas de resultado

  @Output() marcarAlimento = new EventEmitter();



  constructor(private fb: FormBuilder, private alimentoDAO: AlimentoDAOService, private router: Router) { }

  busqueda() {
    this.alimentoDAO.buscarAlimentosPorTitulo(this.formularioNombre.value.nombre)//busco todos
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

  marcarAlimentoBuscador(id:any){
    this.marcarAlimento.emit(id)//se ha marcado en la carta, aviso a su padre con el id
  }
}
