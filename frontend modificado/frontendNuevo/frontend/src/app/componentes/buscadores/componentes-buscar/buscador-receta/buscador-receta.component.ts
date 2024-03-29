import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecetaServicioService } from 'src/app/Servicios/RecetaServicio/receta-servicio.service';
import { RecetaDTO } from 'src/app/DTO/RecetaDTO';


@Component({
  selector: 'app-buscador-receta',
  templateUrl: './buscador-receta.component.html',
  styleUrls: ['./buscador-receta.component.css']
})
export class BuscadorRecetaComponent {
  recetas:RecetaDTO[]=[];
  titulo!:string;
  formularioTitulo!:FormGroup;
  mostrarAvisoNinguno:boolean=false;
  @Input() mostrarEliminarReceta!:boolean;
  @Input() mostrarDetalle!:boolean
  @Input() mostrarSeleccionarReceta!:boolean;//reicbo parametros que seran para las cartas de eliminar o seleccinar
  @Output() marcarReceta = new EventEmitter();
  constructor(private fb: FormBuilder,private recetaServicio:RecetaServicioService,private router:Router){}
  
  busqueda(){
    this.recetaServicio.buscarRecetas(this.formularioTitulo.value.titulo)//busco todos
    .subscribe({
      next: (data) => {
        this.recetas = data;//los guardo en el array
        if(data.length==0){
          this.mostrarAvisoNinguno=true;
        }else{
          this.mostrarAvisoNinguno=false;
        }
      },
      error: (e) => console.error(e)
    });
  }
  
  
  detallesReceta(id:any){//voy a la receta concreta
    if(this.mostrarDetalle==true){
      this.router.navigate(['/detallesReceta/'+id]);
    }
    
  }
  
  ngOnInit(): void {
    
    this.formularioTitulo = this.initForm();//inicio el form
    this.busqueda()
   }
  
   initForm(): FormGroup {//Inicio el form
    return this.fb.group({
      titulo: ['', [Validators.required]],
   
  
    })
  }

  marcarRecetaBuscador(id:any){
    this.marcarReceta.emit(id)//aviso al padre de que se ha seleccionado con el id
  }
}
