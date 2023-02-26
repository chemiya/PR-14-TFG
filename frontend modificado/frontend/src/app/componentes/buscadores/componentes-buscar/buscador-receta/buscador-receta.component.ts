import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecetaDAOService } from 'src/app/DAO/RecetaDAO/receta-dao.service';
import { RecetaDTO } from 'src/app/modelo/app.model';

@Component({
  selector: 'app-buscador-receta',
  templateUrl: './buscador-receta.component.html',
  styleUrls: ['./buscador-receta.component.css']
})
export class BuscadorRecetaComponent {
  recetas:RecetaDTO[]=[];
  titulo!:string;
  formularioTitulo!:FormGroup;
  @Input() mostrarEliminarReceta!:boolean;
  @Input() mostrarSeleccionarReceta!:boolean;//reicbo parametros que seran para las cartas de eliminar o seleccinar
  @Output() marcarReceta = new EventEmitter();
  constructor(private fb: FormBuilder,private recetaDAO:RecetaDAOService,private router:Router){}
  
  busqueda(){
    this.recetaDAO.buscarRecetas(this.formularioTitulo.value.titulo)//busco todos
    .subscribe({
      next: (data) => {
        this.recetas = data;//los guardo en el array
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  
  
  detallesReceta(id:any){//voy a la receta concreta
    this.router.navigate(['/detallesReceta/'+id]);
  }
  
  ngOnInit(): void {
    
    this.formularioTitulo = this.initForm();//inicio el form
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
