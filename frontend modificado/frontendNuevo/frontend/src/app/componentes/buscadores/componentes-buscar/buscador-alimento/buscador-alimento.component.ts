import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlimentoServicioService } from 'src/app/Servicios/AlimentoServicio/alimento-servicio.service';
import { AlimentoDTO } from 'src/app/DTO/AlimentoDTO';


@Component({
  selector: 'app-buscador-alimento',
  templateUrl: './buscador-alimento.component.html',
  styleUrls: ['./buscador-alimento.component.css']
})
export class BuscadorAlimentoComponent {
  alimentos!: AlimentoDTO[];
  nombre!: string;
  formularioNombre!: FormGroup;
  mostrarAvisoNinguno:boolean=false;
  @Input() mostrarAnadirAlimento!:boolean;
  @Input() mostrarComprarAlimento!:boolean;
  @Input() mostrarSeleccionarAlimento!:boolean;//parametros que recibe seran para darselos a las cartas de resultado
@Input() mostrarDetalle!:boolean
  @Output() marcarAlimento = new EventEmitter();
  @Output() guardarAlimento = new EventEmitter();



  constructor(private fb: FormBuilder, private alimentoServicio: AlimentoServicioService, private router: Router) { }

  busqueda() {
    this.alimentoServicio.buscarAlimentosPorTitulo(this.formularioNombre.value.nombre)//busco todos
      .subscribe({
        next: (data) => {
          this.alimentos = data;//los guardo en el array
          if(data.length==0){
            this.mostrarAvisoNinguno=true;
          }else{
            this.mostrarAvisoNinguno=false;
          }
        },
        error: (e) => console.error(e)
      });
  }




  detallesAlimento(id: any) {//voy al detalle de uno concreto
    if(this.mostrarDetalle==true){
      this.router.navigate(['/detallesAlimento/' + id]);
    }
    
  }


  ngOnInit(): void {//inicio el formulario
    this.formularioNombre = this.initForm();
    this.busqueda()
  }



  initForm(): FormGroup {//Inicio el formulario
    return this.fb.group({
      nombre: ['', [Validators.required]],

    })
  }

  marcarAlimentoBuscador(id:any){
    this.marcarAlimento.emit(id)//se ha marcado en la carta, aviso a su padre con el id
  }

  guardarAlimentoBuscador(id:any,nombre:string,foto:string,medida:string){
    
    this.guardarAlimento.emit({"id":id,"nombre":nombre,"foto":foto,"medida":medida})//se ha marcado en la carta, aviso a su padre con el id
  }
}
