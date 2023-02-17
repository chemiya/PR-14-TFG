import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionAPIService } from '../conexion-api.service';
import { Receta, ResumenReceta } from '../modelo/app.model';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.css']
})
export class BuscarRecetaComponent {
recetas:ResumenReceta[]=[];
titulo!:string;
formularioTitulo!:FormGroup;
constructor(private fb: FormBuilder,private conexionAPI:ConexionAPIService,private router:Router){}

busqueda(){
  this.conexionAPI.buscarRecetas(this.formularioTitulo.value.titulo)//busco todos
  .subscribe({
    next: (data) => {
      this.recetas = data;//los guardo en el array
      console.log(data);
    },
    error: (e) => console.error(e)
  });
}

detallesReceta(id:any){
  this.router.navigate(['/detallesReceta/'+id]);
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.formularioTitulo = this.initForm();
 }

 initForm(): FormGroup {
  return this.fb.group({
    titulo: ['', [Validators.required]],
 
   
    
   
  })
}
}
